export const NO_OP = '[TextGrid] NO Op';

export const SETUP_GRID = '[TextGrid] Setup';
export const INITIALISE_GRID = '[TextGrid] Initialise';

export const MOUSE_MOVED = '[TextGrid] MouseMoved';
export const MOUSE_DOWN = '[TextGrid] Mouse Pressed';
export const MOUSE_UP = '[TextGrid] Mouse Released';

export const SCROLL_VIEW = '[TextGrid] Scroll View';

export const DRAG = '[TextGrid] Drag';

export const KEY_DOWN = '[TextGrid] Key Down';

export const SET_HOVER_CELL = '[TextGrid] Set Hover Cell';
export const SET_CELL_VALUE = '[TextGrid] Set Cell Text';

export const SET_TARGET_CELL = '[TextGrid] Set Target Cell';
export const MOVE_TARGET_CELL = '[TextGrid] Move Target Cell';

export const INSERT_ROW = '[TextGrid] Insert Row';
export const INSERT_COL = '[TextGrid] Insert Col';
export const DELETE_ROW = '[TextGrid] Delete Row';
export const DELETE_COL = '[TextGrid] Delete Col';

export const SET_SELECTION_AREA = '[TextGrid] Set Selection Area';
export const CLEAR_SELECTION_AREA = '[TextGrid] Clear Selection';

export const SET_TYPEING_DIRECTION = '[TextGrid] Set Text Direction';

// TODO ACTIONS:
// - COPY SELECTION
// - CUT SELECTION
// - PASTE SELECTION
// - FILL SELECTION


// TODO BEHAVIOURS:
// - allow for dynamic resize calculations
// - move viewport when target is near borders
// - ability to change direction of tyed text


export function none() {
    return { type: NO_OP }
}

export function setupGrid(width, height, text, cellWidth, cellHeight) {
    return { type: SETUP_GRID, payload: {width, height, text, cellWidth, cellHeight} }
}

export function initialiseGrid(payload) {
    return { type: INITIALISE_GRID, payload }
}

export function mouseMoved(mousePos) {
    return { type: MOUSE_MOVED, payload: mousePos };
}

export function mouseDown() {
    return { type: MOUSE_DOWN };
}

export function mouseUp() {
    return { type: MOUSE_UP };
}

export function scrollView(xOffset, yOffset) {
    return { type: SCROLL_VIEW, payload: {xOffset, yOffset}};
}

export function drag() {
    return { type: DRAG };
}

export function keyDown(payload) {
    return { type: KEY_DOWN, payload };
}

export function setHoverCell(payload) {
    return { type: SET_HOVER_CELL, payload };
}

export function setCellValue(payload) {
    return { type: SET_CELL_VALUE, payload};
}

export function setTargetCell(payload) {
    return { type: SET_TARGET_CELL, payload};
}

export function moveTargetCell(x, y, invert) {
    return { type: MOVE_TARGET_CELL, payload: {x, y, invert} };
}


export function setSelectionArea(payload) {
    // {startRowIndex, startColIndex, endRowIndex, endColIndex } 
    return { type: SET_SELECTION_AREA, payload};
}

export function clearSelectionArea(payload) {
    return {type: CLEAR_SELECTION_AREA };
}

export function insertRow(rowIndex) {
    return { type: INSERT_ROW, payload: {rowIndex}};
}

export function insertCol(rowIndex, colIndex) {
    return { type: INSERT_COL, payload: {rowIndex, colIndex}};
}

export function deleteRow(rowIndex) {
    return { type: DELETE_ROW, payload: {rowIndex}};
}

export function deleteCol(rowIndex, colIndex) {
    return { type: DELETE_COL, payload: {rowIndex, colIndex}};
}

export function setTypeingDir(x, y) {
    return { type: SET_TYPEING_DIRECTION, payload: {x, y} };
}