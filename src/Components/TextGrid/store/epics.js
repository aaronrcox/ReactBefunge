import { combineEpics, ofType } from 'redux-observable';
import * as actions from './actions';

import { mergeMap } from 'rxjs/operators';






const setupGrid = (action, state) => action.pipe(
    ofType(actions.SETUP_GRID),
    mergeMap((action) => {

        const width = action.payload.width;
        const height = action.payload.height;
        const text = action.payload.text;

        const cellWidth = action.payload.cellWidth || state.value.textGrid.cellWidth;
        const cellHeight = action.payload.cellHeight || state.value.textGrid.cellHeight;

        const rows = Math.floor(height / (cellHeight-1)) + 1;
        const cols = Math.floor(width / (cellWidth-1)) + 1;
        
        // create a 2D array of characters, [rows][cols]
        // regex strips out the various line endings
        const cells = text.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/).map(line => line.split(''));
        
        // initialise the grid with the above calculated data
        return [ actions.initialiseGrid({cellWidth, cellHeight, rows, cols, cells}) ];
    })
);

const onMouseMoved = (action, state) => action.pipe(
    ofType(actions.MOUSE_MOVED),
    mergeMap((action) => {

        // get mouse coordinates
        const mx = action.payload.mouseX;
        const my = action.payload.mouseY;

        // subtract 1 from width and height for row/col/cell index calculations
        const cellWidth = state.value.textGrid.cellWidth - 1;
        const cellHeight = state.value.textGrid.cellHeight - 1;

        const viewport = state.value.textGrid.viewport;

        // calculate the row/col/cell index the mouse is over
        const rowIndex = Math.floor(my / cellHeight) + viewport.yOffset;
        const colIndex = Math.floor(mx / cellWidth) + viewport.xOffset;
        
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
        const rowIndex = state.value.textGrid.target.rowIndex;
        const colIndex = state.value.textGrid.target.colIndex;
        const isShiftDown = action.payload.isShiftDown;
        
        const cbResult = action.payload.callback(state.value, key) || {};
        const cbActions = cbResult.actions || [];
        
        if(cbResult.preventDefault) {
            return cbActions;
        }

        if(key.length === 1) {
            if( state.value.textGrid.selection.startRowIndex !== state.value.textGrid.selection.endRowIndex ||
                state.value.textGrid.selection.startColIndex !== state.value.textGrid.selection.endColIndex  ) {

                    // fill the slection area
                    return [actions.fillSelection(key)];
            }
            else {
                // insert the character at the cursor positon
                return [
                    ...cbActions,
                    actions.setCellValue({ rowIndex, colIndex, value: key }),
                    actions.moveTargetCell(),
                ];
            }
            
        }
        else {
            if( key === 'Tab' ) {
                const dir = isShiftDown ? -1 : 1;
                return[ ...cbActions, actions.moveTargetCell(dir, 0) ];
            }
            if( key === 'Enter' ) {
                const dir = isShiftDown ? -1 : 1;
                return [ ...cbActions, actions.moveTargetCell(0, dir) ];
            }
            else if( key === 'Backspace') {
                return [
                    ...cbActions,
                    actions.clearSelectionArea(),
                    actions.setCellValue({ value: '' }),
                    actions.moveTargetCell(undefined, undefined, true)
                ];
            }
            else if( key === 'Delete') {
                return [ 
                    ...cbActions, 
                    actions.clearSelectionArea(),
                    actions.setCellValue({ rowIndex, colIndex, value: '' }) 
                ];
            }
            else if( key.includes('Arrow') )
            {
                // calculate xy direction of arrow key press
                let dir = {x: 0, y: 0};
                switch(key) {
                    case 'ArrowLeft': dir.x = -1; break;
                    case 'ArrowRight': dir.x = 1; break;
                    case 'ArrowUp': dir.y = -1; break;
                    case 'ArrowDown': dir.y = 1; break;
                    default: break;
                }

                // if we press arrow keys while shift is pressed, we are selecting
                // otherwise, we are moving the target cursor position.

                if(isShiftDown) {
                    // TODO: create action to grow/shrink the selection area
                    const selection = { ...state.value.textGrid.selection };
                    selection.endColIndex += dir.x;
                    selection.endRowIndex += dir.y;
                    return[  ...cbActions, actions.setSelectionArea(selection), actions.setTypeingDir(dir.x, dir.y) ];
                }
                else {
                    return [
                        ...cbActions, 
                        actions.moveTargetCell(dir.x, dir.y), 
                        actions.setTypeingDir(dir.x, dir.y)
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
    setupGrid,
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