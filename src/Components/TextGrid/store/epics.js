import { combineEpics, ofType } from 'redux-observable';
import * as actions from './actions';

import { mergeMap } from 'rxjs/operators';






const onMouseMoved = (action, state) => action.pipe(
    ofType(actions.MOUSE_MOVED),
    mergeMap((action) => {

        // get mouse coordinates
        const mx = action.payload.mouseX + state.value.textGrid.viewport.scrollX;
        const my = action.payload.mouseY + state.value.textGrid.viewport.scrollY;

        // subtract 1 from width and height for row/col/cell index calculations
        const cellWidth = state.value.textGrid.cellWidth;
        const cellHeight = state.value.textGrid.cellHeight;

        // calculate the row/col/cell index the mouse is over
        let rowIndex = Math.floor(my / cellHeight);
        let colIndex = Math.floor(mx / cellWidth);


        // clamp the rowIndex and colIndex within bounds of the grid.
        if( rowIndex < 0 ) rowIndex = 0;
        if( colIndex < 0 ) colIndex = 0;
        if( rowIndex >= state.value.textGrid.rows) rowIndex = state.value.textGrid.rows - 1;
        if( colIndex >= state.value.textGrid.cols) colIndex = state.value.textGrid.cols - 1;

        const hoverState = { rowIndex, colIndex };
        const newActions = [];

        // update the hover state
        if(rowIndex !== state.value.textGrid.hover.rowIndex || colIndex !== state.value.textGrid.hover.colIndex) {
            newActions.push(actions.setHoverCell(hoverState));
        }

        // If we move the mouse while the mouse is down, than we will
        // either begin the selection, or expand the selection via the drag action
        if(state.value.textGrid.selection.isMouseDown) {
            newActions.push(actions.drag());                   
        }

        return newActions;
    })
);


const onKeyDown = (action, state) => action.pipe(
    ofType(actions.KEY_DOWN),
    mergeMap((action) => {
        const key = action.payload.key;

        const isShiftDown = action.payload.isShiftDown;
        
        const cbResult = action.payload.callback(state.value, key) || {};
        const cbActions = cbResult.actions || [];

        const numRowsSelected = Math.abs(state.value.textGrid.selection.endRowIndex - state.value.textGrid.selection.startRowIndex) + 1;
        const numColsSelected = Math.abs(state.value.textGrid.selection.endColIndex - state.value.textGrid.selection.startColIndex) + 1;
        const numItemsSelected = numRowsSelected * numColsSelected;
        
        if(cbResult.preventDefault) {
            return cbActions;
        }

        if(key.length === 1) {
            if( numItemsSelected > 1) {
                return [...cbActions, actions.fillSelection(key)];
            }
            
            return [ ...cbActions, actions.fillSelection(key), actions.moveSelection() ];
        }
        else {
            if( key === 'Tab' ) {
                const dir = isShiftDown ? -1 : 1;
                return[ ...cbActions, actions.moveSelection(dir, 0) ];
            }
            if( key === 'Enter' ) {
                const dir = isShiftDown ? -1 : 1;
                return [ ...cbActions, actions.moveSelection(0, dir) ];
            }
            else if( key === 'Backspace') {

                cbActions.push(actions.clearSelectionArea());
                
                // only move the selection if we have 1 item selected
                if( numItemsSelected === 1 )
                    cbActions.push(actions.moveSelection(undefined, undefined, true));

                return cbActions;
            }
            else if( key === 'Delete') {
                return [...cbActions, actions.clearSelectionArea() ];
            }
            else if( key.includes('Arrow') )
            {
                // calculate xy direction of arrow key press
                let cursorDir = {x: 0, y: 0};
                switch(key) {
                    case 'ArrowLeft': cursorDir.x = -1; break;
                    case 'ArrowRight': cursorDir.x = 1; break;
                    case 'ArrowUp': cursorDir.y = -1; break;
                    case 'ArrowDown': cursorDir.y = 1; break;
                    default: break;
                }

                // if we press arrow keys while shift is pressed, we are selecting
                // otherwise, we are moving the target cursor position.

                if(isShiftDown) {
                    // TODO: create action to grow/shrink the selection area
                    const selection = { ...state.value.textGrid.selection };
                    selection.endColIndex += cursorDir.x;
                    selection.endRowIndex += cursorDir.y;
                    selection.showSelection = true;
                    return[  
                        ...cbActions, 
                        actions.setSelectionArea(selection), 
                        actions.setTypeingDir(cursorDir.x, cursorDir.y)
                    ];
                }
                else {
                    return [
                        ...cbActions, 
                        actions.moveSelection(cursorDir.x, cursorDir.y), 
                        actions.setTypeingDir(cursorDir.x, cursorDir.y)
                    ];
                }
            }
        }

        return [];
    })
);

const onCopy = (action, state) => action.pipe(
    ofType(actions.COPY),
    mergeMap((action) => {
        
        const s = _getSelectedText(state);
        navigator.clipboard.writeText(s)

        return [];

    })
);

const onCut = (action, state) => action.pipe(
    ofType(actions.CUT),
    mergeMap((action) => {
        const s = _getSelectedText(state);
        navigator.clipboard.writeText(s)
        return [actions.clearSelectionArea()]
    })
);

export const epics = combineEpics(
    onMouseMoved,
    onKeyDown,
    onCopy,
    onCut
);



function _getSelectedText(state) {
    const cells = state.value.textGrid.cells;
    const sx = state.value.textGrid.selection.startColIndex;
    const sy = state.value.textGrid.selection.startRowIndex;
    const ex = state.value.textGrid.selection.endColIndex;
    const ey = state.value.textGrid.selection.endRowIndex + 1;
    let s = '';
    for(let y=sy; y<ey; y++){
        if(y >= ey){
            s += '\n';
            continue;
        }
        for(let x=sx; x<ex && x<cells[y].length ; x++) {
            s += cells[y][x];
        }

        if(y <ey-1)
            s += '\n';
    }
    return s;
}