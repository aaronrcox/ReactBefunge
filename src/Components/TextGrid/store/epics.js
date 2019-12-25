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

        if(state.value.selection.isMouseDown) {
            newActions.push(actions.drag());                   
        }

        // If we move the mouse while the mouse is down, than we will
        // either begin the selection, or expand the selection
        
        
        return newActions;
    })
);


const onKeyDown = (action, state) => action.pipe(
    ofType(actions.KEY_DOWN),
    mergeMap((action) => {
        const key = action.payload.key;
        const rowIndex = state.value.target.rowIndex;
        const colIndex = state.value.target.colIndex;
        const isShiftDown = action.payload.isShiftDown;
        const selection = { ...state.value.selection };

        const cbResult = action.payload.callback(state.value, key) || {};
        const cbActions = cbResult.actions || [];
        
        if(cbResult.preventDefault) {
            return cbActions;
        }

        if(key.length === 1) {
            return [
                ...cbActions,
                actions.setCellValue({ rowIndex, colIndex, value: key }),
                actions.moveTargetCell(),
            ];
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
                return[
                    ...cbActions,
                    actions.setCellValue({ value: '' }),
                    actions.moveTargetCell(undefined, undefined, true)
                ];
            }
            else if( key === 'Delete') {
                return[ ...cbActions, actions.setCellValue({ rowIndex, colIndex, value: '' }) ];
            }
            else if( key === 'ArrowLeft') {
                
                if(isShiftDown) {
                    selection.endColIndex -= 1;
                    return[  ...cbActions, actions.setSelectionArea(selection) ];
                }
                else {
                    return [...cbActions, actions.moveTargetCell(-1, 0), actions.setTypeingDir(-1, 0)];
                }
            }
            else if( key === 'ArrowRight') {
                if(isShiftDown) {
                    selection.endColIndex += 1;
                    return[ ...cbActions, actions.setSelectionArea(selection) ];
                }
                else {
                    return [...cbActions, actions.moveTargetCell(1, 0), actions.setTypeingDir(1, 0)];
                }
            }
            else if( key === 'ArrowUp') {
                if(isShiftDown) {
                    selection.endRowIndex -= 1;
                    return[ ...cbActions, actions.setSelectionArea(selection) ];
                }
                else {
                    return [ ...cbActions, actions.moveTargetCell(0, -1), actions.setTypeingDir(0, -1)];
                }
            }
            else if( key === 'ArrowDown') {
                if(isShiftDown) {
                    selection.endRowIndex += 1;
                    return[ ...cbActions, actions.setSelectionArea(selection) ];
                }
                else {
                    return [ ...cbActions, actions.moveTargetCell(0, 1), actions.setTypeingDir(0, 1)];
                }
                
            }
        }

        return [];
    })
);

export const epics = combineEpics(
    setupGrid,
    onMouseMoved,
    onKeyDown
);
