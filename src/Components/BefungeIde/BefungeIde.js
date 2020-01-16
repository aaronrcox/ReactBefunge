
import 'react-reflex/styles.css';
import React, {useRef, forwardRef, useState} from 'react';
import { TextGridStatusBar, actions, TextGridCanvas} from '../TextGrid';
import { Terminal } from '../Terminal';
import { Toolbar } from '../Toolbar';
import BefungeInterpreter from './BefungeInterpreter';
import { store as textGridStore } from '../../store';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import './BefungeIde.scss';
import { BefungeStackVivew } from './BefungeStackView';

let runIntervilleTimer = null;

const BefungeIde = forwardRef((props, ref) => {

    let [befungeInterpreter, setBefungeInterpreter] = useState(null);
    
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
        
        interpreter.onConsoleOut(text => {
            if(terminalRef.current)
                terminalRef.current.print(text);
        });
        interpreter.onProgramTerminate(() => {
            stopProgram();            
        });
        interpreter.onRequestConsoleInput(() => {
            const input = window.prompt("Enter a value", "");
            if(befungeInterpreter && befungeInterpreter.waitingForInput && input)
                befungeInterpreter.input(input);
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
        if(befungeInterpreter === null && runIntervilleTimer === null) {
            initProgram();
            runIntervilleTimer = setInterval(() => {
                
                    stepProgram();
            }, 1);
        }
    };

    const stopProgram = () => {
        clearInterval(runIntervilleTimer);
        runIntervilleTimer = null;
        setBefungeInterpreter(null);
        if(terminalRef.current) {
            terminalRef.current.print('\nProgram Terminated!\n');
            terminalRef.current.submitInput();
        }
    }

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

//     const prog = 
// `"v
//  a
//  a
//  a
//  @`;

// let prog = 
// `>              v
// v  ,,,,,"Hello"<
// >48*,          v
// v,,,,,,"World!"<
// >25*,@`;

const prog = `<v"]^_"abc%u$#d%t$#e%s$#f%r$#g%q$#h%ponmlkji"
3<_@#:,-*9`;

// const prog = 
// `64+"!dlroW ,olleH">:#,_@`;

// const prog = 
// `~:1+!#@_,`;

// const prog = 
// `64*>:00p258**44$$^>4$,1-:#v_v
// 4$#^; BEFUNGE97 ;^#_@#:-1$>#<
// 4*2-*26g00*:-*58:<vg3/*48+*:$
// #@@@ooo:::...  .    .     .  `;

// const prog = 
// `1-0g:"Z"-#v_$91+"sparw tup/teG">:#,_$               v                          Z
//           >:" "-#v_$91+"ecaps snruter teg BOO">:#,_$v
// v                >0" snruter teg BOO">:#,_$.91+,    >
// >8:+:*11p11g#v_91+"tib 8 dengis"01-11p11g!#v_"nu">" era slleC">:#,_v
// vv           >91+"tib 8>"                  >     ^                 >91+"krow " #
//  >        >"spmuj egdE">:#,_   91+"krow "04-3%1+#v_        >"sredniamer evitag"v
// >"ton od "^                                      >"ton od "^
// "eN">:#,_  91+"skrow edomgnirts ni @">:#,_@                                    >`;

//const prog = `>  #12#  <`;

    const config = {
        cellWidth: 20,
        cellHeight: 20,
        text: prog,
        events: {
            onKeyDown: handleKeyPress
        },
        terminalCommands
    }

    const textGridRef = useRef();
    const terminalRef = useRef();

    const toolbar = [];
    if( befungeInterpreter === null ) {
        toolbar.push({ text: 'Run', classNames: 'button', onClick: () => runProgram() });
        toolbar.push({ text: 'Debug', classNames: 'button', onClick: () => debugProgram() },);
    }
    else {
        toolbar.push({ text: 'Stop', classNames: 'button', onClick: () => stopProgram() });
        toolbar.push({ text: 'Step', classNames: 'button', onClick: () => stepProgram() });
    }

    return(
    <div className="befungeIde">
        <ReflexContainer orientation="horizontal">
            {/* TOP MENU BAR */}
            <ReflexElement style={{overflow:'hidden'}} minSize={24} maxSize={24}>
                <Toolbar items={toolbar}></Toolbar>
            </ReflexElement>

            {/* MAIN AREA */}
            <ReflexElement>
                <ReflexContainer orientation="vertical">
                    <ReflexElement flex="1">
                        <ReflexContainer orientation="horizontal">
                            <ReflexElement propagateDimensions={true} style={{overflow:'hidden'}}>
                                <TextGridCanvas ref={textGridRef} config={config}></TextGridCanvas>
                            </ReflexElement>
                            <ReflexSplitter />
                            <ReflexElement minSize="200" maxSize="400" style={{overflow:'hidden'}}>
                                <Terminal ref={terminalRef} commands={terminalCommands} onEnter={terminalOnEnter}></Terminal>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement style={{overflow:'hidden'}} minSize="200" maxSize="400">
                    <div className="asside">
                        <div className="asside-header">Debug Stack</div>
                        <div className="asside-section" style={{maxHeight: 200}}>
                            <BefungeStackVivew program={befungeInterpreter}></BefungeStackVivew>            
                        </div>
                    </div>
                    </ReflexElement>
                </ReflexContainer>
            </ReflexElement>

            {/* STATUS BAR */}
            <ReflexElement style={{overflow:'hidden'}} minSize={24} maxSize={24}>
                <TextGridStatusBar></TextGridStatusBar>
            </ReflexElement>

        </ReflexContainer>
    </div>);
});

export default BefungeIde;