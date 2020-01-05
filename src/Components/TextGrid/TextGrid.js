import React, { useEffect, useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../../store';
import * as actions from './store/actions';
import './TextGrid.scss';

function TextGridCanvasRender(canvas, ctx, state) {

    const backgroundColor = 'rgb(30, 30, 30)';
    const gridColor = 'rgb(37, 37, 38)';
    const textColor = 'rgb(220, 220, 170)';


    ctx.save();

    // render the background color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // basicly a camera, move the to the position of the scrollbars for rendering offsets.
    ctx.translate(-state.viewport.scrollX, -state.viewport.scrollY);


    // calculate the cells to render based on the scrollbar positions
    const numCols = Math.floor(canvas.width / state.cellWidth);
    const numRows = Math.floor(canvas.height / state.cellHeight);
    const startCol = Math.floor(state.viewport.scrollX / state.cellWidth);
    const startRow = Math.floor(state.viewport.scrollY / state.cellHeight);
    const endCol = startCol + numCols + 1;
    const endRow = startRow + numRows + 1;


    // begin: render the Grid
    // ------------------------------------------------------------------------
    ctx.strokeStyle = gridColor;
    ctx.beginPath();

    // vertical lines
    for(let xi = startCol; xi < endCol && xi <=state.cols; xi++){
        const xPos = xi * state.cellWidth;
        ctx.moveTo(xPos, state.viewport.scrollY);
        ctx.lineTo(xPos, state.rows  * state.cellHeight);
    }

    // horizontal  lines
    for(let yi = startRow; yi<endRow && yi <=state.rows; yi++){
        const yPos = yi * state.cellHeight;
        ctx.moveTo(state.viewport.scrollX, yPos);
        ctx.lineTo(state.cols * state.cellWidth, yPos);
    }

    ctx.stroke();
    ctx.closePath();
    

    // ------------------------------------------------------------------------
    // end: render the grid

    // begin: render the instructions
    // -----------------------------------------------------------------------
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;
    ctx.font = '10pt source-code-pro, Menlo, Monaco, Consolas'
    
    for(let yi = startRow; yi<state.cells.length && yi<endRow; yi++){
        for(let xi = startCol; xi < state.cells[yi].length && xi<endCol; xi++) {
            const xPos = xi * state.cellWidth + (state.cellWidth * 0.5);
            const yPos = yi * state.cellHeight + (state.cellHeight * 0.5) + 1;
            ctx.fillText(state.cells[yi][xi], xPos, yPos);
        }
    }
    // -----------------------------------------------------------------------
    // end: render the instructions

    // begin: render an overlay over the column and row cells
    // -----------------------------------------------------------------------
    {
        const xPos = state.hover.colIndex * state.cellWidth;
        const yPos = state.hover.rowIndex * state.cellHeight
    
        if( yPos < state.rows * state.cellHeight && xPos < state.cols * state.cellWidth) {
            ctx.globalAlpha = 0.01;
            ctx.fillStyle = 'white';

            ctx.fillRect(state.viewport.scrollX, yPos, state.cols * state.cellWidth, state.cellHeight);
            ctx.fillRect(xPos, state.viewport.scrollY, state.cellWidth, state.rows * state.cellHeight);
            
            ctx.globalAlpha = 1;
        }
    }

    // -----------------------------------------------------------------------
    // end: render an overlay over the hovered cells

    // begin: render the hilighted cells
    // -----------------------------------------------------------------------

    if( state.selection !== null) {
        const left = Math.min(state.selection.startColIndex, state.selection.endColIndex);
        const right = Math.max(state.selection.startColIndex, state.selection.endColIndex);
        const top = Math.min(state.selection.startRowIndex, state.selection.endRowIndex);
        const bottom = Math.max(state.selection.startRowIndex, state.selection.endRowIndex);

        const xPos = left * state.cellWidth;
        const yPos = top * state.cellHeight;
        const width = (right - left) * state.cellWidth;
        const height = (bottom - top) * state.cellHeight;

        ctx.globalAlpha = 0.04;
        ctx.fillStyle = textColor;
        
        ctx.fillRect(xPos, yPos, width, height);
        
        ctx.globalAlpha = 1;
        ctx.strokeStyle = textColor;
        ctx.strokeRect(xPos, yPos, width, height);
    }
   
    // -----------------------------------------------------------------------
    // begin: render the hilighted cells

    // begin: render the current cursor position
    // -----------------------------------------------------------------------

    if(state.target.colIndex >= startCol && state.target.colIndex < endCol &&
        state.target.rowIndex >= startRow && state.target.rowIndex < endRow )
    {
        const xPos = state.target.colIndex * state.cellWidth;
        const yPos = state.target.rowIndex * state.cellHeight;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(xPos, yPos, state.cellWidth, state.cellHeight);

        ctx.strokeStyle = 'yellow';
        ctx.beginPath();

        // render for curstor moving to the right
        if( state.target.dir.x > 0 ) {
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos, yPos + state.cellHeight);
        }

        // render for cursor moving to the left
        if( state.target.dir.x < 0 ) {
            ctx.moveTo(xPos + state.cellWidth, yPos);
            ctx.lineTo(xPos + state.cellWidth, yPos + state.cellHeight);
        }

        // render for cursor moving up
        if( state.target.dir.y > 0 ) {
            ctx.moveTo(xPos, yPos);
            ctx.lineTo(xPos + state.cellWidth, yPos);
        }

        // render for cursor moving down
        if( state.target.dir.y < 0 ) {
            ctx.moveTo(xPos, yPos + state.cellHeight);
            ctx.lineTo(xPos + state.cellWidth, yPos + state.cellHeight);
        }

        
        ctx.closePath();
        ctx.stroke();
        

    }

    // -----------------------------------------------------------------------
    // begin: render the current cursor position

    ctx.restore();

}


export const TextGridCanvas = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        getCells: () => store.getState().textGrid.cells
    }), []);

    const dispatch = useDispatch();

    const fullWidth = useSelector(state => state.textGrid.cols * state.textGrid.cellWidth);
    const fullHeight = useSelector(state => state.textGrid.rows * state.textGrid.cellHeight);

    console.log({fullWidth, fullHeight});

    const canvasRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        dispatch(actions.setText(props.config.text))
    }, [props.config.text]);

    useEffect(() => {
        dispatch(actions.setCellSize(props.config.cellWidth, props.config.cellHeight));
    }, [props.config.cellWidth, props.config.cellHeight]);

    useLayoutEffect(() => {       

        if( canvasRef.current ) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let requestAnimFrameObj = {};
            const renderLoopFn = () => {
                TextGridCanvasRender(canvas, ctx, store.getState().textGrid);
                requestAnimFrameObj.handle = requestAnimationFrame(renderLoopFn);
            };
            renderLoopFn();
            
            return () => {
                console.log('cleanup');
                cancelAnimationFrame(requestAnimFrameObj.handle)
            }
        }
        
    }, [canvasRef.current]);

    useEffect(() => {
        resizeCanvas();
    }, [props.dimensions]);    

    const handleMouseMove = (event) => {
        
        // calculate the mouse position relative to the position of this component.
        let bounds = event.currentTarget.getBoundingClientRect();
        let mouseX = event.clientX - bounds.left;
        let mouseY = event.clientY - bounds.top;
        
        dispatch(actions.mouseMoved({mouseX, mouseY}));
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
        event.currentTarget.focus();
        dispatch(actions.mouseDown());
    };

    const handleMouseUp = (event) => {
        event.preventDefault();
        dispatch(actions.mouseUp());
    };

    const handleScroll = (event) => {        
        resizeCanvas();
    };

    const handleMouseLeave = (event) => {
        dispatch(actions.setHoverCell({rowIndex: -1, colIndex: -1}));
    };

    const resizeCanvas = () => {
        const width = scrollRef.current ? scrollRef.current.clientWidth : 0;
        const height = scrollRef.current ? scrollRef.current.clientHeight : 0;
        const scrollX = scrollRef.current ? scrollRef.current.scrollLeft : undefined;
        const scrollY = scrollRef.current ? scrollRef.current.scrollTop : undefined;
        if( canvasRef.current && (canvasRef.current.width !== width || canvasRef.current.height !== height)) {
            canvasRef.current.width = width;
            canvasRef.current.height = height;
        }
        console.log( {width, height, scrollX, scrollY });
        dispatch(actions.setViewport(width, height, scrollX, scrollY));
    }


    const handleKeyPress = (event) => {

        console.log('test');
        
        if( event.ctrlKey ){
            const key = event.key.toLowerCase();

            if( key === 'v') {
                // Paste event - do nothing, this will allow the onPaste event to fire
            }
            else if( key === 'c') {
                dispatch( actions.copy());
                event.preventDefault();
            }
            else if( key === 'x' ) {
                dispatch( actions.cut());
                event.preventDefault();
            }
            
        }
        else {
            event.preventDefault();
            dispatch(actions.keyDown({ 
                key: event.key, 
                isShiftDown: event.shiftKey, 
                callback: props.config.events.onKeyDown
            }));
        }
    };

    return(
        <div ref={scrollRef} className="customScrollbars" onScroll={handleScroll} style={{position: 'relative', width: '100%', height: '100%', overflow: 'auto'}}>
        <canvas ref={canvasRef}
            style={{position: 'sticky', left: 0, top: 0, display: 'block'}}
            tabIndex='0'
            onKeyDown={handleKeyPress}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}></canvas>
        <div style={{position: 'absolute', width: fullWidth, height: fullHeight, pointerEvents: 'none', left: 0, top: 0}}></div>
        </div>
    );
});

// /**
//  * This component renders the text grid and handles
//  */
// export const TextGrid = forwardRef((props, ref) => {

//     useImperativeHandle(ref, () => ({
//         getCells: () => store.getState().textGrid.cells
//     }), []);

//     const dispatch = useDispatch();

//     const isInitialised = useSelector(state => state.textGrid.initialised);
//     const vRows = useSelector(state => state.textGrid.viewport.rows);
//     const vXOffset = useSelector(state => state.textGrid.viewport.xOffset);
//     const vYOffset = useSelector(state => state.textGrid.viewport.yOffset);
//     const rowsArr = vRows > 0 ? new Array(vRows).fill('') : [];

//     const elementRef = useRef(null);
//     useEffect(() => {
//         if( !isInitialised ) {
//             const width = elementRef.current ? elementRef.current.offsetWidth : 0;
//             const height = elementRef.current ? elementRef.current.offsetHeight: 0;

//             dispatch(actions.setupGrid(width, height, props.config.text, props.config.cellWidth, props.config.cellHeight));
//         }
//         const onPasteEvent = document.addEventListener('paste', (event) => {
//             dispatch(actions.paste(event.clipboardData.getData('text')));
//         });

//         return () => {
//             document.removeEventListener('paste', onPasteEvent);
//         };

//     }, [isInitialised, props, dispatch]);

//     const handleMouseMove = (event) => {
        
//         // calculate the mouse position relative to the position of this component.
//         let bounds = event.currentTarget.getBoundingClientRect();
//         let mouseX = event.clientX - bounds.left;
//         let mouseY = event.clientY - bounds.top;
        
//         dispatch(actions.mouseMoved({mouseX, mouseY}));
//     };

//     const handleKeyPress = (event) => {
        
//         if( event.ctrlKey ){
//             const key = event.key.toLowerCase();

//             if( key === 'v') {
//                 // Paste event - do nothing, this will allow the onPaste event to fire
//             }
//             else if( key === 'c') {
//                 dispatch( actions.copy());
//                 event.preventDefault();
//             }
//             else if( key === 'x' ) {
//                 dispatch( actions.cut());
//                 event.preventDefault();
//             }
            
//         }
//         else {
//             event.preventDefault();
//             dispatch(actions.keyDown({ 
//                 key: event.key, 
//                 isShiftDown: event.shiftKey, 
//                 callback: props.config.events.onKeyDown
//             }));
//         }
        
//     };

//     const handleMouseDown = (event) => {
//         event.preventDefault();
//         event.currentTarget.focus();
//         dispatch(actions.mouseDown());
//     };

//     const handleMouseUp = (event) => {
//         event.preventDefault();
//         dispatch(actions.mouseUp());
//     };

//     const handleScroll = (event) => {
//         event.preventDefault();
//         dispatch(actions.scrollView(event.target.scrollLeft, event.target.scrollTop));
//     };

//     const handleMouseLeave = (event) => {
//         dispatch(actions.setHoverCell({rowIndex: -1, colIndex: -1}));
//     };


//     if( elementRef.current ) {
//         // set the scrollposition
//         // this.refs.messages.scrollTop = this.refs.messages.scrollHeight
//         elementRef.current.scrollLeft = vXOffset * props.config.cellWidth;
//         elementRef.current.scrollTop = vYOffset * props.config.cellHeight;
//     }

//     return(
//         <div ref={elementRef} className="text-grid-area"
//             onScroll={handleScroll}
//             draggable
//             tabIndex='0'
//             onKeyDown={handleKeyPress}
//             onMouseMove={handleMouseMove} 
//             onMouseUp={handleMouseUp}
//             onMouseDown={handleMouseDown}
//             onMouseLeave={handleMouseLeave}>
//             <div  className="text-grid">

//                 {rowsArr.map((cr, rowIndex) =>
//                     <TextGridRow key={`gridRow-${rowIndex}`} rowId={rowIndex + vYOffset}></TextGridRow> 
//                 )}
//                 <TextGridRangeSelection></TextGridRangeSelection>
//             </div>
//             <div style={{width: 10000, height: 10000, position: 'absolute'}}></div>
//         </div>
//     );
// });


// /**
//  * Rhis component renders each row of cells
//  */
// function TextGridRow(props) {
    
//     const rowId = props.rowId;
//     const cellHeight = useSelector(state => state.textGrid.cellHeight);
//     const vCols = useSelector(state => state.textGrid.viewport.cols);
//     const vXOffset = useSelector(state => state.textGrid.viewport.xOffset);
//     const cellArr = vCols > 0 ? new Array(vCols).fill('') : [];

//     return(<div className={'text-grid-row'} style={{height: cellHeight, maxHeight: cellHeight, minHeight: cellHeight}}>
//         {cellArr.map((cell, colId) => {
//             const colIndex = colId + vXOffset;
//             return (<TextGridCell key={'cell-'+rowId+'-'+colIndex} rowId={rowId} colId={colIndex} ></TextGridCell>);
//         })}
//     </div>);
// }

// /**
//  * This component renders an individual cell within the table.
//  */
// function TextGridCell(props) {


//     const rowId = props.rowId;
//     const colId = props.colId;

//     const cell = useSelector(state => {
//         if(rowId < state.textGrid.cells.length && colId < state.textGrid.cells[rowId].length)
//             return state.textGrid.cells[rowId][colId];
//         return '';
//     });
    
//     const cellWidth = useSelector(state => state.textGrid.cellWidth);

//     const isRowHovered = useSelector (state => state.textGrid.hover.rowIndex === rowId );
//     const isColHovered = useSelector (state => state.textGrid.hover.colIndex === colId );
//     const isCellSelected = useSelector (state => state.textGrid.target.rowIndex === rowId && state.textGrid.target.colIndex === colId);
//     const isBottomEdge = useSelector( state => state.textGrid.rows-1 === rowId );
//     const isRightEdge = useSelector( state => state.textGrid.cols-1 === colId);

//     // the isCellSelected ternary is used to prevent re-rendering of every cell when the direction changes
//     const textDirX = useSelector(state => isCellSelected ? state.textGrid.target.dir.x : 0);
//     const textDirY = useSelector(state => isCellSelected ? state.textGrid.target.dir.y : 0);

//     const isCellHovered =  isRowHovered && isColHovered;
    
    

//     const getClassNames = () => {

//         const classNames = ['text-grid-cell'];

//         if( isCellHovered ) classNames.push( 'cell-hover' );
//         if( isRowHovered )  classNames.push('row-hover');
//         if( isColHovered ) classNames.push('col-hover');
//         if( isCellSelected ) classNames.push('active-override');
//         if( isCellSelected && textDirX > 0 ) classNames.push('active-override-left');
//         if( isCellSelected && textDirX < 0 ) classNames.push('active-override-right');
//         if( isCellSelected && textDirY > 0 ) classNames.push('active-override-top');
//         if( isBottomEdge ) classNames.push('bottom-edge');
//         if( isRightEdge ) classNames.push('right-edge');

//         return classNames.join(' ');
//     }

    

//     return(<span className={getClassNames()}  style={{width: cellWidth, maxWidth: cellWidth, minWidth: cellWidth}} >
//         <div className="text-grid-cell-content">
//             {cell}
//         </div>
//     </span>);
// }

// /**
//  * This component renders the text selection area
//  */
// function TextGridRangeSelection() {

//     const selection = useSelector(state => state.textGrid.selection );
//     const cellWidth = useSelector(state => state.textGrid.cellWidth);
//     const cellHeight = useSelector(state => state.textGrid.cellHeight);
//     const viewport = useSelector(state => state.textGrid.viewport);

//     // with the viewport in place, we need to calculate the relative position of the selction box
//     let sci = selection.startColIndex - viewport.xOffset;
//     const eci = selection.endColIndex - viewport.xOffset;
//     let sri = selection.startRowIndex - viewport.yOffset;
//     const eri = selection.endRowIndex - viewport.yOffset;

//     // if we are dragging upward, than our selection needs to start from the
//     // top of the next row.
//     if(eri < sri) { sri += 1; }
//     if(eci < sci) { sci += 1; }

//     // calculate the size and position of the selection box
//     // position is relative to the top left of the TextGrid component
//     const width = ((eci - sci) * (cellWidth-1));
//     const height = (eri- sri + 1) * (cellHeight-1) + ((eri - sri) < 0 ? -(cellHeight-1) : 0);
//     const left = (sci * (cellWidth-1)) + Math.min(width, 0);
//     const top = (sri * (cellHeight-1)) + Math.min(height, 0);
//     let style={ width: Math.abs(width), height: Math.abs(height), left, top };

//     if(width === 0 || height === 0)
//         style.display = 'none';

//     // render the selection grid.
//     return(<div className='text-grid-selection' style={style}></div>);
// }


/**
 * 
 */
export function TextGridStatusBar() {
    const state = useSelector(state => state.textGrid );

    return(<div className="text-grid-status-bar">
        <ul>
            <li>Rows: {state.rows}</li>
            <li>Cols: {state.cols}</li>            
        </ul>
    </div>);
}



