# React Befunge
This is a quick side projet to create a simple IDE for the befunge 93 esoteric programming language.

https://en.wikipedia.org/wiki/Befunge

 # Running the project
 - clone the repo
 - run: `npm install`
 - run: `npm start`
 - view in browser http://localhost:3000/

 ## deploy
run: `npm run deploy` <br/>
This will build a production version of the project that is pushed to the gh-pages branch

## Demo
Live demo project is published to github pages:<br/>https://aaronrcox.github.io/ReactBefunge 

# Screenshot
![alt text](./public/screenshots/screenshot01.png "Befunge IDE")



# TODO:
 - prevent selection from moving outside of of program bounds
 - prevent typeing out of program bounds
 - change cursor to drag icon when hovered over selection
 - implement click and drag for selection
 - show scrollbar for stack view
 - move scrollbars for textGrid to always view the target cell
