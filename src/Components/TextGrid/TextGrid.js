import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions';
import './TextGrid.scss';


/**
 * This component renders the text grid and handles
 */
function TextGrid(props) {

    const dispatch = useDispatch();

    const viewport = useSelector(state => state.viewport);
    const rowsArr = viewport.rows > 0 ? new Array(viewport.rows).fill('') : [];

    const ref = useRef(null);
    useEffect(() => {
        const width = ref.current ? ref.current.offsetWidth : 0;
        const height = ref.current ? ref.current.offsetHeight: 0;

        dispatch(actions.setupGrid(width, height, props.text, props.tw, props.th));

    }, [props, dispatch]);

    const handleMouseMove = (event) => {
        
        let bounds = event.currentTarget.getBoundingClientRect();
        let mouseX = event.clientX - bounds.left;
        let mouseY = event.clientY - bounds.top;
        
        dispatch(actions.mouseMoved({mouseX, mouseY}));
    }

    const handleKeyPress = (event) => {
        event.preventDefault();
        dispatch(actions.keyDown({key: event.key, isShiftDown: event.shiftKey}));
    }

    const handleMouseDown = (event) => {
        event.preventDefault();
        event.currentTarget.focus();
        dispatch(actions.mouseDown());
    }

    const handleMouseUp = (event) => {
        event.preventDefault();
        dispatch(actions.mouseUp());
    }

    const handleScroll = (event) => {
        event.preventDefault();
        dispatch(actions.scrollView(event.target.scrollLeft, event.target.scrollTop));
    }

    return(
        <div ref={ref} className="text-grid-area"
            onScroll={handleScroll}
            draggable
            tabIndex='0'
            onKeyDown={handleKeyPress}
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown} >
            <div  className="text-grid">

                {rowsArr.map((cr, rowIndex) =>
                    <TextGridRow key={`gridRow-${rowIndex}`} rowId={rowIndex + viewport.yOffset}></TextGridRow> 
                )}
                <TextGridRangeSelection></TextGridRangeSelection>
            </div>
            <div style={{width: 10000, height: 10000, position: 'absolute'}}></div>
        </div>
    );
}

/**
 * Rhis component renders each row of cells
 */
function TextGridRow(props) {
    
    const rowId = props.rowId;
    const cellHeight = useSelector(state => state.cellHeight);
    const viewport = useSelector(state => state.viewport);
    const numCols = useSelector(state=> state.cols);
    const cellArr = viewport.cols > 0 ? new Array(viewport.cols).fill('') : [];

    return(<div className={'text-grid-row'} style={{height: cellHeight, maxHeight: cellHeight, minHeight: cellHeight}}>
        {cellArr.map((cell, colId) => {
            const colIndex = colId + viewport.xOffset;
            const cellId = rowId * numCols + colIndex;
            return (<TextGridCell key={'cell-'+colIndex} rowId={rowId} colId={colIndex} cellId={cellId}></TextGridCell>);
        })}
    </div>);
}

/**
 * This component renders an individual cell within the table.
 */
function TextGridCell(props) {

    const rowId = props.rowId;
    const colId = props.colId;
    const cellId = props.cellId;

    const cell = useSelector(state => {
        if(rowId < state.cells.length && colId < state.cells[rowId].length)
            return state.cells[rowId][colId];
        return '';
    });
    
    const cellWidth = useSelector(state => state.cellWidth);

    const isRowHovered = useSelector (state => state.hover.rowIndex === rowId );
    const isColHovered = useSelector (state => state.hover.colIndex === colId );
    const isCellSelected = useSelector (state => state.target.cellIndex === cellId );
    const insertMode = useSelector(state => state.insertMode );
    const isCellHovered = isRowHovered && isColHovered;

    const getClassNames = () => {

        const classNames = ['text-grid-cell'];

        if( isCellHovered ) classNames.push( 'cell-hover' );
        if( isRowHovered )  classNames.push('row-hover');
        if( isColHovered ) classNames.push('col-hover');
        if( isCellSelected && insertMode ) classNames.push('active-insert')
        if( isCellSelected && !insertMode ) classNames.push('active-override')

        return classNames.join(' ');
    }

    return(<span className={getClassNames()}  style={{width: cellWidth, maxWidth: cellWidth, minWidth: cellWidth}} >
        {cell}
    </span>);
}

/**
 * This component renders the text selection area
 */
function TextGridRangeSelection() {

    const selection = useSelector(state => state.selection );
    const cellWidth = useSelector(state => state.cellWidth);
    const cellHeight = useSelector(state => state.cellHeight);
    const viewport = useSelector(state => state.viewport);

    // with the viewport in place, we need to calculate the relative position of the selction box
    const sci = selection.startColIndex - viewport.xOffset;
    const eci = selection.endColIndex - viewport.xOffset;
    const sri = selection.startRowIndex - viewport.yOffset;
    const eri = selection.endRowIndex - viewport.yOffset;

    // calculate the size and position of the selection box
    // position is relative to the top left of the TextGrid component
    const width = ((eci - sci) * (cellWidth-1));
    const height = (eri- sri + 1) * (cellHeight-1) + ((eri - sri) < 0 ? -(cellHeight-1) : 0);
    const left = (sci * (cellWidth-1)) + Math.min(width, 0);
    const top = (sri * (cellHeight-1)) + Math.min(height, 0);
    const style={ width: Math.abs(width), height: Math.abs(height), left, top };

    // render the selection grid.
    return(<div className='text-grid-selection' style={style}></div>);
}


/**
 * 
 */
export function TextGridStatusBar() {
    const viewport = useSelector(state => state.viewport );
    const target = useSelector(state => state.target);
    const cells = useSelector(state => state.cells);

    return(<div className="text-grid-status-bar">
        <ul>
            <li>R: {viewport.rows}</li>
            <li>C: {viewport.cols}</li>
            <li>SX: {viewport.xOffset}</li>
            <li>SY: {viewport.yOffset}</li>
            <li>TX: {target.colIndex}{}</li>
            <li>TY: {target.rowIndex}{}</li>
            <li>NumRows: {cells.length}</li>
            <li>NumCols: {!!cells[target.rowIndex] ? cells[target.rowIndex].length : ''}</li>
        </ul>
    </div>);
}

/**
 * This is the terminal window
 * i got a bit lazy with this component and have not used the redux sotre
 * TODO: refactor
 */
export function TextGridConsole() {

    const [readOnlyPos, setReadOnlyPos] = useState(1);
    let [consoleText, setConsoleText] = useState();

    useEffect(() => {
        clearConsole();
        onEnter();
    }, []);

    const commands = {
        clear: (args) => { clearConsole(); },
        echo: (args) => { printLine(args.join(' ')); }
    }

    const submitLine = (line) => {
        const lineItems = line.split(' ');

        if(lineItems.length === 0)
            return;

        const [cmd, ...args] = lineItems;

        if(commands[cmd] !== undefined){
            commands[cmd](args);
        }
    }

    const printLine = (value) => {
        setConsoleText(consoleText + '\n ' + value); consoleText += '\n' + value; // HACK
    }

    const clearConsole = () => {
        setConsoleText(''); consoleText = ''; // HACK
    }

    const onEnter = () => {
        submitLine(consoleText.substr(readOnlyPos));
        setConsoleText(consoleText + '\n> '); consoleText += '\n> '; // HACK
        setReadOnlyPos(consoleText.length);
    };

    const handleKeyDown = (event) => {

        if (event.key.length === 1) {
            // allow printable characters
        }
        else if(event.key === 'Enter') {
            onEnter();
            event.preventDefault();
        }
        else if(event.key === 'Backspace') {
            if(event.target.selectionStart <= readOnlyPos)
                event.preventDefault();
        }
        else if(event.key === 'Delete') {
            if(event.target.selectionStart < readOnlyPos)
                event.preventDefault();
        }
    }

    const handleSelect = (event) => {
        // console.log('START: ' + event.target.selectionStart + '    READONLY: ' + readOnlyPos );
        if(event.target.selectionStart === readOnlyPos-1){
            event.target.setSelectionRange(readOnlyPos, readOnlyPos);
        }
        else if(event.target.selectionStart < readOnlyPos-1){
            event.target.setSelectionRange(event.target.value.length, event.target.value.length);
        }
    }

    const handleChange = (event) => {
        setConsoleText(event.target.value);
    }

    return(<div className="text-grid-console" style={{height: 200, display: 'flex'}}>
        <textarea wrap="off" spellCheck="false" value={consoleText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}>
        </textarea>
    </div>);
}

export  default TextGrid;