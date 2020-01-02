import './Terminal.scss';
import React, {useReducer, useCallback, forwardRef, useImperativeHandle} from 'react';
import { actions, reducer, initialState } from './store';


/**
 * This is a basic terminal window component
 */
export const Terminal = forwardRef((props, ref) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    // collection of commands to run when the user types stuff into the terminal.
    // the command are extended by props.commands.
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
    

    // handle key press within the text area
    // for characters like backspace and delete, additional checks need to be made to 
    // to ensure we dont delete anything within the readonly area.
    // NOTE: there may be more cases to handle, but this works for us for now.
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

    // the event is fired when the cursor position changes in the text area
    // if we select an area within the readOnlyPos, than we re-position the cursor
    // allowing us to simulate a kind of terminal experience.
    // text entered into the terminal after the readOnlyPos is considered user input
    // and can be freely edited.
    const handleSelect = (event) => {
        if(event.target.selectionStart === state.readOnlyPos-1){
            event.target.setSelectionRange(state.readOnlyPos, state.readOnlyPos);
        }
        else if(event.target.selectionStart < state.readOnlyPos-1){
            event.target.setSelectionRange(event.target.value.length, event.target.value.length);
        }
    }

    // change event for the text area, when the input changes, we need to update the state.
    const handleChange = (event) => {
        dispatch(actions.setConsoleText(event.target.value));
    }

    // This allows us to provide an api via ref to our parent component
    // the below methods can be called by the parent
    useImperativeHandle(ref, () => ({
        print: (text) => {
            dispatch(actions.appendProgramInput(text));
        },
        submitInput: () => {
            const userInput = state.consoleText.substr(state.readOnlyPos);
            submitLine(userInput);
        }
    }), [state.consoleText, state.readOnlyPos, submitLine] );


    return(<div className="terminal">
        
        <textarea wrap="off" spellCheck="false" value={state.consoleText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}>
        </textarea>
    </div>);
});