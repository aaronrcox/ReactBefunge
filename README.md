# React Befunge
This is a quick side projet to create a simple IDE for the befunge 93 esoteric programming language.

https://en.wikipedia.org/wiki/Befunge

## Demo
Live demo project is published to github pages:<br/>https://aaronrcox.github.io/ReactBefunge 

# Screenshot
![alt text](./public/screenshots/screenshot01.png "Befunge IDE")


## Features:
 - Custom grid based text editor
 - Emulated terminal/console
 - Run / Step through each instruction

## Tools / Libraries:
 - React
 - React-Redux
 - Redux-Observables

 # Running the project
 - clone the repo
 - run: `npm install`
 - run: `npm start`
 - view in browser http://localhost:3000/


# TODO:

## Features
 - Add Copy / Paste support to "TextGrid" component
 - Add asside panel with expandable content to allow for options, debugging info etc.
 - Replace window.prompt with custom input modal when executing befunge instruction
 - Add 'readonly' mode to terminal to allow for program output without human interferance

 ## Refactor
 - Migrate befungeIde state to redux - this should reduce some of the hacky code
 - Migrate befungeInterpreter state to redux - this should reduce some of the hacky code and reduce number of re-rendes
 - Move befunge asside to be between the toolbar and statusbar
 - Smooth scroll - currently scrolling adjusts display offcets per cell and feels a little clunky / laggy.
 - Styleing - use css variables that can be changed at runtime to allow for theming - alternativelly, refactor to different styleing solutions.
 

 ## Bugs
 - Each befunge instruction step causes everything to re-render
 - TextGrid selection with arrow keys, the cursor position is not set correctly compared to selection with mouse, which is correct.

# Other
 - provide alternative TextGrid component rendered with canvas instead of rows/cells, this should speed up rendering / display a lot

 