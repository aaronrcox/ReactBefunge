import * as actions from './actions';

const initialState = {
    cellWidth: 24,
    cellHeight: 24, 
    rows: 0,
    cols: 0,
    cells: [],
    insertMode: true,

    viewport: {
        rows: 0,
        cols: 0,
        xOffset: 0,
        yOffset: 0
    },

    hover: {
        rowIndex: -1,
        colIndex: -1,
        cellIndex: -1
    },

    target: {
        rowIndex: -1,
        colIndex: -1,
        cellIndex: -1
    },

    selection: {
        isMouseDown: false,
        isDragging: false,
        startRowIndex: 0,
        startColIndex: 0,
        endRowIndex: 0,
        endColIndex: 0
    },

    selectedCells: []
};

export function reducer(state = initialState, action) {

    switch(action.type) {

        /**
         * 
         */
        case actions.INITIALISE_GRID: {
            return {...state, ...action.payload};
        }

        /**
         * 
         */
        case actions.SET_HOVER_CELL: {
            return {...state, hover: action.payload };
        }

        /**
         * 
         */
        case actions.SET_CELL_VALUE: {
            const rowId = action.payload.rowIndex;
            const colId = action.payload.colIndex;
            const value = action.payload.value;
            const cells = state.cells;
            _fillArrCells(cells, colId, rowId);
            cells[rowId][colId] = value;
            return {...state, cells };
        }

        /**
         * 
         */
        case actions.SET_TARGET_CELL: {
            const target = {...state.target, ...action.payload };
            const selection = {
                ...state.selection,
                startRowIndex: target.rowIndex,
                startColIndex: target.colIndex,
                endRowIndex: target.rowIndex,
                endColIndex: target.colIndex
            };
            return {...state, target, selection };
        }

        /**
         * 
         */
        case actions.SET_INSERT_MODE: {
            return {...state, insertMode: action.payload.insertMode }
        }

        /**
         * 
         */
        case actions.SHIFT_CELLS_IN_RANGE: {
            const {startColIndex, startRowIndex, endColIndex, endRowIndex, dx, dy} = action.payload;
            const cells = state.cells;
            if(dx < 0 ) {  _shiftLeft(startColIndex, startRowIndex, endRowIndex, cells, Math.abs(dx));  }
            if(dx > 0 ) {  _shiftRight(startColIndex, startRowIndex, endRowIndex, cells, Math.abs(dx));  }

            return {...state, cells};
        }

        /**
         * 
         */
        case actions.INSERT_ROW: {
            const {rowIndex} = action.payload;
            const cells = state.cells;
            cells.splice(rowIndex, 0, []);
            return {...state, cells};
        }

        /**
         * 
         */
        case actions.INSERT_COL: {
            const {rowIndex, colIndex} = action.payload;
            const cells = state.cells;
            while(cells.length <= rowIndex) cells.push([]);
            while(cells[rowIndex].length <= colIndex) cells[rowIndex].push('');
            cells[rowIndex].splice(colIndex, 0, '');
            return {...state, cells};
        }

        /**
         * 
         */
        case actions.DELETE_ROW: {
            const {rowIndex} = action.payload;
            const cells = state.cells;
            cells.splice(rowIndex, 1);
            return {...state, cells};
        }

        /**
         * 
         */
        case actions.DELETE_COL: {
            console.log(actions.DELETE_COL);
            const {rowIndex, colIndex} = action.payload;
            const cells = state.cells;
            if(cells.length <= rowIndex) return state;
            if(cells[rowIndex].length <= colIndex) return state;
            cells[rowIndex].splice(colIndex, 1);
            return {...state, cells};
        }

        /**
         * 
         */
        case actions.SET_SELECTION_AREA: {
            const selection = {...state.selection, ...action.payload};
            const target = {
                ...state.target,
                rowIndex: selection.endRowIndex,
                colIndex: selection.endColIndex,
                cellIndex: selection.endRowIndex * state.cols + selection.endColIndex
            };
            return {...state, selection, target };
        }

        /**
         * 
         */
        case actions.MOUSE_DOWN: {
            const selection = {...state.selection, isMouseDown: true};
            return {...state,  selection}
        }

        /**
         * 
         */
        case actions.MOUSE_UP: {
            const selection = {...state.selection, isMouseDown: false};
            return {...state,  selection}
        }

        /**
         * 
         */
        case actions.SCROLL_VIEW: {
            const {xOffset, yOffset} = action.payload;
            const viewport = {...state.viewport, 
                xOffset: Math.floor(xOffset / state.cellWidth),
                yOffset: Math.floor(yOffset / state.cellHeight)    
            };
            return { ...state, viewport };
        }

        /**
         * 
         */
        case actions.DRAG_START: {
            const target = {...state.target};
            const selection = {...state.selection, isDragging: true};
            selection.startColIndex = target.colIndex;
            selection.startRowIndex = target.rowIndex;
            selection.endColIndex = target.colIndex;
            selection.endRowIndex = target.rowIndex + 1;
            return {...state, selection};
        }

        /**
         * 
         */
        case actions.DRAG_END: {
            const selection = {...state.selection, isDragging: false};
            return {...state, selection }
        }

        /**
         * 
         */
        default: {
            return state;
        }
    }
};

function _shiftLeft(sx, sy, ey, arr, shiftCount) {
    for(let counter = 0; counter < shiftCount; counter++) {
        for(let ri=sy; ri<=ey; ri++) {
            arr[ri].splice(sx, 1);
            arr[ri].push('');
        }
        sx-=1;
    }
}

function _shiftRight(sx, sy, ey, arr, shiftCount) {
    for(let counter = 0; counter < shiftCount; counter++) {
        for(let ri=sy; ri<=ey; ri++) {
            if(arr[ri]) {
                arr[ri].pop();
                arr[ri].splice(sx, 0, ['']);
            }
        }
        sx+=1;
    }
}

function _fillArrCells(arr, x, y) {
    while(arr.length <= y)
        arr.push([]);

    while(arr[y].length <= x)
        arr.push('');
}