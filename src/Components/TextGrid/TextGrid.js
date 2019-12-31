import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '../../store';
import * as actions from './store/actions';
import './TextGrid.scss';


/**
 * This component renders the text grid and handles
 */
export const TextGrid = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        test: () => console.log('hello world'),
        getCells: () => store.getState().textGrid.cells
    }), []);

    const dispatch = useDispatch();

    const vRows = useSelector(state => state.textGrid.viewport.rows);
    const vXOffset = useSelector(state => state.textGrid.viewport.xOffset);
    const vYOffset = useSelector(state => state.textGrid.viewport.yOffset);
    const rowsArr = vRows > 0 ? new Array(vRows).fill('') : [];

    const elementRef = useRef(null);
    useEffect(() => {
        const width = elementRef.current ? elementRef.current.offsetWidth : 0;
        const height = elementRef.current ? elementRef.current.offsetHeight: 0;

        dispatch(actions.setupGrid(width, height, props.config.text, props.config.cellWidth, props.config.cellHeight));

        const onPasteEvent = document.addEventListener('paste', (event) => {
            // TODO: paste text at cursor location
            dispatch(actions.paste(event.clipboardData.getData('text')));
            //console.log("PASTE");
            //console.log(event.clipboardData.getData('text'));
        });

        return () => {
            document.removeEventListener(onPasteEvent);
        };

    }, [props, dispatch]);

    const handleMouseMove = (event) => {
        
        // calculate the mouse position relative to the position of this component.
        let bounds = event.currentTarget.getBoundingClientRect();
        let mouseX = event.clientX - bounds.left;
        let mouseY = event.clientY - bounds.top;
        
        dispatch(actions.mouseMoved({mouseX, mouseY}));
    };

    const handleKeyPress = (event) => {
        
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
        event.preventDefault();
        dispatch(actions.scrollView(event.target.scrollLeft, event.target.scrollTop));
    };

    const handleMouseLeave = (event) => {
        dispatch(actions.setHoverCell({rowIndex: -1, colIndex: -1}));
    };

    const handleCopy = (event) => {
        console.log("COPY");
        event.preventDefault();
    };

    const handleCut = (event) => {
        console.log("CUT");
        event.preventDefault();
    };

    const handlePaste = (event) => {
        console.log("PASTE");
        event.preventDefault();
    }

    if( elementRef.current ) {
        // set the scrollposition
        // this.refs.messages.scrollTop = this.refs.messages.scrollHeight
        elementRef.current.scrollLeft = vXOffset * props.config.cellWidth;
        elementRef.current.scrollTop = vYOffset * props.config.cellHeight;
    }

    console.log('GRID RE-RENDERED');

    return(
        <div ref={elementRef} className="text-grid-area"
            onScroll={handleScroll}
            draggable
            tabIndex='0'
            onKeyDown={handleKeyPress}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}>
            <div  className="text-grid">

                {rowsArr.map((cr, rowIndex) =>
                    <TextGridRow key={`gridRow-${rowIndex}`} rowId={rowIndex + vYOffset}></TextGridRow> 
                )}
                <TextGridRangeSelection></TextGridRangeSelection>
            </div>
            <div style={{width: 10000, height: 10000, position: 'absolute'}}></div>
        </div>
    );
});


/**
 * Rhis component renders each row of cells
 */
function TextGridRow(props) {
    
    const rowId = props.rowId;
    const cellHeight = useSelector(state => state.textGrid.cellHeight);
    const vCols = useSelector(state => state.textGrid.viewport.cols);
    const vXOffset = useSelector(state => state.textGrid.viewport.xOffset);
    const cellArr = vCols > 0 ? new Array(vCols).fill('') : [];

    console.log('ROW RE-RENDERED');

    return(<div className={'text-grid-row'} style={{height: cellHeight, maxHeight: cellHeight, minHeight: cellHeight}}>
        {cellArr.map((cell, colId) => {
            const colIndex = colId + vXOffset;
            return (<TextGridCell key={'cell-'+rowId+'-'+colIndex} rowId={rowId} colId={colIndex} ></TextGridCell>);
        })}
    </div>);
}

/**
 * This component renders an individual cell within the table.
 */
function TextGridCell(props) {


    const rowId = props.rowId;
    const colId = props.colId;

    const cell = useSelector(state => {
        if(rowId < state.textGrid.cells.length && colId < state.textGrid.cells[rowId].length)
            return state.textGrid.cells[rowId][colId];
        return '';
    });
    
    const cellWidth = useSelector(state => state.textGrid.cellWidth);

    const isRowHovered = useSelector (state => state.textGrid.hover.rowIndex === rowId );
    const isColHovered = useSelector (state => state.textGrid.hover.colIndex === colId );
    const isCellSelected = useSelector (state => state.textGrid.target.rowIndex === rowId && state.textGrid.target.colIndex === colId);

    // the isCellSelected ternary is used to prevent re-rendering of every cell when the direction changes
    const textDirX = useSelector(state => isCellSelected ? state.textGrid.target.dir.x : 0);
    const textDirY = useSelector(state => isCellSelected ? state.textGrid.target.dir.y : 0);

    const isCellHovered =  isRowHovered && isColHovered;
    
    

    const getClassNames = () => {

        const classNames = ['text-grid-cell'];

        if( isCellHovered ) classNames.push( 'cell-hover' );
        if( isRowHovered )  classNames.push('row-hover');
        if( isColHovered ) classNames.push('col-hover');
        if( isCellSelected ) classNames.push('active-override');
        if( isCellSelected && textDirX > 0 ) classNames.push('active-override-left');
        if( isCellSelected && textDirX < 0 ) classNames.push('active-override-right');
        if( isCellSelected && textDirY > 0 ) classNames.push('active-override-top');
        if( isCellSelected && textDirY < 0 ) classNames.push('active-override-bottom');

        return classNames.join(' ');
    }

    

    return(<span className={getClassNames()}  style={{width: cellWidth, maxWidth: cellWidth, minWidth: cellWidth}} >
        <div className="text-grid-cell-content">
            {cell}
        </div>
    </span>);
}

/**
 * This component renders the text selection area
 */
function TextGridRangeSelection() {

    const selection = useSelector(state => state.textGrid.selection );
    const cellWidth = useSelector(state => state.textGrid.cellWidth);
    const cellHeight = useSelector(state => state.textGrid.cellHeight);
    const viewport = useSelector(state => state.textGrid.viewport);

    // with the viewport in place, we need to calculate the relative position of the selction box
    let sci = selection.startColIndex - viewport.xOffset;
    const eci = selection.endColIndex - viewport.xOffset;
    let sri = selection.startRowIndex - viewport.yOffset;
    const eri = selection.endRowIndex - viewport.yOffset;

    // if we are dragging upward, than our selection needs to start from the
    // top of the next row.
    if(eri < sri) { sri += 1; }
    if(eci < sci) { sci += 1; }

    // calculate the size and position of the selection box
    // position is relative to the top left of the TextGrid component
    const width = ((eci - sci) * (cellWidth-1));
    const height = (eri- sri + 1) * (cellHeight-1) + ((eri - sri) < 0 ? -(cellHeight-1) : 0);
    const left = (sci * (cellWidth-1)) + Math.min(width, 0);
    const top = (sri * (cellHeight-1)) + Math.min(height, 0);
    let style={ width: Math.abs(width), height: Math.abs(height), left, top };

    if(width === 0 || height === 0)
        style.display = 'none';

    // render the selection grid.
    return(<div className='text-grid-selection' style={style}></div>);
}


/**
 * 
 */
export function TextGridStatusBar() {
    const viewport = useSelector(state => state.textGrid.viewport );
    const target = useSelector(state => state.textGrid.target);
    const selection = useSelector(state => state.textGrid.selection);

    return(<div className="text-grid-status-bar">
        <ul>
            <li>R: {viewport.rows}</li>
            <li>C: {viewport.cols}</li>
            <li>SX: {viewport.xOffset}</li>
            <li>SY: {viewport.yOffset}</li>
            <li>TX: {target.colIndex}{}</li>
            <li>TY: {target.rowIndex}{}</li>

            <li>SX: {selection.startColIndex}</li>
            <li>SY: {selection.startRowIndex}</li>
            <li>EX: {selection.endColIndex}</li>
            <li>EY: {selection.endRowIndex}</li>
            <li>dragging: {selection.isDragging ? 'true' : 'false'}</li>
            <li>mouseDown: {selection.isMouseDown? 'true' : 'false'}</li>
            
        </ul>
    </div>);
}



