import { BehaviorSubject } from 'rxjs';

export default class BefungeInterpreter {
    
    constructor(program) {
        
        this.program = program;
        this.numRows = 25;
        this.numCols = 80;
        
        this.stack = [];
        this.stack$ = new BehaviorSubject([]);

        this.onInstructionExecutedCb = null;
        this.onConsoleOutCb = null;
        this.onProgramTerminateCb = null;
        this.onRequestConsoleInputCb = null;
        
        this.currentInstruction = null;
        this.nextInstruction = { x: 0, y: 0, i: program[0][0], ...this.getInstructionDir(1, 0, program[0][0]) };
        this.stringMode = false;

        this.waitingForInput = false;

        this.inputStack = [];
        this.skipCount = 0;
    }

    destroy() {
        
    }

    instructionInfo = {
        '0-9': 'Push this number on the stack',
        '+': 'Addition: Pop a and b, then push a+b',
        '-':'Subtraction: Pop a and b, then push b-a',
        '*': 'Multiplication: Pop a and b, then push a*b',
        '/': 'Integer division: Pop a and b, then push b/a, rounded towards 0',
        '%': 'Modulo: Pop a and b, then push the remainder of the integer division of b/a',
        '!': 'Logical NOT: Pop a value. If the value is zero, push 1; otherwise, push zero',
        '`': 'Greater than: Pop a and b, then push 1 if b>a, otherwise zero',
        '>': 'Start moving right',
        '<': 'Start moving left',
        '^': 'Start moving up',
        'v': 'Start moving down',
        '?': 'Start moving in a random cardinal direction',
        '_': 'Pop a value; move right if value=0, left otherwise',
        '|': 'Pop a value; move down if value=0, up otherwise',
        '"': 'Start string mode: push each character\'s ASCII value all the way up to the next"',
        ':': 'Duplicate value on top of the stack',
        '\\': 'Swap two values on top of the stack',
        '$': 'Pop value from the stack and discard it',
        '.': 'Pop value and output as an integer followed by a space',
        ',': 'Pop value and output as ASCII character',
        '#': 'Bridge: Skip next cell',
        'p': 'A "put" call (a way to store a value for later use). Pop y, x, and v, then change the character at (x,y) in the program to the character with ASCII value v',
        'g': 'A "get" call (a way to retrieve data in storage). Pop y and x, then push ASCII value of the character at that position in the program',
        '&': 'Ask user for a number and push it',
        '~': 'Ask user for a character and push its ASCII value',
        '@': 'End program',
        "StringMode": 'all characters are pushed onto the stack'
    }

    step() {

        if(this.waitingForInput)
            return;
        
        this.currentInstruction = this.nextInstruction;
        let ci = this.currentInstruction;


        if(ci === null)
            return;

        if(this.stringMode) {
            if( ci.i === '"') {
                this.stringMode = false;
            }
            else {
                let c = ci.i;
                if( c === '' ) c = ' ';
                this.pushStack(c.charCodeAt(0));
            }
        }
        else if( ci.i.includes(['>', '<', 'v', '^', '?']) ) {
            // direction modifiers already calculated
        }
        else if( ci.i >= '0' && ci.i <= '9') {
            // push the number onto the stack
            this.pushStack(parseInt(ci.i));
        }
        else if( ci.i === '+') {
            // Addition: Pop a and b, then push a+b
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(a + b);
        }
        else if( ci.i === '-') {
            // Subtraction: Pop a and b, then push b-a
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(b - a);
        }
        else if( ci.i === '*') {
            // Multiplication: Pop a and b, then push a*b
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(a * b);
        }
        else if( ci.i === '/') {
            // Integer division: Pop a and b, then push b/a, rounded towards 0.
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(b / a);
        }
        else if( ci.i === '%') {
            // Modulo: Pop a and b, then push the remainder of the integer division of b/a.
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(b % a);
        }
        else if( ci.i === '!') {
            // Logical NOT: Pop a value. If the value is zero, push 1; otherwise, push zero.
            const a = this.popStack();
            this.pushStack(a === 0 ? 1 : 0);
        }
        else if( ci.i === '`') {
            // yes, its the grave character!
            // Greater than: Pop a and b, then push 1 if b>a, otherwise zero.
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(b > a ? 1 : 0);
        }
        else if( ci.i === '_') {
            // Pop a value; move right if value=0, left otherwise
            // the direction was already calculated when we fetched this instruction, so we just need to pop off the value
            this.popStack(); 
        }
        else if( ci.i === '|') {
            // Pop a value; move down if value=0, up otherwise
            // the direction was already calculated when we fetched this instruction, so we just need to pop off the value
            this.popStack(); 
        }
        else if(ci.i === '"') {
            // Start string mode: push each character's ASCII value all the way up to the next " quote character
            this.stringMode = !this.stringMode;
        }
        else if( ci.i === ':') {
            // Duplicate value on top of the stack
            if(this.stack.length > 0)
                this.pushStack( this.stack[this.stack.length -1]);
        }
        else if( ci.i === '\\') {
            // Swap two values on top of the stack
            const a = this.popStack();
            const b = this.popStack();
            this.pushStack(a);
            this.pushStack(b);
        }
        else if( ci.i === '$') {
            // Pop value from the stack and discard it
            this.popStack();
        }
        else if( ci.i === '.' ) {
            // Pop value and output as an integer followed by a space
            const a = this.popStack();
            this.onConsoleOutCb( a );
        }
        else if( ci.i === ',' ) {
            // Pop value and output as ASCII character
            const a = this.popStack();
            this.onConsoleOutCb( String.fromCharCode(a) );
        }
        else if( ci.i === '#' ) {
            // Bridge: Skip next cell
            // ci.dirX *= 2;
            // ci.dirY *= 2
            this.skipCount += 1;
        }
        else if( ci.i === 'p' ) {
            // A "put" call (a way to store a value for later use). Pop y, x, and v, then change the character at (x,y) in the program to the character with ASCII value v
            const y = this.popStack();
            const x = this.popStack();
            const v = this.popStack();
            const newInstruction = String.fromCharCode(v);
            this.program[y][x] = newInstruction;
            // TODO: update the editor text
        }

        else if( ci.i === 'g') {
            // A "get" call (a way to retrieve data in storage). Pop y and x, then push ASCII value of the character at that position in the program
            const y = this.popStack();
            const x = this.popStack();

            if( x >= 0 && x < this.numCols && y >= 0 && y < this.numRows ) {
                const val = this.program[y][x]; 
                this.pushStack(val);
            }
            else {
                this.pushStack(0);
            }
        }
        else if( ci.i === '&' ) {
            // Ask user for a number and push it
            // TODO: ask the user for a number
            if(this.inputStack.length === 0) {
                this.waitingForInput = true;
                if( this.onRequestConsoleInputCb ) {
                    this.onRequestConsoleInputCb();
                }
                return;
            }
            else {
                const val = this.inputStack.shift();
                this.pushStack(parseInt(val));
            }
        }
        else if( ci.i === '~' ) {
            // Ask user for a character and push its ASCII value
            if(this.inputStack.length === 0) {
                this.waitingForInput = true;
                if( this.onRequestConsoleInputCb ) {
                    this.onRequestConsoleInputCb();
                }
                return;
            }
            else {
                const val = this.inputStack.shift();
                this.pushStack(val.charCodeAt(0));
            }
        }
        else if( ci.i === '@') {
            // End of program
            ci.dirX = 0;
            ci.dirY = 0;

            if(this.onProgramTerminateCb){
                this.onProgramTerminateCb();
            }
        }

        const ni = this.getNextInstruction();
        this.nextInstruction = ni;

        
        if( this.onInstructionExecutedCb )
            this.onInstructionExecutedCb(ci, ni);
    }

    pushStack(val) {
        this.stack.push(val);
        this.stack$.next(this.stack);
    }
    popStack() {
        const val = this.stack.length > 0 ? this.stack.pop() : 0;
        this.stack$.next(this.stack);
        return val;
    }

    getNextInstruction() {
        const ci = this.currentInstruction;
        let nx = ci.x;
        let ny = ci.y;
        do {
            this.skipCount -= 1;

            nx = nx + ci.dirX;
            ny = ny + ci.dirY;

            // wrap the instructions
            if( ny < 0 ) ny = this.numRows - 1;
            if( nx < 0 ) nx = this.numCols - 1;
            if( ny >= this.numRows ) ny = 0;
            if( nx >= this.numCols ) nx = 0;
            
            
        }while(this.skipCount >= 0)
        this.skipCount = 0;
            
    
        const instruction = (nx < this.program[ny].length) ? this.program[ny][nx] : '';
        const instructionDir = this.getInstructionDir(ci.dirX, ci.dirY, instruction);
        
        return {x: nx, y: ny, i: instruction, ...instructionDir };
    }

    getInstructionDir(cDirX, cDirY, instruction) {
        let dirX = cDirX;
        let dirY = cDirY;

        if(this.stringMode)
            return {dirX, dirY};

        switch(instruction) {
            case '>': { dirX = 1; dirY = 0; break; }
            case '<': { dirX =-1; dirY = 0; break; }
            case '^': { dirX = 0; dirY =-1; break; }
            case 'v': { dirX = 0; dirY = 1; break; }
            case '?': { 
                const dir = Math.floor(Math.random() * 4);
                if( dir === 0 ) { dirX = 1; dirY = 0 } // left
                if( dir === 1 ) { dirX = 0; dirY = 1 } // down
                if( dir === 2 ) { dirX =-1; dirY = 0 } // right
                if( dir === 3 ) { dirX = 0; dirY =-1 } // up
                break;
            }
            case '_': {
                const a = this.stack.length > 0 ? this.stack[this.stack.length - 1] : 0;
                dirY = 0;
                dirX = a === 0 ? 1 : -1;
                break;
            }
            case '|': {
                const a = this.stack.length > 0 ? this.stack[this.stack.length - 1] : 0;
                dirY = a === 0 ? 1 : -1;
                dirX = 0;
                break;
            }
            default: break;
        }

        return {dirX, dirY};
    }

    input(val) {
        this.inputStack.push(val);
        this.waitingForInput = false;
        
    }

    onInstructionExecuted(callback) {
        this.onInstructionExecutedCb = callback;
    }
    onConsoleOut(callback) {
        this.onConsoleOutCb = callback;
    }
    onRequestConsoleInput(callback) {
        this.onRequestConsoleInputCb = callback;
    }

    onProgramTerminate(callback) {
        this.onProgramTerminateCb = callback;
    }
}
