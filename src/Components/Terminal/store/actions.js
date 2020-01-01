
export const actions = {
    beginUserInput: () => ({ type: 'BEGIN_USER_INPIT' }),
    endUserInput: () => ({ type: 'END_USER_INPUT' }),
    setConsoleText: (text) => ({ type: 'SET_CONSOLE_TEXT', payload: text }),
    appendProgramInput: (text) => ({ type: 'APPEND_PROGRAM_INPUT', payload: text }),
    clear: () => ({ type: 'CLEAR_TERMINAL' }),
    setState: (state) => ({ type: 'SET_STATE', payload: state })
};