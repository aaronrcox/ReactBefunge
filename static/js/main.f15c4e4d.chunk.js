(this.webpackJsonpReactBefunge=this.webpackJsonpReactBefunge||[]).push([[0],{60:function(e,t,n){e.exports=n(78)},65:function(e,t,n){},70:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"NO_OP",(function(){return h})),n.d(r,"SET_TEXT",(function(){return f})),n.d(r,"SET_VIEWPORT",(function(){return p})),n.d(r,"SET_CELL_SIZE",(function(){return x})),n.d(r,"MOUSE_MOVED",(function(){return v})),n.d(r,"MOUSE_DOWN",(function(){return g})),n.d(r,"MOUSE_UP",(function(){return I})),n.d(r,"SCROLL_VIEW",(function(){return w})),n.d(r,"DRAG",(function(){return y})),n.d(r,"KEY_DOWN",(function(){return b})),n.d(r,"SET_HOVER_CELL",(function(){return m})),n.d(r,"SET_CELL_VALUE",(function(){return O})),n.d(r,"SET_TARGET_CELL",(function(){return S})),n.d(r,"MOVE_TARGET_CELL",(function(){return C})),n.d(r,"INSERT_ROW",(function(){return k})),n.d(r,"INSERT_COL",(function(){return E})),n.d(r,"DELETE_ROW",(function(){return T})),n.d(r,"DELETE_COL",(function(){return j})),n.d(r,"SET_SELECTION_AREA",(function(){return R})),n.d(r,"CLEAR_SELECTION_AREA",(function(){return D})),n.d(r,"SET_TYPEING_DIRECTION",(function(){return G})),n.d(r,"FILL_SELECTION",(function(){return M})),n.d(r,"PASTE",(function(){return P})),n.d(r,"COPY",(function(){return _})),n.d(r,"CUT",(function(){return N})),n.d(r,"none",(function(){return A})),n.d(r,"setViewport",(function(){return L})),n.d(r,"setText",(function(){return W})),n.d(r,"setCellSize",(function(){return H})),n.d(r,"mouseMoved",(function(){return X})),n.d(r,"mouseDown",(function(){return Y})),n.d(r,"mouseUp",(function(){return U})),n.d(r,"scrollView",(function(){return z})),n.d(r,"drag",(function(){return B})),n.d(r,"keyDown",(function(){return F})),n.d(r,"setHoverCell",(function(){return V})),n.d(r,"setCellValue",(function(){return q})),n.d(r,"setTargetCell",(function(){return K})),n.d(r,"moveTargetCell",(function(){return $})),n.d(r,"setSelectionArea",(function(){return J})),n.d(r,"clearSelectionArea",(function(){return Z})),n.d(r,"insertRow",(function(){return Q})),n.d(r,"insertCol",(function(){return ee})),n.d(r,"deleteRow",(function(){return te})),n.d(r,"deleteCol",(function(){return ne})),n.d(r,"setTypeingDir",(function(){return re})),n.d(r,"paste",(function(){return oe})),n.d(r,"copy",(function(){return ae})),n.d(r,"cut",(function(){return ie})),n.d(r,"fillSelection",(function(){return le}));var o=n(0),a=n.n(o),i=n(10),l=n.n(i),c=(n(65),n(25)),s=(n(70),n(27)),u=(n(71),n(6)),d=n(1),h="[TextGrid] NO Op",f="[TextGrid] Set Text",p="[TextGrid] Set viewport",x="[TextGrid] Set Cell Size",v="[TextGrid] MouseMoved",g="[TextGrid] Mouse Pressed",I="[TextGrid] Mouse Released",w="[TextGrid] Scroll View",y="[TextGrid] Drag",b="[TextGrid] Key Down",m="[TextGrid] Set Hover Cell",O="[TextGrid] Set Cell Text",S="[TextGrid] Set Target Cell",C="[TextGrid] Move Target Cell",k="[TextGrid] Insert Row",E="[TextGrid] Insert Col",T="[TextGrid] Delete Row",j="[TextGrid] Delete Col",R="[TextGrid] Set Selection Area",D="[TextGrid] Clear Selection",G="[TextGrid] Set Text Direction",M="[TextGrid] Fill Selection",P="[TextGrid] Paste",_="[TextGrid] Copy",N="[TextGrid] Cut";function A(){return{type:h}}function L(e,t,n,r){return{type:p,payload:{width:e,height:t,scrollX:n,scrollY:r}}}function W(e){return{type:f,payload:{text:e}}}function H(e,t){return{type:x,payload:{width:e,height:t}}}function X(e){return{type:v,payload:e}}function Y(){return{type:g}}function U(){return{type:I}}function z(e,t){return{type:w,payload:{xOffset:e,yOffset:t}}}function B(){return{type:y}}function F(e){return{type:b,payload:e}}function V(e){return{type:m,payload:e}}function q(e){return{type:O,payload:e}}function K(e,t){return{type:S,payload:{rowIndex:e,colIndex:t}}}function $(e,t,n){return{type:C,payload:{x:e,y:t,invert:n}}}function J(e){return{type:R,payload:e}}function Z(e){return{type:D}}function Q(e){return{type:k,payload:{rowIndex:e}}}function ee(e,t){return{type:E,payload:{rowIndex:e,colIndex:t}}}function te(e){return{type:T,payload:{rowIndex:e}}}function ne(e,t){return{type:j,payload:{rowIndex:e,colIndex:t}}}function re(e,t){return{type:G,payload:{x:e,y:t}}}function oe(e){return{type:P,payload:e}}function ae(e){return{type:_,payload:e}}function ie(e){return{type:N,payload:e}}function le(e){return{type:M,payload:e}}var ce={initialised:!1,cellWidth:24,cellHeight:24,rows:25,cols:80,cells:[],insertMode:!1,viewport:{rows:0,cols:0,width:0,height:0,scrollX:0,scrollY:0,xOffset:0,yOffset:0},hover:{rowIndex:-1,colIndex:-1},target:{rowIndex:-1,colIndex:-1,dir:{x:1,y:0}},selection:{isMouseDown:!1,isDragging:!1,startRowIndex:0,startColIndex:0,endRowIndex:0,endColIndex:0},selectedCells:[]};function se(e,t,n){for(;e.length<=n;)e.push([]);for(;e[n].length<=t;)e[n].push("")}function ue(e,t){var n=Object(d.a)({},e),r=n.xOffset,o=n.xOffset+n.cols-2,a=n.yOffset,i=n.yOffset+n.rows-1;return t.colIndex>=r&&t.colIndex<=o&&t.rowIndex>=i&&t.rowIndex<=a?e:(t.colIndex<r&&(n.xOffset=t.colIndex),t.colIndex>=o&&(n.xOffset=t.colIndex-n.cols+3),t.rowIndex<a&&(n.yOffset=t.rowIndex),t.rowIndex>=i&&(n.yOffset=t.rowIndex-n.rows+2),n)}var de=n(57),he=n(82),fe=n(56),pe=Object(he.a)((function(e,t){return e.pipe(Object(de.a)(v),Object(fe.a)((function(e){var n=e.payload.mouseX+t.value.textGrid.viewport.scrollX,r=e.payload.mouseY+t.value.textGrid.viewport.scrollY,o=t.value.textGrid.cellWidth,a=t.value.textGrid.cellHeight,i=Math.floor(r/a),l=Math.floor(n/o);i<0&&(i=0),l<0&&(l=0),i>=t.value.textGrid.rows&&(i=t.value.textGrid.rows-1),l>=t.value.textGrid.cols&&(l=t.value.textGrid.cols-1);var c={rowIndex:i,colIndex:l},s=[];return i===t.value.textGrid.hover.rowIndex&&l===t.value.textGrid.hover.colIndex||s.push(V(c)),t.value.textGrid.selection.isMouseDown&&s.push(B()),s})))}),(function(e,t){return e.pipe(Object(de.a)(b),Object(fe.a)((function(e){var n=e.payload.key,r=t.value.textGrid.target.rowIndex,o=t.value.textGrid.target.colIndex,a=e.payload.isShiftDown,i=e.payload.callback(t.value,n)||{},l=i.actions||[];if(i.preventDefault)return l;if(1===n.length)return t.value.textGrid.selection.startRowIndex!==t.value.textGrid.selection.endRowIndex||t.value.textGrid.selection.startColIndex!==t.value.textGrid.selection.endColIndex?[le(n)]:[].concat(Object(u.a)(l),[q({rowIndex:r,colIndex:o,value:n}),$()]);if("Tab"===n){var c=a?-1:1;return[].concat(Object(u.a)(l),[$(c,0)])}if("Enter"===n){var s=a?-1:1;return[].concat(Object(u.a)(l),[$(0,s)])}if("Backspace"===n)return[].concat(Object(u.a)(l),[Z(),q({value:""}),$(void 0,void 0,!0)]);if("Delete"===n)return[].concat(Object(u.a)(l),[Z(),q({rowIndex:r,colIndex:o,value:""})]);if(n.includes("Arrow")){var h={x:0,y:0};switch(n){case"ArrowLeft":h.x=-1;break;case"ArrowRight":h.x=1;break;case"ArrowUp":h.y=-1;break;case"ArrowDown":h.y=1}if(a){var f=Object(d.a)({},t.value.textGrid.selection);return f.endColIndex+=h.x,f.endRowIndex+=h.y,[].concat(Object(u.a)(l),[J(f),re(h.x,h.y)])}return[].concat(Object(u.a)(l),[$(h.x,h.y),re(h.x,h.y)])}return[]})))}),(function(e,t){return e.pipe(Object(de.a)(_),Object(fe.a)((function(e){var n=xe(t);return navigator.clipboard.writeText(n),[]})))}),(function(e,t){return e.pipe(Object(de.a)(N),Object(fe.a)((function(e){var n=xe(t);return navigator.clipboard.writeText(n),[Z()]})))}));function xe(e){for(var t=e.value.textGrid.cells,n=e.value.textGrid.selection.startColIndex,r=e.value.textGrid.selection.startRowIndex,o=e.value.textGrid.selection.endColIndex,a=e.value.textGrid.selection.endRowIndex+1,i="",l=r;l<a;l++)if(l>=a)i+="\n";else{for(var c=n;c<o&&c<t[l].length;c++)i+=t[l][c];l<a-1&&(i+="\n")}return i}var ve=n(24),ge=n(81),Ie=Object(ge.a)(),we=Object(ve.c)({textGrid:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:var n=Math.floor(t.payload.width/e.cellWidth),r=Math.floor(t.payload.height/e.cellHeight);return Object(d.a)({},e,{viewport:Object(d.a)({},e.viewport,{},t.payload,{rows:n,cols:r})});case f:var o=t.payload.text.replace(/\r\n/g,"\r").replace(/\n/g,"\r").split(/\r/).map((function(e){return e.split("")}));return Object(d.a)({},e,{cells:o});case x:var a=t.payload.width,i=t.payload.height;return Object(d.a)({},e,{cellWidth:a,cellHeight:i});case m:return Object(d.a)({},e,{hover:t.payload});case O:var l=t.payload.rowIndex?t.payload.rowIndex:e.target.rowIndex,c=t.payload.colIndex?t.payload.colIndex:e.target.colIndex,s=t.payload.value,h=e.cells;return se(h,c,l),h[l][c]=s,function(e){for(var t=e.length-1;t>=0;t--)for(var n=e[t].length-1;n>=0&&!e[t][n];n--)e[t].pop();for(var r=e.length-1;r>=0&&!(e[r].length>0);r--)e.pop();console.log(e)}(h),Object(d.a)({},e,{cells:h});case S:var v=Object(d.a)({},e.target,{},t.payload),b=Object(d.a)({},e.selection,{startRowIndex:v.rowIndex,startColIndex:v.colIndex,endRowIndex:v.rowIndex,endColIndex:v.colIndex}),_=ue(e.viewport,v);return Object(d.a)({},e,{viewport:_,target:v,selection:b});case C:var N=t.payload.invert?-1:1,A=t.payload&&void 0!==t.payload.x?t.payload.x:e.target.dir.x,L=t.payload&&void 0!==t.payload.y?t.payload.y:e.target.dir.y,W=Object(d.a)({},e.target,{},function(e,t,n){var r=e.rowIndex+n,o=e.colIndex+t;return r=Math.max(r,0),o=Math.max(o,0),{rowIndex:r,colIndex:o}}(e.target,A*N,L*N)),H=Object(d.a)({},e.selection,{startRowIndex:W.rowIndex,startColIndex:W.colIndex,endRowIndex:W.rowIndex,endColIndex:W.colIndex}),X=ue(e.viewport,W);return Object(d.a)({},e,{viewport:X,target:W,selection:H});case k:var Y=t.payload.rowIndex,U=e.cells;return U.splice(Y,0,[]),Object(d.a)({},e,{cells:U});case E:for(var z=t.payload,B=z.rowIndex,F=z.colIndex,V=e.cells;V.length<=B;)V.push([]);for(;V[B].length<=F;)V[B].push("");return V[B].splice(F,0,""),Object(d.a)({},e,{cells:V});case T:var q=t.payload.rowIndex,K=e.cells;return K.splice(q,1),Object(d.a)({},e,{cells:K});case j:console.log(j);var $=t.payload,J=$.rowIndex,Z=$.colIndex,Q=e.cells;return Q.length<=J?e:Q[J].length<=Z?e:(Q[J].splice(Z,1),Object(d.a)({},e,{cells:Q}));case R:var ee=Object(d.a)({},e.selection,{},t.payload),te=Object(d.a)({},e.target,{rowIndex:ee.endRowIndex,colIndex:ee.endColIndex});return Object(d.a)({},e,{selection:ee,target:te});case D:for(var ne=e.cells,re=Math.min(e.selection.startRowIndex,e.selection.endRowIndex),oe=Math.max(e.selection.startRowIndex,e.selection.endRowIndex),ae=Math.min(e.selection.startColIndex,e.selection.endColIndex),ie=Math.max(e.selection.startColIndex,e.selection.endColIndex),le=re;le<=oe&&le<ne.length;le++)for(var de=ae;de<ie&&de<ne[le].length;de++)ne[le][de]="";return Object(d.a)({},e,{cells:ne});case g:var he=Object(d.a)({},e.target,{rowIndex:e.hover.rowIndex,colIndex:e.hover.colIndex}),fe=Object(d.a)({},e.selection,{startColIndex:he.colIndex,startRowIndex:he.rowIndex,endColIndex:he.colIndex,endRowIndex:he.rowIndex,isDragging:!1,isMouseDown:!0});return Object(d.a)({},e,{target:he,selection:fe});case I:var pe=Object(d.a)({},e.selection,{isDragging:!1,isMouseDown:!1});return Object(d.a)({},e,{selection:pe});case w:var xe=t.payload,ve=xe.xOffset,ge=xe.yOffset,Ie=Object(d.a)({},e.viewport,{xOffset:Math.floor(ve/e.cellWidth),yOffset:Math.floor(ge/e.cellHeight)});return Object(d.a)({},e,{viewport:Ie});case y:if(e.selection.isDragging){var we=Object(d.a)({},e.selection),ye=e.hover.colIndex<we.startColIndex?0:1,be=e.hover.rowIndex<we.startRowIndex?0:1;we.endRowIndex=e.hover.rowIndex+be,we.endColIndex=e.hover.colIndex+ye;var me=Object(d.a)({},e.target,{rowIndex:e.hover.rowIndex,colIndex:e.hover.colIndex});return Object(d.a)({},e,{selection:we,target:me})}var Oe=Object(d.a)({},e.target,{rowIndex:e.hover.rowIndex,colIndex:e.hover.colIndex}),Se=Object(d.a)({},e.selection,{isDragging:!0});return Object(d.a)({},e,{selection:Se,target:Oe});case G:var Ce=Object(d.a)({},e.target);return Ce.dir=Object(d.a)({},t.payload),Object(d.a)({},e,{target:Ce});case P:for(var ke=t.payload.replace(/\r\n/g,"\r").replace(/\n/g,"\r").split(/\r/).map((function(e){return e.split("")})),Ee=e.cells,Te=e.selection.startColIndex,je=e.selection.startRowIndex,Re=Math.max.apply(Math,Object(u.a)(ke.map((function(e){return e.length})))),De=ke.length,Ge=0;Ge<ke.length;Ge++)for(var Me=0;Me<ke[Ge].length;Me++){var Pe=Me+Te,_e=Ge+je;se(Ee,Pe,_e),Ee[_e][Pe]=ke[Ge][Me]}var Ne=Object(d.a)({},e.selection,{startRowIndex:je,startColIndex:Te,endRowIndex:je+De-1,endColIndex:Te+Re});return Object(d.a)({},e,{cells:Ee,selection:Ne});case M:for(var Ae=e.cells,Le=e.selection.startColIndex,We=e.selection.startRowIndex,He=e.selection.endColIndex,Xe=e.selection.endRowIndex,Ye=Math.min(Le,He),Ue=Math.min(We,Xe),ze=Math.max(Le,He),Be=Math.max(We,Xe),Fe=Ue;Fe<Be;Fe++)for(var Ve=Ye;Ve<ze;Ve++)se(Ae,Ve,Fe),Ae[Fe][Ve]=t.payload;return Object(d.a)({},e,{cells:Ae});default:return e}}}),ye=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ve.d,be=Object(ve.e)(we,ye(Object(ve.a)(Ie)));Ie.run(pe);n(72);var me=Object(o.forwardRef)((function(e,t){Object(o.useImperativeHandle)(t,(function(){return{getCells:function(){return be.getState().textGrid.cells}}}),[]);var n=Object(c.b)(),r=Object(c.c)((function(e){return e.textGrid.cols*e.textGrid.cellWidth})),i=Object(c.c)((function(e){return e.textGrid.rows*e.textGrid.cellHeight}));console.log({fullWidth:r,fullHeight:i});var l=Object(o.useRef)(null),s=Object(o.useRef)(null);Object(o.useEffect)((function(){n(W(e.config.text))}),[e.config.text]),Object(o.useEffect)((function(){n(H(e.config.cellWidth,e.config.cellHeight))}),[e.config.cellWidth,e.config.cellHeight]),Object(o.useLayoutEffect)((function(){if(l.current){var e=l.current,t=e.getContext("2d"),n={};return function r(){!function(e,t,n){var r="rgb(220, 220, 170)";t.save(),t.fillStyle="rgb(30, 30, 30)",t.fillRect(0,0,e.width,e.height),t.translate(-n.viewport.scrollX,-n.viewport.scrollY);var o=Math.floor(e.width/n.cellWidth),a=Math.floor(e.height/n.cellHeight),i=Math.floor(n.viewport.scrollX/n.cellWidth),l=Math.floor(n.viewport.scrollY/n.cellHeight),c=i+o+1,s=l+a+1;t.strokeStyle="rgb(37, 37, 38)",t.beginPath();for(var u=i;u<c&&u<=n.cols;u++){var d=u*n.cellWidth;t.moveTo(d,n.viewport.scrollY),t.lineTo(d,n.rows*n.cellHeight)}for(var h=l;h<s&&h<=n.rows;h++){var f=h*n.cellHeight;t.moveTo(n.viewport.scrollX,f),t.lineTo(n.cols*n.cellWidth,f)}t.stroke(),t.closePath(),t.textAlign="center",t.textBaseline="middle",t.fillStyle=r,t.font="10pt source-code-pro, Menlo, Monaco, Consolas";for(var p=l;p<n.cells.length&&p<s;p++)for(var x=i;x<n.cells[p].length&&x<c;x++){var v=x*n.cellWidth+.5*n.cellWidth,g=p*n.cellHeight+.5*n.cellHeight+1;t.fillText(n.cells[p][x],v,g)}var I=n.hover.colIndex*n.cellWidth,w=n.hover.rowIndex*n.cellHeight;if(w<n.rows*n.cellHeight&&I<n.cols*n.cellWidth&&(t.globalAlpha=.01,t.fillStyle="white",t.fillRect(n.viewport.scrollX,w,n.cols*n.cellWidth,n.cellHeight),t.fillRect(I,n.viewport.scrollY,n.cellWidth,n.rows*n.cellHeight),t.globalAlpha=1),null!==n.selection){var y=Math.min(n.selection.startColIndex,n.selection.endColIndex),b=Math.max(n.selection.startColIndex,n.selection.endColIndex),m=Math.min(n.selection.startRowIndex,n.selection.endRowIndex),O=Math.max(n.selection.startRowIndex,n.selection.endRowIndex),S=y*n.cellWidth,C=m*n.cellHeight,k=(b-y)*n.cellWidth,E=(O-m)*n.cellHeight;t.globalAlpha=.04,t.fillStyle=r,t.fillRect(S,C,k,E),t.globalAlpha=1,t.strokeStyle=r,t.strokeRect(S,C,k,E)}if(n.target.colIndex>=i&&n.target.colIndex<c&&n.target.rowIndex>=l&&n.target.rowIndex<s){var T=n.target.colIndex*n.cellWidth,j=n.target.rowIndex*n.cellHeight;t.fillStyle="rgba(255, 255, 255, 0.1)",t.fillRect(T,j,n.cellWidth,n.cellHeight),t.strokeStyle="yellow",t.beginPath(),n.target.dir.x>0&&(t.moveTo(T,j),t.lineTo(T,j+n.cellHeight)),n.target.dir.x<0&&(t.moveTo(T+n.cellWidth,j),t.lineTo(T+n.cellWidth,j+n.cellHeight)),n.target.dir.y>0&&(t.moveTo(T,j),t.lineTo(T+n.cellWidth,j)),n.target.dir.y<0&&(t.moveTo(T,j+n.cellHeight),t.lineTo(T+n.cellWidth,j+n.cellHeight)),t.closePath(),t.stroke()}t.restore()}(e,t,be.getState().textGrid),n.handle=requestAnimationFrame(r)}(),function(){console.log("cleanup"),cancelAnimationFrame(n.handle)}}}),[l.current]),Object(o.useEffect)((function(){u()}),[e.dimensions]);var u=function(){var e=s.current?s.current.clientWidth:0,t=s.current?s.current.clientHeight:0,r=s.current?s.current.scrollLeft:void 0,o=s.current?s.current.scrollTop:void 0;!l.current||l.current.width===e&&l.current.height===t||(l.current.width=e,l.current.height=t),console.log({width:e,height:t,scrollX:r,scrollY:o}),n(L(e,t,r,o))};return a.a.createElement("div",{ref:s,className:"customScrollbars",onScroll:function(e){u()},style:{position:"relative",width:"100%",height:"100%",overflow:"auto"}},a.a.createElement("canvas",{ref:l,style:{position:"sticky",left:0,top:0,display:"block"},tabIndex:"0",onKeyDown:function(t){if(console.log("test"),t.ctrlKey){var r=t.key.toLowerCase();"v"===r||("c"===r?(n(ae()),t.preventDefault()):"x"===r&&(n(ie()),t.preventDefault()))}else t.preventDefault(),n(F({key:t.key,isShiftDown:t.shiftKey,callback:e.config.events.onKeyDown}))},onMouseMove:function(e){var t=e.currentTarget.getBoundingClientRect(),r=e.clientX-t.left,o=e.clientY-t.top;n(X({mouseX:r,mouseY:o}))},onMouseUp:function(e){e.preventDefault(),n(U())},onMouseDown:function(e){e.preventDefault(),e.currentTarget.focus(),n(Y())},onMouseLeave:function(e){n(V({rowIndex:-1,colIndex:-1}))}}),a.a.createElement("div",{style:{position:"absolute",width:r,height:i,pointerEvents:"none",left:0,top:0}}))}));function Oe(){var e=Object(c.c)((function(e){return e.textGrid}));return a.a.createElement("div",{className:"text-grid-status-bar"},a.a.createElement("ul",null,a.a.createElement("li",null,"Rows: ",e.rows),a.a.createElement("li",null,"Cols: ",e.cols)))}var Se=n(52),Ce=(n(73),{readOnlyPos:2,consoleText:"> "}),ke=function(e,t){switch(t.type){case"BEGIN_USER_INPIT":var n=e.consoleText+="> ",r=n.length;return Object(d.a)({},e,{consoleText:n,readOnlyPos:r});case"SET_CONSOLE_TEXT":var o=t.payload;return Object(d.a)({},e,{consoleText:o});case"END_USER_INPUT":var a=e.consoleText.length,i=e.consoleText.length>0?e.consoleText+="\n":"";return Object(d.a)({},e,{readOnlyPos:a,consoleText:i});case"APPEND_PROGRAM_INPUT":var l=e.consoleText+t.payload,c=l.length;return Object(d.a)({},e,{consoleText:l,readOnlyPos:c});case"CLEAR_TERMINAL":return Object(d.a)({},e,{consoleText:"",readOnlyPos:0});case"SET_STATE":return Object(d.a)({},e,{},t.payload);default:return console.warn("UNHANDELED ACTION"),e}},Ee=function(){return{type:"BEGIN_USER_INPIT"}},Te=function(){return{type:"END_USER_INPUT"}},je=function(e){return{type:"SET_CONSOLE_TEXT",payload:e}},Re=function(e){return{type:"APPEND_PROGRAM_INPUT",payload:e}},De=function(){return{type:"CLEAR_TERMINAL"}},Ge=Object(o.forwardRef)((function(e,t){var n=Object(o.useReducer)(ke,Ce),r=Object(s.a)(n,2),i=r[0],l=r[1],c=Object(d.a)({clear:function(e){l(De())},echo:function(e){l(Re(e.join(" ")+"\n"))}},e.commands),u=Object(o.useCallback)((function(t){if(!e.onEnter||!e.onEnter(t)){var n=t.split(" ");if(0!==n.length){var r=Object(Se.a)(n),o=r[0],a=r.slice(1);void 0!==c[o]&&c[o](a),l(Te()),l(Ee())}}}),[e,c]);return Object(o.useImperativeHandle)(t,(function(){return{print:function(e){l(Re(e))},submitInput:function(){var e=i.consoleText.substr(i.readOnlyPos);u(e)}}}),[i.consoleText,i.readOnlyPos,u]),a.a.createElement("div",{className:"terminal"},a.a.createElement("textarea",{wrap:"off",spellCheck:"false",value:i.consoleText,onChange:function(e){l(je(e.target.value))},onKeyDown:function(e){if(1===e.key.length);else if("Enter"===e.key){var t=i.consoleText.substr(i.readOnlyPos);u(t),e.preventDefault()}else"Backspace"===e.key?e.target.selectionStart<=i.readOnlyPos&&e.preventDefault():"Delete"===e.key&&e.target.selectionStart<i.readOnlyPos&&e.preventDefault()},onSelect:function(e){e.target.selectionStart===i.readOnlyPos-1?e.target.setSelectionRange(i.readOnlyPos,i.readOnlyPos):e.target.selectionStart<i.readOnlyPos-1&&e.target.setSelectionRange(e.target.value.length,e.target.value.length)}}))}));n(74);function Me(e){var t=e.items||[];return a.a.createElement("div",{className:"toolbar"},a.a.createElement("ul",null,t.map((function(e,t){return a.a.createElement("li",{key:"tbitem-"+t,className:e.classNames,onClick:e.onClick},e.text)}))))}var Pe=n(11),_e=n(9),Ne=n(80),Ae=function(){function e(t){Object(Pe.a)(this,e),this.instructionInfo={"0-9":"Push this number on the stack","+":"Addition: Pop a and b, then push a+b","-":"Subtraction: Pop a and b, then push b-a","*":"Multiplication: Pop a and b, then push a*b","/":"Integer division: Pop a and b, then push b/a, rounded towards 0","%":"Modulo: Pop a and b, then push the remainder of the integer division of b/a","!":"Logical NOT: Pop a value. If the value is zero, push 1; otherwise, push zero","`":"Greater than: Pop a and b, then push 1 if b>a, otherwise zero",">":"Start moving right","<":"Start moving left","^":"Start moving up",v:"Start moving down","?":"Start moving in a random cardinal direction",_:"Pop a value; move right if value=0, left otherwise","|":"Pop a value; move down if value=0, up otherwise",'"':"Start string mode: push each character's ASCII value all the way up to the next\"",":":"Duplicate value on top of the stack","\\":"Swap two values on top of the stack",$:"Pop value from the stack and discard it",".":"Pop value and output as an integer followed by a space",",":"Pop value and output as ASCII character","#":"Bridge: Skip next cell",p:'A "put" call (a way to store a value for later use). Pop y, x, and v, then change the character at (x,y) in the program to the character with ASCII value v',g:'A "get" call (a way to retrieve data in storage). Pop y and x, then push ASCII value of the character at that position in the program',"&":"Ask user for a number and push it","~":"Ask user for a character and push its ASCII value","@":"End program",StringMode:"all characters are pushed onto the stack"},this.program=t,this.numRows=25,this.numCols=80,this.stack=[],this.stack$=new Ne.a([]),this.onInstructionExecutedCb=null,this.onConsoleOutCb=null,this.onProgramTerminateCb=null,this.onRequestConsoleInputCb=null,this.currentInstruction=null,this.nextInstruction=Object(d.a)({x:0,y:0,i:t[0][0]},this.getInstructionDir(1,0,t[0][0])),this.stringMode=!1,this.waitingForInput=!1,this.inputStack=[],this.skipCount=0}return Object(_e.a)(e,[{key:"destroy",value:function(){}},{key:"step",value:function(){if(!this.waitingForInput){this.currentInstruction=this.nextInstruction;var e=this.currentInstruction;if(null!==e){if(this.stringMode)if('"'===e.i)this.stringMode=!1;else{var t=e.i;""===t&&(t=" "),this.pushStack(t.charCodeAt(0))}else if(e.i.includes([">","<","v","^","?"]));else if(e.i>="0"&&e.i<="9")this.pushStack(parseInt(e.i));else if("+"===e.i){var n=this.popStack(),r=this.popStack();this.pushStack(n+r)}else if("-"===e.i){var o=this.popStack(),a=this.popStack();this.pushStack(a-o)}else if("*"===e.i){var i=this.popStack(),l=this.popStack();this.pushStack(i*l)}else if("/"===e.i){var c=this.popStack(),s=this.popStack();this.pushStack(s/c)}else if("%"===e.i){var u=this.popStack(),d=this.popStack();this.pushStack(d%u)}else if("!"===e.i){var h=this.popStack();this.pushStack(0===h?1:0)}else if("`"===e.i){var f=this.popStack(),p=this.popStack();this.pushStack(p>f?1:0)}else if("_"===e.i)this.popStack();else if("|"===e.i)this.popStack();else if('"'===e.i)this.stringMode=!this.stringMode;else if(":"===e.i)this.stack.length>0&&this.pushStack(this.stack[this.stack.length-1]);else if("\\"===e.i){var x=this.popStack(),v=this.popStack();this.pushStack(x),this.pushStack(v)}else if("$"===e.i)this.popStack();else if("."===e.i){var g=this.popStack();this.onConsoleOutCb(g)}else if(","===e.i){var I=this.popStack();this.onConsoleOutCb(String.fromCharCode(I))}else if("#"===e.i)this.skipCount+=1;else if("p"===e.i){var w=this.popStack(),y=this.popStack(),b=this.popStack(),m=String.fromCharCode(b);this.program[w][y]=m}else if("g"===e.i){var O=this.popStack(),S=this.popStack();if(S>=0&&S<this.numCols&&O>=0&&O<this.numRows){var C=this.program[O][S];this.pushStack(C)}else this.pushStack(0)}else if("&"===e.i){if(0===this.inputStack.length)return this.waitingForInput=!0,void(this.onRequestConsoleInputCb&&this.onRequestConsoleInputCb());var k=this.inputStack.shift();this.pushStack(parseInt(k))}else if("~"===e.i){if(0===this.inputStack.length)return this.waitingForInput=!0,void(this.onRequestConsoleInputCb&&this.onRequestConsoleInputCb());var E=this.inputStack.shift();this.pushStack(E.charCodeAt(0))}else"@"===e.i&&(e.dirX=0,e.dirY=0,this.onProgramTerminateCb&&this.onProgramTerminateCb());var T=this.getNextInstruction();this.nextInstruction=T,this.onInstructionExecutedCb&&this.onInstructionExecutedCb(e,T)}}}},{key:"pushStack",value:function(e){this.stack.push(e),this.stack$.next(this.stack)}},{key:"popStack",value:function(){var e=this.stack.length>0?this.stack.pop():0;return this.stack$.next(this.stack),e}},{key:"getNextInstruction",value:function(){var e=this.currentInstruction,t=e.x,n=e.y;do{this.skipCount-=1,t+=e.dirX,(n+=e.dirY)<0&&(n=this.numRows-1),t<0&&(t=this.numCols-1),n>=this.numRows&&(n=0),t>=this.numCols&&(t=0)}while(this.skipCount>=0);this.skipCount=0;var r=t<this.program[n].length?this.program[n][t]:"",o=this.getInstructionDir(e.dirX,e.dirY,r);return Object(d.a)({x:t,y:n,i:r},o)}},{key:"getInstructionDir",value:function(e,t,n){var r=e,o=t;if(this.stringMode)return{dirX:r,dirY:o};switch(n){case">":r=1,o=0;break;case"<":r=-1,o=0;break;case"^":r=0,o=-1;break;case"v":r=0,o=1;break;case"?":var a=Math.floor(4*Math.random());0===a&&(r=1,o=0),1===a&&(r=0,o=1),2===a&&(r=-1,o=0),3===a&&(r=0,o=-1);break;case"_":o=0,r=0===(this.stack.length>0?this.stack[this.stack.length-1]:0)?1:-1;break;case"|":o=0===(this.stack.length>0?this.stack[this.stack.length-1]:0)?1:-1,r=0}return{dirX:r,dirY:o}}},{key:"input",value:function(e){this.inputStack.push(e),this.waitingForInput=!1}},{key:"onInstructionExecuted",value:function(e){this.onInstructionExecutedCb=e}},{key:"onConsoleOut",value:function(e){this.onConsoleOutCb=e}},{key:"onRequestConsoleInput",value:function(e){this.onRequestConsoleInputCb=e}},{key:"onProgramTerminate",value:function(e){this.onProgramTerminateCb=e}}]),e}(),Le=n(13);n(77);function We(e){var t=Object(o.useState)([]),n=Object(s.a)(t,2),r=n[0],i=n[1];return Object(o.useEffect)((function(){var t=null;return e.program&&(t=e.program.stack$.subscribe((function(e){i(Object(u.a)(e))}))),function(){t&&t.unsubscribe(),i([])}}),[e.program]),a.a.createElement("ul",{className:"befunge-stack-view"},r.reverse().map((function(e,t){return a.a.createElement("li",{key:"bfstack-"+t},a.a.createElement("span",{style:{float:"left"}},e),a.a.createElement("span",{style:{float:"right"}},String.fromCharCode(e)))})))}var He=null,Xe=Object(o.forwardRef)((function(e,t){var n=Object(o.useState)(null),i=Object(s.a)(n,2),l=i[0],c=i[1],u=function(){var e=v.current.getCells(),t=new Ae(e);t.onInstructionExecuted((function(e,t){null!==t&&(be.dispatch(r.setTargetCell(t.y,t.x)),be.dispatch(r.setTypeingDir(t.dirX,t.dirY)))})),t.onConsoleOut((function(e){g.current&&g.current.print(e)})),t.onProgramTerminate((function(){h()})),t.onRequestConsoleInput((function(){var e=window.prompt("Enter a value","");l&&l.waitingForInput&&e&&l.input(e)})),l=t,c(t),be.dispatch(r.setTargetCell(0,0)),be.dispatch(r.setTypeingDir(1,0))},d=function(){null===l&&null===He&&(u(),He=setInterval((function(){f()}),1))},h=function(){clearInterval(He),He=null,c(null),g.current&&(g.current.print("\nProgram Terminated!\n"),g.current.submitInput())},f=function(){l.step()},p={"set-cursor-pos":function(e){var t,n;t=parseInt(e[0]),n=parseInt(e[1]),be.dispatch(r.setTargetCell(t,n))},"set-cursor-dir":function(e){var t,n;t=parseInt(e[0]),n=parseInt(e[1]),be.dispatch(r.setTypeingDir(t,n))},run:function(e){d()},next:function(e){f()},stack:function(e){console.log(l.stack)}},x={cellWidth:20,cellHeight:20,text:'"v\n a\n a\n a\n @',events:{onKeyDown:function(e,t){return"v"===t?{preventDefault:!1,actions:[r.setTypeingDir(0,1)]}:">"===t?{preventDefault:!1,actions:[r.setTypeingDir(1,0)]}:"<"===t?{preventDefault:!1,actions:[r.setTypeingDir(-1,0)]}:"^"===t?{preventDefault:!1,actions:[r.setTypeingDir(0,-1)]}:{}}},terminalCommands:p},v=Object(o.useRef)(),g=Object(o.useRef)(),I=[];return null===l?(I.push({text:"Run",classNames:"button",onClick:function(){return d()}}),I.push({text:"Debug",classNames:"button",onClick:function(){u()}})):(I.push({text:"Stop",classNames:"button",onClick:function(){return h()}}),I.push({text:"Step",classNames:"button",onClick:function(){return f()}})),a.a.createElement("div",{className:"befungeIde"},a.a.createElement(Le.a,{orientation:"horizontal"},a.a.createElement(Le.b,{style:{overflow:"hidden"},minSize:24,maxSize:24},a.a.createElement(Me,{items:I})),a.a.createElement(Le.b,null,a.a.createElement(Le.a,{orientation:"vertical"},a.a.createElement(Le.b,{flex:"1"},a.a.createElement(Le.a,{orientation:"horizontal"},a.a.createElement(Le.b,{propagateDimensions:!0,style:{overflow:"hidden"}},a.a.createElement(me,{ref:v,config:x})),a.a.createElement(Le.c,null),a.a.createElement(Le.b,{minSize:"200",maxSize:"400",style:{overflow:"hidden"}},a.a.createElement(Ge,{ref:g,commands:p,onEnter:function(e){l&&l.waitingForInput&&l.input(e)}})))),a.a.createElement(Le.c,null),a.a.createElement(Le.b,{style:{overflow:"hidden"},minSize:"200",maxSize:"400"},a.a.createElement("div",{className:"asside"},a.a.createElement("div",{className:"asside-header"},"Debug Stack"),a.a.createElement("div",{className:"asside-section",style:{maxHeight:200}},a.a.createElement(We,{program:l})))))),a.a.createElement(Le.b,{style:{overflow:"hidden"},minSize:24,maxSize:24},a.a.createElement(Oe,null))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement((function(){return a.a.createElement(c.a,{store:be},a.a.createElement("div",{className:"App",style:{width:"calc(100%)",height:"calc(100% )",overflow:"hidden"}},a.a.createElement(Xe,null)))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[60,1,2]]]);
//# sourceMappingURL=main.f15c4e4d.chunk.js.map