import * as actions from './actions';

 const initialState = {
    initialised: false,
    cellWidth: 24,
    cellHeight: 24, 
    rows: 0,    // TODO: set to length of cells
    cols: 0,    // TODO: set to length of longest row in cells.
    cells: [],
    insertMode: false,

    viewport: {
        rows: 0,
        cols: 0,
        xOffset: 0,
        yOffset: 0
    },

    hover: {
        rowIndex: -1,
        colIndex: -1,
    },

    target: {
        rowIndex: -1,
        colIndex: -1,
        dir: {x: 1, y: 0}
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

    console.log(state.rows);

    switch(action.type) {
        /**
         * 
         */
        case actions.INITIALISE_GRID: {
            const viewport = {
                ...state.viewport,
                rows: action.payload.rows,
                cols: action.payload.cols
            };
            const size = _getSize(action.payload.cells);
            return {...state, ...action.payload, ...size, initialised: true, viewport};
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

            const rowIndex = action.payload.rowIndex ? action.payload.rowIndex : state.target.rowIndex;
            const colIndex = action.payload.colIndex ? action.payload.colIndex : state.target.colIndex;
            const value = action.payload.value;

            const cells = state.cells;

            _fillArrCells(cells, colIndex, rowIndex);
            cells[rowIndex][colIndex] = value;

            _trimArrCells(cells);
            const newSize = _getSize(cells);

            
            return {...state, ...newSize, cells };
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
            const viewport = calculateViewport(state.viewport, target);
            return {...state, viewport, target, selection };
        }

        /**
         * 
         */
        case actions.MOVE_TARGET_CELL: {
            const modifier = action.payload.invert ? -1 : 1;
            const xDir = action.payload && action.payload.x !== undefined ? action.payload.x : state.target.dir.x;
            const yDir = action.payload && action.payload.y !== undefined ? action.payload.y : state.target.dir.y;
            const target = {...state.target, ..._moveTarget(state.target, xDir * modifier, yDir * modifier) };
            const selection = {
                ...state.selection,
                startRowIndex: target.rowIndex,
                startColIndex: target.colIndex,
                endRowIndex: target.rowIndex,
                endColIndex: target.colIndex
            };

            const viewport = calculateViewport(state.viewport, target);

            return { ...state, viewport, target, selection };
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
            };
            return {...state, selection, target };
        }

        case actions.CLEAR_SELECTION_AREA: {
            const cells = state.cells;
            const sri = Math.min(state.selection.startRowIndex, state.selection.endRowIndex);
            const eri = Math.max(state.selection.startRowIndex, state.selection.endRowIndex);
            const sci = Math.min(state.selection.startColIndex, state.selection.endColIndex);
            const eci = Math.max(state.selection.startColIndex, state.selection.endColIndex);

            for(let r=sri; r<=eri && r < cells.length; r++){
                for(let c=sci; c<eci && c < cells[r].length; c++) {
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

            if( !state.selection.isDragging ) {
                // Begin Dragging
                const target = {
                    ...state.target,
                    rowIndex: state.hover.rowIndex,
                    colIndex: state.hover.colIndex,
                };
                const selection = {...state.selection, isDragging: true};
                
    
                return {...state, selection, target};
            }
            else {
                // Continue dragging
                const selection = {...state.selection};
                selection.endRowIndex = state.hover.rowIndex;
                selection.endColIndex = state.hover.colIndex;
                selection.endColIndex += (selection.endColIndex < selection.startColIndex ? 0 : 1);
                
                const target = {
                    ...state.target,
                    rowIndex: state.hover.rowIndex,
                    colIndex: state.hover.colIndex,
                };
                return {...state, selection, target };
            }
           
        }

        /**
         * 
         */
        case actions.SET_TYPEING_DIRECTION: {
            const target = { ...state.target };
            target.dir = { ...action.payload };
            return {...state, target };
            //return state;
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

            const size = _getSize(cells);

            return {...state, ...size, cells, selection };
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
                for(let x=xMin; x<xMax; x++) {
                    _fillArrCells(cells, x, y);
                    cells[y][x] = action.payload;
                }
            }

            const size = _getSize(cells);

            return {...state, ...size, cells };
        }

        /**
         * 
         */
        default: {
            return state;
        }
    }
};

function _getSize(arr) {
    const rows = arr.length;
    const cols = Math.max(...arr.map(z => z.length));
    return {rows, cols};
}

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

function _moveTarget(target, dx, dy) {

    let rowIndex = target.rowIndex + dy;
    let colIndex = target.colIndex + dx;

    // prevent wrapping
    rowIndex = Math.max(rowIndex, 0);
    colIndex = Math.max(colIndex, 0);

    return { rowIndex, colIndex };
}

function calculateViewport(viewport, target) {
    const v = {...viewport};

    const vLeft = v.xOffset;
    const vRight = v.xOffset + v.cols - 2;
    const vTop = v.yOffset;
    const vBottom = v.yOffset + v.rows - 1;

    // if the target is within the viewport, dont change
    if( target.colIndex >= vLeft && target.colIndex <= vRight &&
        target.rowIndex >= vBottom && target.rowIndex <= vTop )
        return viewport;

    if( target.colIndex < vLeft ) 
        v.xOffset = target.colIndex;

    if(  target.colIndex >= vRight ) 
        v.xOffset = (target.colIndex - v.cols) + 3;

    if( target.rowIndex < vTop ) 
        v.yOffset = target.rowIndex;

    if( target.rowIndex >= vBottom ) 
        v.yOffset = (target.rowIndex - v.rows) + 2;

    return v;
}