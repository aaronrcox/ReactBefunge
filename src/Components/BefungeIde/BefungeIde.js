
import React, {useRef, forwardRef} from 'react';
import { TextGrid, TextGridStatusBar, actions} from '../TextGrid';
import { Terminal } from '../Terminal';
import { Toolbar } from '../Toolbar';
import BefungeInterpreter from './BefungeInterpreter';
import { store as textGridStore } from '../../store';

let befungeInterpreter = null;
let runIntervilleTimer = null;

const BefungeIde = forwardRef((props, ref) => {

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

    const initProgram = () => {
        const cells = textGridRef.current.getCells();
        befungeInterpreter = new BefungeInterpreter(cells);
        befungeInterpreter.onInstructionExecuted((li, ni) => {
            //console.log(`L-${li.x}-${li.y}-${li.i} \t\t N-${ni.x}-${ni.y}-${ni.i}`);
            textGridStore.dispatch(actions.setTargetCell( ni.y, ni.x ));
            textGridStore.dispatch(actions.setTypeingDir( ni.dirX, ni.dirY ));
        });
        befungeInterpreter.onConsoleOut(text => {
            console.log(text);
        });
        befungeInterpreter.onProgramTerminate(() => {
            clearInterval(runIntervilleTimer);
        });


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
        'run': (args) => { runProgram() },
        'next': (args) => { stepProgram(); },
        'stack': (args) => { console.log( befungeInterpreter.stack); }
    };

//     const prog = 
// `v
// >123456789v
// ^         <
// `;

const prog = 
`>              v
v  ,,,,,"Hello"<
>48*,          v
v,,,,,,"World!"<
>25*,@`;

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

    const toolbar = [
        { text: 'Run', classNames: 'button', onClick: () => { runProgram() } },
        { text: '   ', classNames: '', onClick: () => { }},
        { text: 'Debug', classNames: 'button', onClick: () => { debugProgram() } },
        { text: 'Step', classNames: 'button', onClick: () => { stepProgram() } }
    ];
    
    return(
    <div style={{display: 'flex', flexDirection: 'row',  height: '100%'}}>
        
        <div className="text-grid-container" style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100%'}}>
            <Toolbar items={toolbar}></Toolbar>
            <TextGrid ref={textGridRef} config={config} ></TextGrid>
            <Terminal commands={terminalCommands}></Terminal>
            <TextGridStatusBar></TextGridStatusBar>
        </div>
    </div>);
});

export default BefungeIde;