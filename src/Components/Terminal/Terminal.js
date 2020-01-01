import './Terminal.scss';
import React, {useReducer, useCallback, forwardRef, useImperativeHandle} from 'react';
import { actions, reducer, initialState } from './store';


/**
 * This is a basic terminal window component
 */
export const Terminal = forwardRef((props, ref) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const commands = {
        clear: (args) => { 
            dispatch(actions.clear());
        },
        echo: (args) => { 
            dispatch(actions.appendProgramInput(args.join(' ') + '\n'));
        },
        ...props.commands
    };

    const submitLine = useCallback((line) => {
        
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

        dispatch(actions.endUserInput());
        dispatch(actions.beginUserInput());

    }, [props, commands]);
    

    const handleKeyDown = (event) => {

        if (event.key.length === 1) {
            // allow printable characters
        }
        else if(event.key === 'Enter') {
            const userInput = state.consoleText.substr(state.readOnlyPos);
            submitLine(userInput);
            event.preventDefault();
        }
        else if(event.key === 'Backspace') {
            if(event.target.selectionStart <= state.readOnlyPos)
                event.preventDefault();
        }
        else if(event.key === 'Delete') {
            if(event.target.selectionStart < state.readOnlyPos)
                event.preventDefault();
        }
    }

    const handleSelect = (event) => {
        if(event.target.selectionStart === state.readOnlyPos-1){
            event.target.setSelectionRange(state.readOnlyPos, state.readOnlyPos);
        }
        else if(event.target.selectionStart < state.readOnlyPos-1){
            event.target.setSelectionRange(event.target.value.length, event.target.value.length);
        }
    }

    const handleChange = (event) => {
        dispatch(actions.setConsoleText(event.target.value));
    }

    useImperativeHandle(ref, () => ({
        print: (text) => {
            dispatch(actions.appendProgramInput(text));
        },
        submitInput: () => {
            const userInput = state.consoleText.substr(state.readOnlyPos);
            submitLine(userInput);
        }
    }), [state.consoleText, state.readOnlyPos, submitLine] );


    return(<div className="terminal" style={{maxHeight: 200, height: 200, display: 'flex'}}>
        
        <textarea wrap="off" spellCheck="false" value={state.consoleText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}>
        </textarea>
    </div>);
});