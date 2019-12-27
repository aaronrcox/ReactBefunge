export default class BefungeInterpreter {
    
    constructor(program) {
        
        this.program = program;
        this.numRows = this.program.length;
        this.numCols = Math.max( this.program.map(r => r.length) );
        this.stack = [];

        this.onInstructionExecutedCb = null;
        this.onConsoleOutCb = null;
        this.onProgramTerminateCb = null;

        this.currentInstruction = null;
        this.nextInstruction = { x: 0, y: 0, i: program[0][0], ...this.getInstructionDir(1, 0, program[0][0]) };
        this.stringMode = false;
    }

    step() {
        
        this.currentInstruction = this.nextInstruction;
        let ci = this.currentInstruction;


        if(ci === null)
            return;

        if(this.stringMode) {
            if( ci.i === '"') {
                this.stringMode = false;
            }
            else {
                this.stack.push(ci.i.charCodeAt(0));
            }
        }
        else if( ci.i.includes(['>', '<', 'v', '^', '?']) ) {
            // direction modifiers already calculated
        }
        else if( ci.i >= '0' && ci.i <= '9') {
            // push the number onto the stack
            this.stack.push(parseInt(ci.i));
        }
        else if( ci.i === '+') {
            // Addition: Pop a and b, then push a+b
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(a + b);
        }
        else if( ci.i === '-') {
            // Subtraction: Pop a and b, then push b-a
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(b - a);
        }
        else if( ci.i === '*') {
            // Multiplication: Pop a and b, then push a*b
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(a * b);
        }
        else if( ci.i === '/') {
            // Integer division: Pop a and b, then push b/a, rounded towards 0.
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(b / a);
        }
        else if( ci.i === '%') {
            // Modulo: Pop a and b, then push the remainder of the integer division of b/a.
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(b % a);
        }
        else if( ci.i === '!') {
            // Logical NOT: Pop a value. If the value is zero, push 1; otherwise, push zero.
            const a = this.stack.pop();
            this.stack.push(a === 0 ? 1 : 0);
        }
        else if( ci.i === '`') {
            // yes, its the grave character!
            // Greater than: Pop a and b, then push 1 if b>a, otherwise zero.
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(b > a ? 1 : 0);
        }
        else if( ci.i === '_') {
            // Pop a value; move right if value=0, left otherwise
            this.stack.pop(); 
            // the direction was already calculated when we fetched this instruction, so we just need to pop off the value
            // ci.dirY = 0;
            // ci.dirX = a === 0 ? 1 : -1;
        }
        else if( ci.i === '|') {
            // Pop a value; move down if value=0, up otherwise
            this.stack.pop(); 
            // the direction was already calculated when we fetched this instruction, so we just need to pop off the value
            // ci.dirY = 0;
            // ci.dirX = a === 0 ? 1 : -1;
        }
        else if(ci.i === '"') {
            // Start string mode: push each character's ASCII value all the way up to the next " quote character
            this.stringMode = !this.stringMode;
        }
        else if( ci.i === ':') {
            // Duplicate value on top of the stack
            this.stack.push( this.stack[this.stack.length -1]);
        }
        else if( ci.i === '\\') {
            // Swap two values on top of the stack
            const a = this.stack.pop();
            const b = this.stack.pop();
            this.stack.push(a);
            this.stack.push(b);
        }
        else if( ci.i === '$') {
            // Pop value from the stack and discard it
            this.stack.pop();
        }
        else if( ci.i === '.' ) {
            // Pop value and output as an integer followed by a space
            const a = this.stack.pop();
            this.onConsoleOutCb( a );
        }
        else if( ci.i === ',' ) {
            // Pop value and output as ASCII character
            const a = this.stack.pop();
            this.onConsoleOutCb( String.fromCharCode(a) );
        }
        else if( ci.i === '#' ) {
            // Bridge: Skip next cell
            ci.dirX *= 2;
            ci.dirY *= 2
        }
        else if( ci.i === 'p' ) {
            // A "put" call (a way to store a value for later use). Pop y, x, and v, then change the character at (x,y) in the program to the character with ASCII value v
            const y = this.stack.pop();
            const x = this.stack.pop();
            const v = this.stack.pop();
            const newInstruction = String.fromCharCode(v);
            this.program[y][x] = newInstruction;
            // TODO: update the editor text
        }

        else if( ci.i === 'g') {
            // A "get" call (a way to retrieve data in storage). Pop y and x, then push ASCII value of the character at that position in the program
            const y = this.stack.pop();
            const x = this.stack.pop();
            const val = this.program[y][x]; // TODO: grow program size
            this.stack.push(val);
        }
        else if( ci.i === '&' ) {
            // Ask user for a number and push it
            // TODO: ask the user for a number
        }
        else if( ci.i === '~' ) {
            // Ask user for a character and push its ASCII value
            // TODO: ask the user for a number
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

    getNextInstruction() {
        const ci = this.currentInstruction;
        const nx = ci.x + ci.dirX;
        const ny = ci.y + ci.dirY;

        if( nx < 0 || nx >= this.numCols || ny < 0 || ny >= this.numRows )
            return null;
        
        const instruction = (nx < this.program[ny].length) ? this.program[ny][nx] : '';
        const instructionDir = this.getInstructionDir(ci.dirX, ci.dirY, instruction);
        
        return {x: nx, y: ny, i: instruction, ...instructionDir };
    }

    getInstructionDir(cDirX, cDirY, instruction) {
        let dirX = cDirX;
        let dirY = cDirY;
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
                const a = this.stack[this.stack.length - 1];
                dirY = 0;
                dirX = a === 0 ? 1 : -1;
                break;
            }
            case '|': {
                const a = this.stack[this.stack.length - 1];
                dirY = a === 0 ? 1 : -1;
                dirX = 0;
                break;
            }
            default: break;
        }

        return {dirX, dirY};
    }

    onInstructionExecuted(callback) {
        this.onInstructionExecutedCb = callback;
    }
    onConsoleOut(callback) {
        this.onConsoleOutCb = callback;
    }
    onProgramTerminate(callback) {
        this.onProgramTerminateCb = callback;
    }
}
