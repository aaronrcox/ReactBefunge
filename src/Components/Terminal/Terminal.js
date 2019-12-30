import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import './Terminal.scss';
import { none } from '../TextGrid/store/actions';

/**
 * This is the terminal window
 * i got a bit lazy with this component and have not used the redux sotre
 * TODO: refactor
 */
export const Terminal = forwardRef((props, ref) => {

    let [readOnlyPos, setReadOnlyPos] = useState(1);
    let [consoleText, setConsoleText] = useState('');

    useImperativeHandle(ref, () => ({
        print: (text) => {
            const newText = consoleText + text;
            setConsoleText(newText);
            setReadOnlyPos((consoleText + text).length);
        }
    }), [consoleText]);

    const commands = {
        clear: (args) => { clearConsole(); },
        echo: (args) => { printLine(args.join(' ')); },
        ...props.commands
    };

    const submitLine = (line) => {
        
        // the onEnter method should return true to prevent default behaviour
        if( props.onEnter && props.onEnter(line) ) {
            return;
        }
        
        const lineItems = line.split(' ');

        if(lineItems.length === 0)
            return;

        const [cmd, ...args] = lineItems;

        if(commands[cmd] !== undefined){
            commands[cmd](args);
        }

        return false;
    }

    const printLine = (value) => {
        setConsoleText(consoleText + '\n ' + value); consoleText += '\n' + value; // HACK
    }


    let wasCleared = false;
    const clearConsole = () => {
        setConsoleText('> '); consoleText = '> ';
        setReadOnlyPos(2); readOnlyPos = 2;
        wasCleared = true;
    }

    const onEnter = () => {
        // submitLine should return true to prevent default behaviour
        submitLine(consoleText.substr(readOnlyPos));
        if( wasCleared === false ) {
            setConsoleText(consoleText + '\n> '); consoleText += '\n> '; // HACK
            setReadOnlyPos(consoleText.length);
        }
        wasCleared = false;
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

    useEffect(() => {
        setConsoleText('> ');
        setReadOnlyPos(2);
    }, []);

    return(<div className="terminal" style={{maxHeight: 200, height: 200, display: 'flex', border: props.disabled ? '10px solid red' : none}}>
        
        <textarea wrap="off" spellCheck="false" value={consoleText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}>
        </textarea>
    </div>);
});