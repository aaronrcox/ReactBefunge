import { combineEpics, ofType } from 'redux-observable';
import * as actions from './actions';

import { mergeMap } from 'rxjs/operators';



const setupGrid = (action, state) => action.pipe(
    ofType(actions.SETUP_GRID),
    mergeMap((action) => {

        console.log(action);

        const width = action.payload.width;
        const height = action.payload.height;
        const text = action.payload.text;

        const cellWidth = action.payload.cellWidth || state.value.cellWidth;
        const cellHeight = action.payload.cellHeight || state.value.cellHeight;

        const rows = Math.floor(height / (cellHeight-1)) + 1;
        const cols = Math.floor(width / (cellWidth-1)) + 1;
        
        const viewport = {
            ...state.value.viewport,
            rows,
            cols
        };

        // create a 2D array of characters, [rows][cols]
        // regex strips out the various line endings
        const cells = text.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/).map(line => line.split(''));
        
        // initialise the grid with the above calculated data
        return [ actions.initialiseGrid({cellWidth, cellHeight, rows, cols, cells, viewport}) ];
    })
);

const onMouseMoved = (action, state) => action.pipe(
    ofType(actions.MOUSE_MOVED),
    mergeMap((action) => {

        // get mouse coordinates
        const mx = action.payload.mouseX;
        const my = action.payload.mouseY;

        // subtract 1 from width and height for row/col/cell index calculations
        const cellWidth = state.value.cellWidth - 1;
        const cellHeight = state.value.cellHeight - 1;

        const viewport = state.value.viewport;

        // calculate the row/col/cell index the mouse is over
        const rowIndex = Math.floor(my / cellHeight) + viewport.yOffset;
        const colIndex = Math.floor(mx / cellWidth) + viewport.xOffset;
        const cellIndex = rowIndex * state.value.cols + colIndex;
        const hoverState = { rowIndex, colIndex, cellIndex };

        const newActions = [];

        // update the hover state
        if(cellIndex !== state.value.hover.cellIndex) {
            newActions.push(actions.setHoverCell(hoverState));
        }

        // If we move the mouse while the mouse is down, than we will
        // either begin the selection, or expand the selection
        if(state.value.selection.isMouseDown) {
            if( !state.value.selection.isDragging ) {
                newActions.push(actions.dragStart());
            }
            else {
                // TODO: This logic can be done in a "Drag" reducer.
                const selection = {...state.value.selection};
                selection.endRowIndex = rowIndex;
                selection.endColIndex = colIndex + (selection.endColIndex < selection.startColIndex ? 0 : 1);
                newActions.push(actions.setSelectionArea(selection)); 
            }                   
        }
        
        return newActions;
    })
);

const onMouseDown = (action, state) => action.pipe(
    ofType(actions.MOUSE_DOWN),
    mergeMap((action) => {

        // set the target cursor position to the location of the hovered cell
        const target = _moveTarget(state.value, state.value.hover, 0, 0);
        return [actions.setTargetCell(target)];
    })
);

const onMouseUp = (action, state) => action.pipe(
    ofType(actions.MOUSE_UP),
    mergeMap((action) => {
        // No action required
        return [];
    })
);


const onKeyDown = (action, state) => action.pipe(
    ofType(actions.KEY_DOWN),
    mergeMap((action) => {
        const key = action.payload.key;
        const rowIndex = state.value.target.rowIndex;
        const colIndex = state.value.target.colIndex;
        const insertMode = state.value.insertMode;
        const isShiftDown = action.payload.isShiftDown;
        const selection = {...state.value.selection};
        const targetDir = {...state.value.target.dir};

        if(key.length === 1) {
            const target = _moveTarget(state.value, state.value.target, targetDir.x, targetDir.y);
            return [
                insertMode ? actions.insertCol(rowIndex, colIndex) : actions.none(),
                actions.setCellValue({ rowIndex, colIndex, value: key }),
                actions.setTargetCell(target)
            ];
        }
        else {
            if( key === 'Tab' ) {
                const dir = isShiftDown ? -1 : 1;
                const target = _moveTarget(state.value, state.value.target, dir, 0);
                return[ actions.setTargetCell(target) ];
            }
            if( key === 'Enter' ) {
                const target = _moveTarget(state.value, state.value.target, 0, 1);
                return[ actions.setTargetCell(target) ];
            }
            else if( key === 'Backspace') {
                const target = _moveTarget(state.value, state.value.target, -targetDir.x, -targetDir.y);
                return[
                    insertMode ? 
                        actions.deleteCol(target.rowIndex, target.colIndex) :
                        actions.setCellValue({ rowIndex: target.rowIndex, colIndex: target.colIndex, value: '' }),
                    actions.setTargetCell(target)
                ];
            }
            else if( key === 'Delete') {
                return[ 
                    insertMode ? 
                        actions.shiftCellsInRange(colIndex, rowIndex, colIndex, rowIndex, -1, 0) :
                        actions.setCellValue({ rowIndex, colIndex, value: '' }) 
                    ];
            }
            else if( key === 'ArrowLeft') {
                
                if(isShiftDown) {
                    selection.endColIndex -= 1;
                    return[  actions.setSelectionArea(selection) ];
                }
                else {
                    const target = _moveTarget(state.value, state.value.target, -1, 0);
                    return[ actions.setTargetCell(target) ];
                }
            }
            else if( key === 'ArrowRight') {
                if(isShiftDown) {
                    selection.endColIndex += 1;
                    return[  actions.setSelectionArea(selection) ];
                }
                else {
                    const target = _moveTarget(state.value, state.value.target, 1, 0)
                    return[ actions.setTargetCell(target) ];
                }
            }
            else if( key === 'ArrowUp') {
                if(isShiftDown) {
                    selection.endRowIndex -= 1;
                    return[  actions.setSelectionArea(selection) ];
                }
                else {
                    const target =  _moveTarget(state.value, state.value.target, 0, -1);
                    return[ actions.setTargetCell(target) ];
                }
            }
            else if( key === 'ArrowDown') {
                if(isShiftDown) {
                    selection.endRowIndex += 1;
                    return[  actions.setSelectionArea(selection) ];
                }
                else {
                    const target = _moveTarget(state.value, state.value.target, 0, 1);
                    return[ actions.setTargetCell(target) ];
                }
                
            }
            else if( key === 'Insert') {
                return[ actions.setInsertMode(!state.value.insertMode) ];
            }
        }

        return [];
    })
);

export const epics = combineEpics(
    setupGrid,
    onMouseMoved,
    onMouseDown,
    onMouseUp,
    onKeyDown
);


// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function _moveTarget(state, target, dx, dy) {
    const numCols = state.cols;

    let rowIndex = target.rowIndex + dy;
    let colIndex = target.colIndex + dx;

    // prevent wrapping
    rowIndex = Math.max(rowIndex, 0);
    colIndex = Math.max(colIndex, 0);


    const cellIndex = rowIndex * numCols + colIndex;

    // re-calculate the row/col index values based on the new cell index.
    return { rowIndex, colIndex, cellIndex };
}

