
import React, {useRef, forwardRef, useState} from 'react';
import { TextGrid, TextGridStatusBar, actions} from '../TextGrid';
import { Terminal } from '../Terminal';
import { Toolbar } from '../Toolbar';
import BefungeInterpreter from './BefungeInterpreter';
import { store as textGridStore } from '../../store';


let runIntervilleTimer = null;

const BefungeIde = forwardRef((props, ref) => {

    let [befungeInterpreter, setBefungeInterpreter] = useState(null);
    let [befungeStackStr, setBefungeStackStr] = useState([]);

    const handleKeyPress = (store, key) => {
        if( key === 'v') return { preventDefault: false, actions: [actions.setTypeingDir( 0, 1)] };
        if( key === '>') return { preventDefault: false, actions: [actions.setTypeingDir( 1, 0)] };
        if( key === '<') return { preventDefault: false, actions: [actions.setTypeingDir(-1, 0)] };
        if( key === '^') return { preventDefault: false, actions: [actions.setTypeingDir( 0,-1)] };
        return { };
    }

    const setCursorPos = (rowIndex, colIndex) => {
        textGridStore.dispatch(actions.setTargetCell(rowIndex, colIndex));
    };

    const setCursorDir = (xDir, yDir) => {
        textGridStore.dispatch(actions.setTypeingDir(xDir, yDir));
    }

    const initProgram = () => {
        const cells = textGridRef.current.getCells();
        const interpreter = new BefungeInterpreter(cells);
        
        interpreter.onInstructionExecuted((li, ni) => {
            if(ni !== null ) {
                textGridStore.dispatch(actions.setTargetCell( ni.y, ni.x ));
                textGridStore.dispatch(actions.setTypeingDir( ni.dirX, ni.dirY ));
            }
        });
        interpreter.onStackChange(() => {
            setBefungeStackStr(JSON.stringify(befungeInterpreter.stack, 4));
        })
        interpreter.onConsoleOut(text => {
            terminalRef.current.print(text);
        });
        interpreter.onProgramTerminate(() => {
            clearInterval(runIntervilleTimer);
            setBefungeInterpreter(null);
        });

        befungeInterpreter = interpreter; // hack
        setBefungeInterpreter(interpreter);


        textGridStore.dispatch(actions.setTargetCell( 0, 0 ));
        textGridStore.dispatch(actions.setTypeingDir( 1, 0 ));
    }

    const debugProgram = () => {
        initProgram();
    };

    
    const runProgram = () => {
        initProgram();
        runIntervilleTimer = setInterval(() => {
            stepProgram();
        }, 50);
    };

    const stepProgram = () => {
        befungeInterpreter.step();
    };

    const terminalCommands = {
        'set-cursor-pos': (args) => { setCursorPos(parseInt(args[0]), parseInt(args[1])); },
        'set-cursor-dir': (args) => { setCursorDir(parseInt(args[0]), parseInt(args[1])); },
        'run': (args) => { runProgram() },
        'next': (args) => { stepProgram(); },
        'stack': (args) => { console.log( befungeInterpreter.stack); }
    };

    const terminalOnEnter = (input) => {
        if(befungeInterpreter && befungeInterpreter.waitingForInput)
            befungeInterpreter.input(input);
    }

// const prog = 
// `>              v
// v  ,,,,,"Hello"<
// >48*,          v
// v,,,,,,"World!"<
// >25*,@`;

// const prog = 
// `64+"!dlroW ,olleH">:#,_@`;

const prog = 
`~:1+!#@_,`;

    const config = {
        cellWidth: 32,
        cellHeight: 32,
        text: prog,
        events: {
            onKeyDown: handleKeyPress
        },
        terminalCommands
    }

    const textGridRef = useRef();
    const terminalRef = useRef();

    const toolbar = [
        { text: 'Run', classNames: 'button', onClick: () => { runProgram() } },
        { text: 'Stop', classNames: 'button', onClick: () => { setBefungeInterpreter(null); } },
        { text: '   ', classNames: '', onClick: () => { }},
        { text: 'Debug', classNames: 'button', onClick: () => { debugProgram() } },
        { text: 'Step', classNames: 'button', onClick: () => { stepProgram() } }
    ];
    
    return(
    <div style={{display: 'flex', flexDirection: 'row',  height: '100%'}}>
        <div style={{ display: 'flex', felxDirection: 'column', flex: 1, maxWidth: 300, backgroundColor: 'black', color: 'white'}}>
            { befungeStackStr }
        </div>
        <div className="text-grid-container" style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100%'}}>
            <Toolbar items={toolbar}></Toolbar>
            <TextGrid ref={textGridRef} config={config} ></TextGrid>
            <Terminal ref={terminalRef} commands={terminalCommands} onEnter={terminalOnEnter}></Terminal>
            <TextGridStatusBar></TextGridStatusBar>
        </div>
        
    </div>);
});

export default BefungeIde;