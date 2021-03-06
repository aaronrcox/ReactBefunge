import * as actions from './actions';

 const initialState = {
    initialised: false,
    cellWidth: 24,
    cellHeight: 24, 
    rows: 25,    // Befunge 93 specifies strict row / col sizes
    cols: 80,    // Befunge 93 specifies strict row / col sizes
    cells: [],
    cursorDir: {x: 1, y: 0},

    viewport: {
        rows: 0,
        cols: 0,
        width: 0,
        height: 0,
        scrollX: 0,
        scrollY: 0,
        xOffset: 0,
        yOffset: 0
    },

    hover: {
        rowIndex: -1,
        colIndex: -1,
    },

    selection: {
        showSelection: false,
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
        case actions.SET_VIEWPORT: {
            const rows = Math.floor(action.payload.width / state.cellWidth);
            const cols = Math.floor(action.payload.height / state.cellHeight);
            const viewport = {...state.viewport, ...action.payload, rows, cols };
            return {...state, viewport};
        }

        case actions.SET_TEXT: {
            const text = action.payload.text;
            const cells = text.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/).map(line => line.split(''));
        
            return {...state, cells };
        }

        case actions.SET_CELL_SIZE: {
            const cellWidth = action.payload.width;
            const cellHeight = action.payload.height;
            return {...state, cellWidth, cellHeight };
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

            const rowIndex = action.payload.rowIndex ? action.payload.rowIndex : state.selection.startRowIndex;
            const colIndex = action.payload.colIndex ? action.payload.colIndex : state.selection.startColIndex;
            const value = action.payload.value;

            const cells = state.cells;

            _fillArrCells(cells, colIndex, rowIndex);
            cells[rowIndex][colIndex] = value;

            _trimArrCells(cells);

            
            return {...state, cells };
        }

        /**
         * 
         */
        case actions.SET_TARGET_CELL: {

            // set the target
            const rowIndex = action.payload.rowIndex;
            const colIndex = action.payload.colIndex;

            // reset the selection area
            const selection = {
                ...state.selection,
                showSelection: false,
                startRowIndex: rowIndex,
                startColIndex: colIndex,
                endRowIndex: rowIndex,
                endColIndex: colIndex
            };

            return {...state, selection };
        }

        /**
         * 
         */
        case actions.MOVE_SELECTION: {
            const invertMod = action.payload && action.payload.invert ? -1 : 1;
            const xDir = (action.payload && action.payload.xAmount !== undefined ? action.payload.xAmount : state.cursorDir.x) * invertMod;
            const yDir = (action.payload && action.payload.yAmount !== undefined ? action.payload.yAmount : state.cursorDir.y) * invertMod;
            
            const selection = { ...state.selection };
            selection.startColIndex += xDir;
            selection.endColIndex += xDir;
            selection.startRowIndex += yDir;
            selection.endRowIndex += yDir;

            return { ...state, selection };
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
            return {...state, selection };
        }

        case actions.CLEAR_SELECTION_AREA: {
            const cells = state.cells;
            const sri = Math.min(state.selection.startRowIndex, state.selection.endRowIndex);
            const eri = Math.max(state.selection.startRowIndex, state.selection.endRowIndex);
            const sci = Math.min(state.selection.startColIndex, state.selection.endColIndex);
            const eci = Math.max(state.selection.startColIndex, state.selection.endColIndex);

            for(let r=sri; r<=eri && r < cells.length; r++) {
                for(let c=sci; c<=eci && c < cells[r].length; c++) {
                    cells[r][c] = '';
                }
            }

            return {...state, cells };
        }

        /**
         * 
         */
        case actions.MOUSE_DOWN: {
            const target = {
                ...state.target,
                rowIndex: state.hover.rowIndex,
                colIndex: state.hover.colIndex,
            };
            const selection = {
                ...state.selection,
                showSelection: true,
                startColIndex: target.colIndex,
                startRowIndex: target.rowIndex,
                endColIndex: target.colIndex,
                endRowIndex: target.rowIndex,
                isDragging: false, 
                isMouseDown: true};
            return {...state,  target, selection}
        }

        /**
         * 
         */
        case actions.MOUSE_UP: {
            const selection = {...state.selection, isDragging: false, isMouseDown: false};
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
        case actions.DRAG: {

            //if( !state.selection.isDragging ) { // Begin Dragging
            //    const selection = {...state.selection, isDragging: true, showSelection: true};
            //    return {...state, selection};
            //}
            //else { // Continue dragging
                const selection = {...state.selection};
                selection.endRowIndex = state.hover.rowIndex;
                selection.endColIndex = state.hover.colIndex;
                return {...state, selection };
            //}  
        }

        /**
         * 
         */
        case actions.SET_TYPEING_DIRECTION: {
            const cursorDir = {  ...action.payload };
            return {...state, cursorDir };
        }

        case actions.PASTE: {

            const data = action.payload.replace(/\r\n/g, "\r").replace(/\n/g, "\r").split(/\r/).map(line => line.split(''));
            
            const cells = state.cells;

            const sx = state.selection.startColIndex;
            const sy = state.selection.startRowIndex;
            
            // number of rows / columns pasted
            const numCols = Math.max(...data.map(d => d.length));
            const numRows = data.length;


            // fill the cells with the paste data
            for(let y = 0; y<data.length; y++) {
                for(let x=0; x<data[y].length; x++) {
                    const xi = x + sx;
                    const yi = y + sy;
                    _fillArrCells(cells, xi, yi);
                    cells[yi][xi] = data[y][x];
                }
            }

            

            // update the selection area
            const selection = {
                ...state.selection,
                startRowIndex: sy,
                startColIndex: sx,
                endRowIndex: sy + numRows - 1,
                endColIndex: sx + numCols
            };

            

            return {...state, cells, selection };
        }

        case actions.FILL_SELECTION: {
            const cells = state.cells;

            const sx = state.selection.startColIndex;
            const sy = state.selection.startRowIndex;
            const ex = state.selection.endColIndex;
            const ey = state.selection.endRowIndex;

            // calculate the left right, top and bottom bounds of the selection
            const xMin = Math.min(sx, ex);
            const yMin = Math.min(sy, ey);
            const xMax = Math.max(sx, ex);
            const yMax = Math.max(sy, ey);

            // fill the cells with the paste data
            for(let y=yMin; y<=yMax; y++) {
                for(let x=xMin; x<=xMax; x++) {
                    _fillArrCells(cells, x, y);
                    cells[y][x] = action.payload;
                }
            }

            return {...state, cells };
        }

        /**
         * 
         */
        default: {
            return state;
        }
    }
};

function _fillArrCells(arr, x, y) {
    while(arr.length <= y)
        arr.push([]);

    while(arr[y].length <= x)
        arr[y].push('');
}

function _trimArrCells(arr) {
    
    // trim each row
    for(let rid = arr.length - 1; rid >= 0; rid--){
        for(let cid = arr[rid].length - 1; cid >= 0; cid--){
            if( arr[rid][cid] )  break;
            arr[rid].pop();
        }
    }

    // remove empty rows
    for(let rid = arr.length - 1; rid >= 0; rid--){
        if(arr[rid].length > 0) break;
        arr.pop();
    }

    console.log(arr);
}
