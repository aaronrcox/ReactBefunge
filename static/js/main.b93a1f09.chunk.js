(this.webpackJsonpReactBefunge=this.webpackJsonpReactBefunge||[]).push([[0],{49:function(e,t,n){e.exports=n(65)},54:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"NO_OP",(function(){return f})),n.d(r,"SETUP_GRID",(function(){return p})),n.d(r,"INITIALISE_GRID",(function(){return h})),n.d(r,"MOUSE_MOVED",(function(){return x})),n.d(r,"MOUSE_DOWN",(function(){return v})),n.d(r,"MOUSE_UP",(function(){return g})),n.d(r,"SCROLL_VIEW",(function(){return I})),n.d(r,"DRAG",(function(){return w})),n.d(r,"KEY_DOWN",(function(){return b})),n.d(r,"SET_HOVER_CELL",(function(){return m})),n.d(r,"SET_CELL_VALUE",(function(){return y})),n.d(r,"SET_TARGET_CELL",(function(){return O})),n.d(r,"MOVE_TARGET_CELL",(function(){return C})),n.d(r,"INSERT_ROW",(function(){return k})),n.d(r,"INSERT_COL",(function(){return E})),n.d(r,"DELETE_ROW",(function(){return S})),n.d(r,"DELETE_COL",(function(){return j})),n.d(r,"SET_SELECTION_AREA",(function(){return R})),n.d(r,"CLEAR_SELECTION_AREA",(function(){return T})),n.d(r,"SET_TYPEING_DIRECTION",(function(){return G})),n.d(r,"FILL_SELECTION",(function(){return D})),n.d(r,"PASTE",(function(){return M})),n.d(r,"COPY",(function(){return N})),n.d(r,"CUT",(function(){return _})),n.d(r,"none",(function(){return A})),n.d(r,"setupGrid",(function(){return L})),n.d(r,"initialiseGrid",(function(){return P})),n.d(r,"mouseMoved",(function(){return W})),n.d(r,"mouseDown",(function(){return H})),n.d(r,"mouseUp",(function(){return Y})),n.d(r,"scrollView",(function(){return X})),n.d(r,"drag",(function(){return U})),n.d(r,"keyDown",(function(){return F})),n.d(r,"setHoverCell",(function(){return V})),n.d(r,"setCellValue",(function(){return q})),n.d(r,"setTargetCell",(function(){return B})),n.d(r,"moveTargetCell",(function(){return K})),n.d(r,"setSelectionArea",(function(){return $})),n.d(r,"clearSelectionArea",(function(){return z})),n.d(r,"insertRow",(function(){return J})),n.d(r,"insertCol",(function(){return Q})),n.d(r,"deleteRow",(function(){return Z})),n.d(r,"deleteCol",(function(){return ee})),n.d(r,"setTypeingDir",(function(){return te})),n.d(r,"paste",(function(){return ne})),n.d(r,"copy",(function(){return re})),n.d(r,"cut",(function(){return ae})),n.d(r,"fillSelection",(function(){return oe}));var a=n(0),o=n.n(a),i=n(22),c=n.n(i),l=(n(54),n(4)),s=(n(60),n(15)),u=n(8),d=n(1),f="[TextGrid] NO Op",p="[TextGrid] Setup",h="[TextGrid] Initialise",x="[TextGrid] MouseMoved",v="[TextGrid] Mouse Pressed",g="[TextGrid] Mouse Released",I="[TextGrid] Scroll View",w="[TextGrid] Drag",b="[TextGrid] Key Down",m="[TextGrid] Set Hover Cell",y="[TextGrid] Set Cell Text",O="[TextGrid] Set Target Cell",C="[TextGrid] Move Target Cell",k="[TextGrid] Insert Row",E="[TextGrid] Insert Col",S="[TextGrid] Delete Row",j="[TextGrid] Delete Col",R="[TextGrid] Set Selection Area",T="[TextGrid] Clear Selection",G="[TextGrid] Set Text Direction",D="[TextGrid] Fill Selection",M="[TextGrid] Paste",N="[TextGrid] Copy",_="[TextGrid] Cut";function A(){return{type:f}}function L(e,t,n,r,a){return{type:p,payload:{width:e,height:t,text:n,cellWidth:r,cellHeight:a}}}function P(e){return{type:h,payload:e}}function W(e){return{type:x,payload:e}}function H(){return{type:v}}function Y(){return{type:g}}function X(e,t){return{type:I,payload:{xOffset:e,yOffset:t}}}function U(){return{type:w}}function F(e){return{type:b,payload:e}}function V(e){return{type:m,payload:e}}function q(e){return{type:y,payload:e}}function B(e,t){return{type:O,payload:{rowIndex:e,colIndex:t}}}function K(e,t,n){return{type:C,payload:{x:e,y:t,invert:n}}}function $(e){return{type:R,payload:e}}function z(e){return{type:T}}function J(e){return{type:k,payload:{rowIndex:e}}}function Q(e,t){return{type:E,payload:{rowIndex:e,colIndex:t}}}function Z(e){return{type:S,payload:{rowIndex:e}}}function ee(e,t){return{type:j,payload:{rowIndex:e,colIndex:t}}}function te(e,t){return{type:G,payload:{x:e,y:t}}}function ne(e){return{type:M,payload:e}}function re(e){return{type:N,payload:e}}function ae(e){return{type:_,payload:e}}function oe(e){return{type:D,payload:e}}var ie={cellWidth:24,cellHeight:24,rows:0,cols:0,cells:[],insertMode:!1,viewport:{rows:0,cols:0,xOffset:0,yOffset:0},hover:{rowIndex:-1,colIndex:-1},target:{rowIndex:-1,colIndex:-1,dir:{x:1,y:0}},selection:{isMouseDown:!1,isDragging:!1,startRowIndex:0,startColIndex:0,endRowIndex:0,endColIndex:0},selectedCells:[]};function ce(e,t,n){for(;e.length<=n;)e.push([]);for(;e[n].length<=t;)e[n].push("")}function le(e,t){var n=Object(d.a)({},e),r=n.xOffset,a=n.xOffset+n.cols-2,o=n.yOffset,i=n.yOffset+n.rows-1;return t.colIndex>=r&&t.colIndex<=a&&t.rowIndex>=i&&t.rowIndex<=o?e:(t.colIndex<r&&(n.xOffset=t.colIndex),t.colIndex>=a&&(n.xOffset=t.colIndex-n.cols+3),t.rowIndex<o&&(n.yOffset=t.rowIndex),t.rowIndex>=i&&(n.yOffset=t.rowIndex-n.rows+2),n)}var se=n(46),ue=n(69),de=n(45),fe=Object(ue.a)((function(e,t){return e.pipe(Object(se.a)(p),Object(de.a)((function(e){var n=e.payload.width,r=e.payload.height,a=e.payload.text,o=e.payload.cellWidth||t.value.textGrid.cellWidth,i=e.payload.cellHeight||t.value.textGrid.cellHeight;return[P({cellWidth:o,cellHeight:i,rows:Math.floor(r/(i-1))+1,cols:Math.floor(n/(o-1))+1,cells:a.replace(/\r\n/g,"\r").replace(/\n/g,"\r").split(/\r/).map((function(e){return e.split("")}))})]})))}),(function(e,t){return e.pipe(Object(se.a)(x),Object(de.a)((function(e){var n=e.payload.mouseX,r=e.payload.mouseY,a=t.value.textGrid.cellWidth-1,o=t.value.textGrid.cellHeight-1,i=t.value.textGrid.viewport,c=Math.floor(r/o)+i.yOffset,l=Math.floor(n/a)+i.xOffset,s={rowIndex:c,colIndex:l},u=[];return c===t.value.textGrid.hover.rowIndex&&l===t.value.textGrid.hover.colIndex||u.push(V(s)),t.value.textGrid.selection.isMouseDown&&u.push(U()),u})))}),(function(e,t){return e.pipe(Object(se.a)(b),Object(de.a)((function(e){var n=e.payload.key,r=t.value.textGrid.target.rowIndex,a=t.value.textGrid.target.colIndex,o=e.payload.isShiftDown,i=e.payload.callback(t.value,n)||{},c=i.actions||[];if(i.preventDefault)return c;if(1===n.length)return t.value.textGrid.selection.startRowIndex!==t.value.textGrid.selection.endRowIndex||t.value.textGrid.selection.startColIndex!==t.value.textGrid.selection.endColIndex?[oe(n)]:[].concat(Object(u.a)(c),[q({rowIndex:r,colIndex:a,value:n}),K()]);if("Tab"===n){var l=o?-1:1;return[].concat(Object(u.a)(c),[K(l,0)])}if("Enter"===n){var s=o?-1:1;return[].concat(Object(u.a)(c),[K(0,s)])}if("Backspace"===n)return[].concat(Object(u.a)(c),[z(),q({value:""}),K(void 0,void 0,!0)]);if("Delete"===n)return[].concat(Object(u.a)(c),[z(),q({rowIndex:r,colIndex:a,value:""})]);if(n.includes("Arrow")){var f={x:0,y:0};switch(n){case"ArrowLeft":f.x=-1;break;case"ArrowRight":f.x=1;break;case"ArrowUp":f.y=-1;break;case"ArrowDown":f.y=1}if(o){var p=Object(d.a)({},t.value.textGrid.selection);return p.endColIndex+=f.x,p.endRowIndex+=f.y,[].concat(Object(u.a)(c),[$(p),te(f.x,f.y)])}return[].concat(Object(u.a)(c),[K(f.x,f.y),te(f.x,f.y)])}return[]})))}),(function(e,t){return e.pipe(Object(se.a)(N),Object(de.a)((function(e){var n=pe(t);return navigator.clipboard.writeText(n),[]})))}),(function(e,t){return e.pipe(Object(se.a)(_),Object(de.a)((function(e){var n=pe(t);return navigator.clipboard.writeText(n),[z()]})))}));function pe(e){for(var t=e.value.textGrid.cells,n=e.value.textGrid.selection.startColIndex,r=e.value.textGrid.selection.startRowIndex,a=e.value.textGrid.selection.endColIndex,o=e.value.textGrid.selection.endRowIndex+1,i="",c=r;c<o;c++)if(c>=o)i+="\n";else{for(var l=n;l<a&&l<t[c].length;l++)i+=t[c][l];c<o-1&&(i+="\n")}return i}var he=n(16),xe=n(68),ve=Object(xe.a)(),ge=Object(he.c)({textGrid:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:var n=Object(d.a)({},e.viewport,{rows:t.payload.rows,cols:t.payload.cols});return Object(d.a)({},e,{},t.payload,{viewport:n});case m:return Object(d.a)({},e,{hover:t.payload});case y:var r=t.payload.rowIndex?t.payload.rowIndex:e.target.rowIndex,a=t.payload.colIndex?t.payload.colIndex:e.target.colIndex,o=t.payload.value,i=e.cells;return ce(i,a,r),i[r][a]=o,Object(d.a)({},e,{cells:i});case O:var c=Object(d.a)({},e.target,{},t.payload),l=Object(d.a)({},e.selection,{startRowIndex:c.rowIndex,startColIndex:c.colIndex,endRowIndex:c.rowIndex,endColIndex:c.colIndex}),s=le(e.viewport,c);return Object(d.a)({},e,{viewport:s,target:c,selection:l});case C:var f=t.payload.invert?-1:1,p=t.payload&&void 0!==t.payload.x?t.payload.x:e.target.dir.x,x=t.payload&&void 0!==t.payload.y?t.payload.y:e.target.dir.y,b=Object(d.a)({},e.target,{},function(e,t,n){var r=e.rowIndex+n,a=e.colIndex+t;return r=Math.max(r,0),a=Math.max(a,0),{rowIndex:r,colIndex:a}}(e.target,p*f,x*f)),N=Object(d.a)({},e.selection,{startRowIndex:b.rowIndex,startColIndex:b.colIndex,endRowIndex:b.rowIndex,endColIndex:b.colIndex}),_=le(e.viewport,b);return Object(d.a)({},e,{viewport:_,target:b,selection:N});case k:var A=t.payload.rowIndex,L=e.cells;return L.splice(A,0,[]),Object(d.a)({},e,{cells:L});case E:for(var P=t.payload,W=P.rowIndex,H=P.colIndex,Y=e.cells;Y.length<=W;)Y.push([]);for(;Y[W].length<=H;)Y[W].push("");return Y[W].splice(H,0,""),Object(d.a)({},e,{cells:Y});case S:var X=t.payload.rowIndex,U=e.cells;return U.splice(X,1),Object(d.a)({},e,{cells:U});case j:console.log(j);var F=t.payload,V=F.rowIndex,q=F.colIndex,B=e.cells;return B.length<=V?e:B[V].length<=q?e:(B[V].splice(q,1),Object(d.a)({},e,{cells:B}));case R:var K=Object(d.a)({},e.selection,{},t.payload),$=Object(d.a)({},e.target,{rowIndex:K.endRowIndex,colIndex:K.endColIndex});return Object(d.a)({},e,{selection:K,target:$});case T:for(var z=e.cells,J=Math.min(e.selection.startRowIndex,e.selection.endRowIndex),Q=Math.max(e.selection.startRowIndex,e.selection.endRowIndex),Z=Math.min(e.selection.startColIndex,e.selection.endColIndex),ee=Math.max(e.selection.startColIndex,e.selection.endColIndex),te=J;te<=Q&&te<z.length;te++)for(var ne=Z;ne<ee&&ne<z[te].length;ne++)z[te][ne]="";return Object(d.a)({},e,{cells:z});case v:var re=Object(d.a)({},e.target,{rowIndex:e.hover.rowIndex,colIndex:e.hover.colIndex}),ae=Object(d.a)({},e.selection,{startColIndex:re.colIndex,startRowIndex:re.rowIndex,endColIndex:re.colIndex,endRowIndex:re.rowIndex,isDragging:!1,isMouseDown:!0});return Object(d.a)({},e,{target:re,selection:ae});case g:var oe=Object(d.a)({},e.selection,{isDragging:!1,isMouseDown:!1});return Object(d.a)({},e,{selection:oe});case I:var se=t.payload,ue=se.xOffset,de=se.yOffset,fe=Object(d.a)({},e.viewport,{xOffset:Math.floor(ue/e.cellWidth),yOffset:Math.floor(de/e.cellHeight)});return Object(d.a)({},e,{viewport:fe});case w:if(e.selection.isDragging){var pe=Object(d.a)({},e.selection);pe.endRowIndex=e.hover.rowIndex,pe.endColIndex=e.hover.colIndex,pe.endColIndex+=pe.endColIndex<pe.startColIndex?0:1;var he=Object(d.a)({},e.target,{rowIndex:e.hover.rowIndex,colIndex:e.hover.colIndex});return Object(d.a)({},e,{selection:pe,target:he})}var xe=Object(d.a)({},e.target,{rowIndex:e.hover.rowIndex,colIndex:e.hover.colIndex}),ve=Object(d.a)({},e.selection,{isDragging:!0});return Object(d.a)({},e,{selection:ve,target:xe});case G:var ge=Object(d.a)({},e.target);return ge.dir=Object(d.a)({},t.payload),Object(d.a)({},e,{target:ge});case M:for(var Ie=t.payload.replace(/\r\n/g,"\r").replace(/\n/g,"\r").split(/\r/).map((function(e){return e.split("")})),we=e.cells,be=e.selection.startColIndex,me=e.selection.startRowIndex,ye=Math.max.apply(Math,Object(u.a)(Ie.map((function(e){return e.length})))),Oe=Ie.length,Ce=0;Ce<Ie.length;Ce++)for(var ke=0;ke<Ie[Ce].length;ke++){var Ee=ke+be,Se=Ce+me;ce(we,Ee,Se),we[Se][Ee]=Ie[Ce][ke]}var je=Object(d.a)({},e.selection,{startRowIndex:me,startColIndex:be,endRowIndex:me+Oe-1,endColIndex:be+ye});return Object(d.a)({},e,{cells:we,selection:je});case D:for(var Re=e.cells,Te=e.selection.startColIndex,Ge=e.selection.startRowIndex,De=e.selection.endColIndex,Me=e.selection.endRowIndex,Ne=Math.min(Te,De),_e=Math.min(Ge,Me),Ae=Math.max(Te,De),Le=Math.max(Ge,Me),Pe=_e;Pe<=Le;Pe++)for(var We=Ne;We<Ae;We++)ce(Re,We,Pe),Re[Pe][We]=t.payload;return Object(d.a)({},e,{cells:Re});default:return e}}}),Ie=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||he.d,we=Object(he.e)(ge,Ie(Object(he.a)(ve)));ve.run(fe);n(61);var be=Object(a.forwardRef)((function(e,t){Object(a.useImperativeHandle)(t,(function(){return{test:function(){return console.log("hello world")},getCells:function(){return we.getState().textGrid.cells}}}),[]);var n=Object(l.b)(),r=Object(l.c)((function(e){return e.textGrid.viewport.rows})),i=Object(l.c)((function(e){return e.textGrid.viewport.xOffset})),c=Object(l.c)((function(e){return e.textGrid.viewport.yOffset})),s=r>0?new Array(r).fill(""):[],u=Object(a.useRef)(null);Object(a.useEffect)((function(){var t=u.current?u.current.offsetWidth:0,r=u.current?u.current.offsetHeight:0;n(L(t,r,e.config.text,e.config.cellWidth,e.config.cellHeight));var a=document.addEventListener("paste",(function(e){n(ne(e.clipboardData.getData("text")))}));return function(){document.removeEventListener(a)}}),[e,n]);return u.current&&(u.current.scrollLeft=i*e.config.cellWidth,u.current.scrollTop=c*e.config.cellHeight),console.log("GRID RE-RENDERED"),o.a.createElement("div",{ref:u,className:"text-grid-area",onScroll:function(e){e.preventDefault(),n(X(e.target.scrollLeft,e.target.scrollTop))},draggable:!0,tabIndex:"0",onKeyDown:function(t){if(t.ctrlKey){var r=t.key.toLowerCase();"v"===r||("c"===r?(n(re()),t.preventDefault()):"x"===r&&(n(ae()),t.preventDefault()))}else t.preventDefault(),n(F({key:t.key,isShiftDown:t.shiftKey,callback:e.config.events.onKeyDown}))},onMouseMove:function(e){var t=e.currentTarget.getBoundingClientRect(),r=e.clientX-t.left,a=e.clientY-t.top;n(W({mouseX:r,mouseY:a}))},onMouseUp:function(e){e.preventDefault(),n(Y())},onMouseDown:function(e){e.preventDefault(),e.currentTarget.focus(),n(H())},onMouseLeave:function(e){n(V({rowIndex:-1,colIndex:-1}))}},o.a.createElement("div",{className:"text-grid"},s.map((function(e,t){return o.a.createElement(me,{key:"gridRow-".concat(t),rowId:t+c})})),o.a.createElement(Oe,null)),o.a.createElement("div",{style:{width:1e4,height:1e4,position:"absolute"}}))}));function me(e){var t=e.rowId,n=Object(l.c)((function(e){return e.textGrid.cellHeight})),r=Object(l.c)((function(e){return e.textGrid.viewport.cols})),a=Object(l.c)((function(e){return e.textGrid.viewport.xOffset})),i=r>0?new Array(r).fill(""):[];return console.log("ROW RE-RENDERED"),o.a.createElement("div",{className:"text-grid-row",style:{height:n,maxHeight:n,minHeight:n}},i.map((function(e,n){var r=n+a;return o.a.createElement(ye,{key:"cell-"+t+"-"+r,rowId:t,colId:r})})))}function ye(e){var t=e.rowId,n=e.colId,r=Object(l.c)((function(e){return t<e.textGrid.cells.length&&n<e.textGrid.cells[t].length?e.textGrid.cells[t][n]:""})),a=Object(l.c)((function(e){return e.textGrid.cellWidth})),i=Object(l.c)((function(e){return e.textGrid.hover.rowIndex===t})),c=Object(l.c)((function(e){return e.textGrid.hover.colIndex===n})),s=Object(l.c)((function(e){return e.textGrid.target.rowIndex===t&&e.textGrid.target.colIndex===n})),u=Object(l.c)((function(e){return s?e.textGrid.target.dir.x:0})),d=Object(l.c)((function(e){return s?e.textGrid.target.dir.y:0})),f=i&&c;return o.a.createElement("span",{className:function(){var e=["text-grid-cell"];return f&&e.push("cell-hover"),i&&e.push("row-hover"),c&&e.push("col-hover"),s&&e.push("active-override"),s&&u>0&&e.push("active-override-left"),s&&u<0&&e.push("active-override-right"),s&&d>0&&e.push("active-override-top"),s&&d<0&&e.push("active-override-bottom"),e.join(" ")}(),style:{width:a,maxWidth:a,minWidth:a}},o.a.createElement("div",{className:"text-grid-cell-content"},r))}function Oe(){var e=Object(l.c)((function(e){return e.textGrid.selection})),t=Object(l.c)((function(e){return e.textGrid.cellWidth})),n=Object(l.c)((function(e){return e.textGrid.cellHeight})),r=Object(l.c)((function(e){return e.textGrid.viewport})),a=e.startColIndex-r.xOffset,i=e.endColIndex-r.xOffset,c=e.startRowIndex-r.yOffset,s=e.endRowIndex-r.yOffset;s<c&&(c+=1),i<a&&(a+=1);var u=(i-a)*(t-1),d=(s-c+1)*(n-1)+(s-c<0?-(n-1):0),f=a*(t-1)+Math.min(u,0),p=c*(n-1)+Math.min(d,0),h={width:Math.abs(u),height:Math.abs(d),left:f,top:p};return 0!==u&&0!==d||(h.display="none"),o.a.createElement("div",{className:"text-grid-selection",style:h})}function Ce(){var e=Object(l.c)((function(e){return e.textGrid.viewport})),t=Object(l.c)((function(e){return e.textGrid.target})),n=Object(l.c)((function(e){return e.textGrid.selection}));return o.a.createElement("div",{className:"text-grid-status-bar"},o.a.createElement("ul",null,o.a.createElement("li",null,"R: ",e.rows),o.a.createElement("li",null,"C: ",e.cols),o.a.createElement("li",null,"SX: ",e.xOffset),o.a.createElement("li",null,"SY: ",e.yOffset),o.a.createElement("li",null,"TX: ",t.colIndex),o.a.createElement("li",null,"TY: ",t.rowIndex),o.a.createElement("li",null,"SX: ",n.startColIndex),o.a.createElement("li",null,"SY: ",n.startRowIndex),o.a.createElement("li",null,"EX: ",n.endColIndex),o.a.createElement("li",null,"EY: ",n.endRowIndex),o.a.createElement("li",null,"dragging: ",n.isDragging?"true":"false"),o.a.createElement("li",null,"mouseDown: ",n.isMouseDown?"true":"false")))}var ke=n(41),Ee=(n(62),Object(a.forwardRef)((function(e,t){var n=Object(a.useState)(1),r=Object(s.a)(n,2),i=r[0],c=r[1],l=Object(a.useState)(""),u=Object(s.a)(l,2),f=u[0],p=u[1],h=Object(d.a)({clear:function(e){I()},echo:function(e){v(e.join(" "))}},e.commands),x=function(t){if(!e.onEnter||!e.onEnter(t)){var n=t.split(" ");if(0!==n.length){var r=Object(ke.a)(n),a=r[0],o=r.slice(1);void 0!==h[a]&&h[a](o)}}},v=function(e){p(f+"\n "+e),f+="\n"+e},g=!1,I=function(){p("> "),f="> ",c(2),i=2,g=!0};return Object(a.useEffect)((function(){p("> "),c(2)}),[]),Object(a.useImperativeHandle)(t,(function(){return{print:function(e){p(f+e),c((f+e).length)},submitInput:function(){x(""),p(f+"\n> "),c((f+="\n> ").length)}}}),[x,f]),o.a.createElement("div",{className:"terminal",style:{maxHeight:200,height:200,display:"flex",border:e.disabled?"10px solid red":A}},o.a.createElement("textarea",{wrap:"off",spellCheck:"false",value:f,onChange:function(e){p(e.target.value)},onKeyDown:function(e){1===e.key.length||("Enter"===e.key?(x(f.substr(i)),!1===g&&(p(f+"\n> "),c((f+="\n> ").length)),g=!1,e.preventDefault()):"Backspace"===e.key?e.target.selectionStart<=i&&e.preventDefault():"Delete"===e.key&&e.target.selectionStart<i&&e.preventDefault())},onSelect:function(e){e.target.selectionStart===i-1?e.target.setSelectionRange(i,i):e.target.selectionStart<i-1&&e.target.setSelectionRange(e.target.value.length,e.target.value.length)}}))})));n(63);function Se(e){var t=e.items||[];return o.a.createElement("div",{className:"toolbar"},o.a.createElement("ul",null,t.map((function(e,t){return o.a.createElement("li",{key:"tbitem-"+t,className:e.classNames,onClick:e.onClick},e.text)}))))}var je=n(42),Re=n(43),Te=n(67),Ge=function(){function e(t){Object(je.a)(this,e),this.instructionInfo={"0-9":"Push this number on the stack","+":"Addition: Pop a and b, then push a+b","-":"Subtraction: Pop a and b, then push b-a","*":"Multiplication: Pop a and b, then push a*b","/":"Integer division: Pop a and b, then push b/a, rounded towards 0","%":"Modulo: Pop a and b, then push the remainder of the integer division of b/a","!":"Logical NOT: Pop a value. If the value is zero, push 1; otherwise, push zero","`":"Greater than: Pop a and b, then push 1 if b>a, otherwise zero",">":"Start moving right","<":"Start moving left","^":"Start moving up",v:"Start moving down","?":"Start moving in a random cardinal direction",_:"Pop a value; move right if value=0, left otherwise","|":"Pop a value; move down if value=0, up otherwise",'"':"Start string mode: push each character's ASCII value all the way up to the next\"",":":"Duplicate value on top of the stack","\\":"Swap two values on top of the stack",$:"Pop value from the stack and discard it",".":"Pop value and output as an integer followed by a space",",":"Pop value and output as ASCII character","#":"Bridge: Skip next cell",p:'A "put" call (a way to store a value for later use). Pop y, x, and v, then change the character at (x,y) in the program to the character with ASCII value v',g:'A "get" call (a way to retrieve data in storage). Pop y and x, then push ASCII value of the character at that position in the program',"&":"Ask user for a number and push it","~":"Ask user for a character and push its ASCII value","@":"End program",StringMode:"all characters are pushed onto the stack"},this.program=t,this.numRows=this.program.length,this.numCols=Math.max(this.program.map((function(e){return e.length}))),this.stack=[],this.stack$=new Te.a([]),this.onInstructionExecutedCb=null,this.onConsoleOutCb=null,this.onProgramTerminateCb=null,this.onRequestConsoleInputCb=null,this.currentInstruction=null,this.nextInstruction=Object(d.a)({x:0,y:0,i:t[0][0]},this.getInstructionDir(1,0,t[0][0])),this.stringMode=!1,this.waitingForInput=!1,this.inputStack=[]}return Object(Re.a)(e,[{key:"step",value:function(){if(!this.waitingForInput){this.currentInstruction=this.nextInstruction;var e=this.currentInstruction;if(null!==e){if(this.stringMode)'"'===e.i?this.stringMode=!1:this.pushStack(e.i.charCodeAt(0));else if(e.i.includes([">","<","v","^","?"]));else if(e.i>="0"&&e.i<="9")this.pushStack(parseInt(e.i));else if("+"===e.i){var t=this.popStack(),n=this.popStack();this.pushStack(t+n)}else if("-"===e.i){var r=this.popStack(),a=this.popStack();this.pushStack(a-r)}else if("*"===e.i){var o=this.popStack(),i=this.popStack();this.pushStack(o*i)}else if("/"===e.i){var c=this.popStack(),l=this.popStack();this.pushStack(l/c)}else if("%"===e.i){var s=this.popStack(),u=this.popStack();this.pushStack(u%s)}else if("!"===e.i){var d=this.popStack();this.pushStack(0===d?1:0)}else if("`"===e.i){var f=this.popStack(),p=this.popStack();this.pushStack(p>f?1:0)}else if("_"===e.i)this.popStack();else if("|"===e.i)this.popStack();else if('"'===e.i)this.stringMode=!this.stringMode;else if(":"===e.i)this.pushStack(this.stack[this.stack.length-1]);else if("\\"===e.i){var h=this.popStack(),x=this.popStack();this.pushStack(h),this.pushStack(x)}else if("$"===e.i)this.popStack();else if("."===e.i){var v=this.popStack();this.onConsoleOutCb(v)}else if(","===e.i){var g=this.popStack();this.onConsoleOutCb(String.fromCharCode(g))}else if("#"===e.i)e.dirX*=2,e.dirY*=2;else if("p"===e.i){var I=this.popStack(),w=this.popStack(),b=this.popStack(),m=String.fromCharCode(b);this.program[I][w]=m}else if("g"===e.i){var y=this.popStack(),O=this.popStack(),C=this.program[y][O];this.pushStck(C)}else if("&"===e.i){if(0===this.inputStack.length)return this.waitingForInput=!0,void(this.onRequestConsoleInputCb&&this.onRequestConsoleInputCb());var k=this.inputStack.shift();this.pushStack(parseInt(k))}else if("~"===e.i){if(0===this.inputStack.length)return this.waitingForInput=!0,void(this.onRequestConsoleInputCb&&this.onRequestConsoleInputCb());var E=this.inputStack.shift();this.pushStack(E.charCodeAt(0))}else"@"===e.i&&(e.dirX=0,e.dirY=0,this.onProgramTerminateCb&&this.onProgramTerminateCb());var S=this.getNextInstruction();this.nextInstruction=S,this.onInstructionExecutedCb&&this.onInstructionExecutedCb(e,S)}}}},{key:"pushStack",value:function(e){this.stack.push(e),this.stack$.next(this.stack)}},{key:"popStack",value:function(){var e=this.stack.pop();return this.stack$.next(this.stack),e}},{key:"getNextInstruction",value:function(){var e=this.currentInstruction,t=e.x+e.dirX,n=e.y+e.dirY;n<0&&(n=this.numRows-1),t<0&&(t=this.numCols-1),n>=this.numRows&&(n=0),t>=this.numCols&&(t=0);var r=t<this.program[n].length?this.program[n][t]:"",a=this.getInstructionDir(e.dirX,e.dirY,r);return Object(d.a)({x:t,y:n,i:r},a)}},{key:"getInstructionDir",value:function(e,t,n){var r=e,a=t;switch(n){case">":r=1,a=0;break;case"<":r=-1,a=0;break;case"^":r=0,a=-1;break;case"v":r=0,a=1;break;case"?":var o=Math.floor(4*Math.random());0===o&&(r=1,a=0),1===o&&(r=0,a=1),2===o&&(r=-1,a=0),3===o&&(r=0,a=-1);break;case"_":a=0,r=0===this.stack[this.stack.length-1]?1:-1;break;case"|":a=0===this.stack[this.stack.length-1]?1:-1,r=0}return{dirX:r,dirY:a}}},{key:"input",value:function(e){this.inputStack.push(e),this.waitingForInput=!1}},{key:"onInstructionExecuted",value:function(e){this.onInstructionExecutedCb=e}},{key:"onConsoleOut",value:function(e){this.onConsoleOutCb=e}},{key:"onRequestConsoleInput",value:function(e){this.onRequestConsoleInputCb=e}},{key:"onProgramTerminate",value:function(e){this.onProgramTerminateCb=e}}]),e}();n(64);function De(e){var t=Object(a.useState)([]),n=Object(s.a)(t,2),r=n[0],i=n[1];return Object(a.useEffect)((function(){var t=null;return e.program&&(t=e.program.stack$.subscribe((function(e){i(Object(u.a)(e))}))),function(){t&&t.unsubscribe(),i([])}}),[e.program]),o.a.createElement("ul",{className:"befunge-stack-view"},r.reverse().map((function(e,t){return o.a.createElement("li",{key:"bfstack-"+t},o.a.createElement("span",{style:{float:"left"}},e),o.a.createElement("span",{style:{float:"right"}},String.fromCharCode(e)))})))}var Me=null,Ne=Object(a.forwardRef)((function(e,t){var n=Object(a.useState)(null),i=Object(s.a)(n,2),c=i[0],l=i[1],u=function(){var e=x.current.getCells(),t=new Ge(e);t.onInstructionExecuted((function(e,t){null!==t&&(we.dispatch(r.setTargetCell(t.y,t.x)),we.dispatch(r.setTypeingDir(t.dirX,t.dirY)))})),t.onConsoleOut((function(e){v.current.print(e)})),t.onProgramTerminate((function(){clearInterval(Me),Me=null,l(null),v.current.print("\nProgram Terminated!\n"),v.current.submitInput()})),t.onRequestConsoleInput((function(){var e=window.prompt("Enter a value","");c&&c.waitingForInput&&e&&c.input(e)})),c=t,l(t),we.dispatch(r.setTargetCell(0,0)),we.dispatch(r.setTypeingDir(1,0))},d=function(){u(),Me=setInterval((function(){f()}),0)},f=function(){c.step()},p={"set-cursor-pos":function(e){var t,n;t=parseInt(e[0]),n=parseInt(e[1]),we.dispatch(r.setTargetCell(t,n))},"set-cursor-dir":function(e){var t,n;t=parseInt(e[0]),n=parseInt(e[1]),we.dispatch(r.setTypeingDir(t,n))},run:function(e){d()},next:function(e){f()},stack:function(e){console.log(c.stack)}},h={cellWidth:32,cellHeight:32,text:'>              v\nv  ,,,,,"Hello"<\n>48*,          v\nv,,,,,,"World!"<\n>25*,@',events:{onKeyDown:function(e,t){return"v"===t?{preventDefault:!1,actions:[r.setTypeingDir(0,1)]}:">"===t?{preventDefault:!1,actions:[r.setTypeingDir(1,0)]}:"<"===t?{preventDefault:!1,actions:[r.setTypeingDir(-1,0)]}:"^"===t?{preventDefault:!1,actions:[r.setTypeingDir(0,-1)]}:{}}},terminalCommands:p},x=Object(a.useRef)(),v=Object(a.useRef)(),g=[];return null===c?(g.push({text:"Run",classNames:"button",onClick:function(){return d()}}),g.push({text:"Debug",classNames:"button",onClick:function(){u()}})):(g.push({text:"Stop",classNames:"button",onClick:function(){return l(null)}}),g.push({text:"Step",classNames:"button",onClick:function(){return f()}})),o.a.createElement("div",{className:"befungeIde"},o.a.createElement("div",{className:"main"},o.a.createElement(Se,{items:g}),o.a.createElement(be,{ref:x,config:h}),o.a.createElement(Ee,{ref:v,commands:p,onEnter:function(e){c&&c.waitingForInput&&c.input(e)}}),o.a.createElement(Ce,null)),o.a.createElement("div",{className:"asside"},o.a.createElement("div",{className:"asside-header"}," Stack"),o.a.createElement("div",{className:"asside-section",style:{maxHeight:200}},o.a.createElement(De,{program:c}))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement((function(){return o.a.createElement(l.a,{store:we},o.a.createElement("div",{className:"App",style:{width:"calc(100%)",height:"calc(100% )",overflow:"hidden"}},o.a.createElement(Ne,null)))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[49,1,2]]]);
//# sourceMappingURL=main.b93a1f09.chunk.js.map