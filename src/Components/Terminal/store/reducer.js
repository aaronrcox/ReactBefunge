export const initialState = {
    readOnlyPos: 2,
    consoleText: '> '
};

export const reducer = (state, action) => {
    switch(action.type) {
        case 'BEGIN_USER_INPIT': {
            const consoleText = state.consoleText += '> ';
            const readOnlyPos = consoleText.length;
            return {...state, consoleText, readOnlyPos };
        }
        case 'SET_CONSOLE_TEXT': {
            const consoleText = action.payload;
            return {...state, consoleText };
        }
        case 'END_USER_INPUT': {
            const readOnlyPos = state.consoleText.length;
            const consoleText = state.consoleText.length > 0 ? state.consoleText += '\n' : '';
            return {...state, readOnlyPos, consoleText };
        }
        case 'APPEND_PROGRAM_INPUT': {
            const consoleText = state.consoleText + action.payload;
            const readOnlyPos = consoleText.length;
            return {...state, consoleText, readOnlyPos };
        }
        case 'CLEAR_TERMINAL': {
            const consoleText = '';
            const readOnlyPos = 0;
            return {...state, consoleText, readOnlyPos };
        }
        case 'SET_STATE': {
            return {...state, ...action.payload };
        }
        default: {
            console.warn('UNHANDELED ACTION');
            return state;
        }
    }
};