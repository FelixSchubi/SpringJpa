
/* Smart HTML Elements v1.1.0 (2018-June) 
Copyright (c) 2011-2018 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart.Utilities.Assign("Draw",class{constructor(a){const b=this;b.host=a,b.renderEngine="",b.refresh();const c=["clear","removeElement","attr","getAttr","line","circle","rect","path","pieslice","pieSlicePath","text","measureText"];for(let d in c)b._addFn(Smart.Utilities.Draw.prototype,c[d])}_addFn(a,b){a[b]||(a[b]=function(){return this.renderer[b].apply(this.renderer,arguments)})}_initRenderer(a){return this.createRenderer(this,a)}_internalRefresh(){const a=this;if("none"!==window.getComputedStyle(a.host).display){a.renderer||(a.host.innerHTML="",a._initRenderer(a.host));const b=a.renderer;if(b){const c=b.getRect();a._render({x:1,y:1,width:c.width,height:c.height})}}}_render(a){this._plotRect=a}refresh(){this._internalRefresh()}getSize(){const a=this._plotRect;return{width:a.width,height:a.height}}toGreyScale(a){if(-1===a.indexOf("#"))return a;const b=this.cssToRgb(a);b[0]=b[1]=b[2]=Math.round(.3*b[0]+.59*b[1]+.11*b[2]);const c=this.rgbToHex(b[0],b[1],b[2]);return"#"+c[0]+c[1]+c[2]}decToHex(a){return a.toString(16)}hexToDec(a){return parseInt(a,16)}rgbToHex(a,c,d){return[this.decToHex(a),this.decToHex(c),this.decToHex(d)]}hexToRgb(a,b,c){return[this.hexToDec(a),this.hexToDec(b),this.hexToDec(c)]}cssToRgb(a){return-1>=a.indexOf("rgb")?this.hexToRgb(a.substring(1,3),a.substring(3,5),a.substring(5,7)):a.substring(4,a.length-1).split(",")}hslToRgb(a){let c,d,e;const f=parseFloat(a[0]),h=parseFloat(a[1]),i=parseFloat(a[2]);if(0===h)c=d=e=i;else{const a=.5>i?i*(1+h):i+h-i*h,b=2*i-a;c=this.hueToRgb(b,a,f+1/3),d=this.hueToRgb(b,a,f),e=this.hueToRgb(b,a,f-1/3)}return[255*c,255*d,255*e]}hueToRgb(a,b,c){return(0>c&&(c+=1),1<c&&(c-=1),c<1/6)?a+6*(b-a)*c:c<1/2?b:c<2/3?a+6*((b-a)*(2/3-c)):a}rgbToHsl(a){const c=parseFloat(a[0])/255,d=parseFloat(a[1])/255,e=parseFloat(a[2])/255,b=Math.max(c,d,e),f=Math.min(c,d,e);let g,i,j=(b+f)/2;if(b===f)g=i=0;else{const a=b-f;i=.5<j?a/(2-b-f):a/(b+f);b===c?g=(d-e)/a+(d<e?6:0):b===d?g=(e-c)/a+2:b===e?g=(c-d)/a+4:void 0;g/=6}return[g,i,j]}swap(a,b){const c=a;a=b,b=c}getNum(a){if(!(a.constructor!==Array)){for(let b=0;b<a.length;b++)if(!isNaN(a[b]))return a[b];}else if(isNaN(a))return 0;return 0}_ptdist(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))}_ptRotate(a,b,c,d,e){var f=Math.pow,g=Math.abs;const h=Math.sqrt(f(g(a-c),2)+f(g(b-d),2)),i=Math.asin((a-c)/h),j=i+e;return a=c+Math.cos(j)*h,b=d+Math.sin(j)*h,{x:a,y:b}}log(a,b){var c=Math.log;return c(a)/(b?c(b):1)}_mod(c,d){const e=Math.abs(c>d?d:c);let f=1;if(0!==e)for(;100>e*f;)f*=10;return c*=f,d*=f,c%d/f}ptrnd(a){var b=Math.round;if(.5===Math.abs(b(a)-a))return a;let c=b(a);return c<a&&--c,c+.5}createRenderer(a,b){const c=a;let d=c.renderer=null;return document.createElementNS&&(d=new Smart.Utilities.SvgRenderer,d.init(b)),c.renderer=d,d}getByPriority(a){let b;for(let c=0;c<a.length&&b===void 0;c++)void 0===b&&void 0!==a[c]&&(b=a[c]);return b}get(a,b,c){return c===void 0?a[b]:a[b][c]}min(a,b){let c=NaN;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);(isNaN(c)||e<c)&&(c=e)}return c}max(a,b){let c=NaN;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);(isNaN(c)||e>c)&&(c=e)}return c}sum(a,b){let c=0;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);isNaN(e)||(c+=e)}return c}count(a,b){let c=0;for(let d=0;d<a.length;d++){const e=this.get(a,d,b);isNaN(e)||c++}return c}avg(a,b){return this.sum(a,b)/Math.max(1,this.count(a,b))}filter(a,b){if(!b)return a;const c=[];for(let d=0;d<a.length;d++)b(a[d])&&c.push(a[d]);return c}scale(a,b,c,d){var e=Math.pow,f=Math.abs,g=Math.min,h=Math.max;if(isNaN(a))return NaN;if((a<g(b.min,b.max)||a>h(b.min,b.max))&&(!d||!0!==d.ignore_range))return NaN;let i=NaN,j=1;if(b.type===void 0||"logarithmic"!==b.type){let c=f(b.max-b.min);c||(c=1),j=f(a-g(b.min,b.max))/c}else if("logarithmic"===b.type){let c=b.base;isNaN(c)&&(c=10);let d=g(b.min,b.max);0>=d&&(d=1);let i=h(b.min,b.max);0>=i&&(i=1);const k=this.log(i,c);i=e(c,k);const l=this.log(d,c);d=e(c,l);const m=this.log(a,c);j=f(m-l)/(k-l)}if("logarithmic"===c.type){let a=c.base;isNaN(a)&&(a=10);const b=this.log(c.max,a),d=this.log(c.min,a);c.flip&&(j=1-j);const h=g(d,b)+j*f(b-d);i=e(a,h)}else i=g(c.min,c.max)+j*f(c.max-c.min),c.flip&&(i=h(c.min,c.max)-i+c.min);return i}axis(a,b,c){var d=Math.floor,e=Math.pow,f=Math.round;if(1>=c)return[b,a];(isNaN(c)||2>c)&&(c=2);let g=0;for(;f(a)!==a&&f(b)!==b&&10>g;)a*=10,b*=10,g++;let h=(b-a)/c;for(;10>g&&f(h)!==h;)a*=10,b*=10,h*=10,g++;const j=[1,2,5];let k,l=0;for(;;){let a=l%j.length,b=d(l/j.length),c=e(10,b)*j[a];if(a=(l+1)%j.length,b=d((l+1)/j.length),k=e(10,b)*j[a],h>=c&&h<k)break;l++}const m=k,n=[];let o=this.renderer._rnd(a,m,!1);for(const d=0>=g?1:e(10,g);o<b+m;)n.push(o/d),o+=m;return n}}),Smart.Utilities.Assign("SvgRenderer",class{constructor(){const a=this;a._svgns="http://www.w3.org/2000/svg",a._openGroups=[],a._clipId=0,a._gradients={},a._toRadiansCoefficient=2*Math.PI/360}init(a){const b=document.createElement("div");b.className="drawContainer",b.onselectstart=function(){return!1},a.appendChild(b),this.host=a,this.container=b;try{const a=document.createElementNS(this._svgns,"svg");a.setAttribute("version","1.1"),a.setAttribute("width","100%"),a.setAttribute("height","100%"),a.setAttribute("overflow","hidden"),b.appendChild(a),this.canvas=a}catch(a){return!1}return this._id=new Date().getTime(),this.clear(),!0}getType(){return"SVG"}refresh(){}_rup(a){let b=Math.round(a);return a>b&&b++,b}getRect(){var a=Math.max;return{x:0,y:0,width:a(this._rup(this.host.offsetWidth)-1,0),height:a(this._rup(this.host.offsetHeight)-1,0)}}getContainer(){return this.container}clear(){for(;0<this.canvas.childNodes.length;)this.removeElement(this.canvas.firstElementChild);this._defaultParent=void 0,this._defs=document.createElementNS(this._svgns,"defs"),this._gradients={},this.canvas.appendChild(this._defs)}removeElement(a){if(void 0!==a)try{for(;a.firstChild;)this.removeElement(a.firstChild);a.parentNode?a.parentNode.removeChild(a):this.canvas.removeChild(a)}catch(a){}}beginGroup(){const a=this._activeParent(),b=document.createElementNS(this._svgns,"g");return a.appendChild(b),this._openGroups.push(b),b}endGroup(){0===this._openGroups.length||this._openGroups.pop()}_activeParent(){return 0===this._openGroups.length?this.canvas:this._openGroups[this._openGroups.length-1]}createClipRect(a){const b=document.createElementNS(this._svgns,"clipPath"),c=document.createElementNS(this._svgns,"rect");return this.attr(c,{x:a.x,y:a.y,width:a.width,height:a.height,fill:"none"}),this._clipId=this._clipId||0,b.id="cl"+this._id+"_"+(++this._clipId).toString(),b.appendChild(c),this._defs.appendChild(b),b}getWindowHref(){let a=window.location.href;return a?(a=a.replace(/([\('\)])/g,"\\$1"),a=a.replace(/#.*$/,""),a):a}setClip(a,b){const c="url("+this.getWindowHref()+"#"+b.id+")";return this.attr(a,{"clip-path":c})}shape(a,b){const c=document.createElementNS(this._svgns,a);if(c){for(let a in b)c.setAttribute(a,b[a]);return this._activeParent().appendChild(c),c}}_getTextParts(a,b,c){const d={width:0,height:0,parts:[]};if(void 0===a)return d;const e=a.toString().split("<br>"),f=this._activeParent(),g=document.createElementNS(this._svgns,"text");this.attr(g,c);for(let h=0;h<e.length;h++){const a=e[h],b=g.ownerDocument.createTextNode(a);g.appendChild(b),f.appendChild(g);let c;try{c=g.getBBox()}catch(a){}const i=this._rup(c.width),j=this._rup(c.height*.6);g.removeChild(b),d.width=Math.max(d.width,i),d.height+=j+(0<h?4:0),d.parts.push({width:i,height:j,text:a})}return f.removeChild(g),d}measureText(a,b,c,d){var e=Math.abs;const f=this._getTextParts(a,b,c),g=f.width;let h=f.height;!1===d&&(h/=.6);let i={};if(isNaN(b)&&(b=0),0===b)i={width:this._rup(g),height:this._rup(h)};else{const a=2*(b*Math.PI)/360,c=e(Math.sin(a)),d=e(Math.cos(a)),f=e(g*c+h*d),j=e(g*d+h*c);i={width:this._rup(j),height:this._rup(f)}}return d&&(i.textPartsInfo=f),i}alignTextInRect(a,b,c,d,e,f,g,h,i,j){const k=2*(i*Math.PI)/360,l=Math.sin(k),m=Math.cos(k),n=e*l,o=e*m;"center"===g||""===g||"undefined"===g?a+=c/2:"right"===g&&(a+=c),"center"===h||"middle"===h||""===h||"undefined"===h?b+=d/2:"bottom"===h?b+=d-f/2:"top"==h&&(b+=f/2),j=j||"";let p="middle";-1===j.indexOf("top")?-1!==j.indexOf("bottom")&&(p="bottom"):p="top";let q="center";return-1===j.indexOf("left")?-1!==j.indexOf("right")&&(q="right"):q="left","center"==q?(a-=o/2,b-=n/2):"right"==q&&(a-=o,b-=n),"top"==p?(a-=f*l,b+=f*m):"middle"==p&&(a-=f*l/2,b+=f*m/2),a=this._rup(a),b=this._rup(b),{x:a,y:b}}text(a,b,c,d,e,f,g,i,j,k,l){const m=this.measureText(a,f,g,!0,this),n=m.textPartsInfo,o=n.parts;let p;if(j||(j="center"),k||(k="center"),(1<o.length||i)&&(p=this.beginGroup()),i){const a=this.createClipRect({x:this._rup(b)-1,y:this._rup(c)-1,width:this._rup(d)+2,height:this._rup(e)+2});this.setClip(p,a)}let q=this._activeParent(),r=0,s=0;r=n.width,s=n.height,(isNaN(d)||0>=d)&&(d=r),(isNaN(e)||0>=e)&&(e=s);const t=d||0,u=e||0;let h=0;if(!f||0===f){c+=s,"center"===k||"middle"===k?c+=(u-s)/2:"bottom"===k&&(c+=u-s),d||(d=r),e||(e=s),q=this._activeParent();let a;for(let d=o.length-1;0<=d;d--){a=document.createElementNS(this._svgns,"text"),this.attr(a,g),this.attr(a,{cursor:"default"});const e=a.ownerDocument.createTextNode(o[d].text);a.appendChild(e);let f=b;const i=o[d].width,k=o[d].height;"center"===j?f+=(t-i)/2:"right"==j&&(f+=t-i),this.attr(a,{x:this._rup(f),y:this._rup(c+h),width:this._rup(i),height:this._rup(k)}),q.appendChild(a),h-=o[d].height+4}return p?(this.endGroup(),p):a}const v=this.alignTextInRect(b,c,d,e,r,s,j,k,f,l);b=v.x,c=v.y;const w=this.shape("g",{transform:"translate("+b+","+c+")"}),z=this.shape("g",{transform:"rotate("+f+")"});w.appendChild(z),h=0;for(let m=o.length-1;0<=m;m--){const a=document.createElementNS(this._svgns,"text");this.attr(a,g),this.attr(a,{cursor:"default"});const b=a.ownerDocument.createTextNode(o[m].text);a.appendChild(b);let c=0;const d=o[m].width,e=o[m].height;"center"===j?c+=(n.width-d)/2:"right"==j&&(c+=n.width-d),this.attr(a,{x:this._rup(c),y:this._rup(h),width:this._rup(d),height:this._rup(e)}),z.appendChild(a),h-=e+4}return q.appendChild(w),p&&this.endGroup(),w}line(a,b,c,d,e){const f=this.shape("line",{x1:a,y1:b,x2:c,y2:d});return this.attr(f,e),f}path(a,b){const c=this.shape("path");return c.setAttribute("d",a),b&&this.attr(c,b),c}_rnd(b,c,d,e){if(isNaN(b))return b;void 0===e&&(e=!0);let f=b-(!0===e?b%c:this._mod(b,c));return b===f?f:(d?b>f&&(f+=c):f>b&&(f-=c),1===c?Math.round(f):f)}_ptrnd(a){var b=Math.round;if(!document.createElementNS)return b(a)===a?a:this._rnd(a,1,!1,!0);const c=this._rnd(a,.5,!1,!0);return .5===Math.abs(c-b(c))?c:c>a?c-.5:c+.5}rect(a,b,c,d,e){var f=Math.max;a=this._ptrnd(a),b=this._ptrnd(b),c=f(1,this._rnd(c,1,!1)),d=f(1,this._rnd(d,1,!1));const g=this.shape("rect",{x:a,y:b,width:c,height:d});return e&&this.attr(g,e),g}circle(a,b,c,d){const e=this.shape("circle",{cx:a,cy:b,r:c});return d&&this.attr(e,d),e}pieSlicePath(a,b,c,d,e,f,g){var h=Math.sin,i=Math.cos,j=Math.abs;d||(d=1);const k=j(e-f),l=180<k?1:0;360<=k&&(f=e+359.99);const m=e*this._toRadiansCoefficient,n=f*this._toRadiansCoefficient;let o=a,p=a,q=b,r=b;const s=!isNaN(c)&&0<c;s&&(g=0);const t=i(m),u=h(m),v=i(n),w=h(n);if(0<g+c){if(0<g){const c=(k/2+e)*this._toRadiansCoefficient;a+=g*i(c),b-=g*h(c)}s&&(o=a+c*t,q=b-c*u,p=a+c*v,r=b-c*w)}const z=a+d*t,A=a+d*v,B=b-d*u,C=b-d*w;let D="";const E=.02<j(j(f-e)-360);return s?(D="M "+p+","+r,D+=" a"+c+","+c,D+=" 0 "+l+",1 "+(o-p)+","+(q-r),D+=E?" L"+z+","+B:" M"+z+","+B,D+=" a"+d+","+d,D+=" 0 "+l+",0 "+(A-z)+","+(C-B),E&&(D+=" Z")):(D="M "+A+","+C,D+=" a"+d+","+d,D+=" 0 "+l+",1 "+(z-A)+","+(B-C),E&&(D+=" L"+a+","+b,D+=" Z")),D}pieslice(a,b,c,d,e,f,g,h){const i=this.pieSlicePath(a,b,c,d,e,f,g),j=this.shape("path");return j.setAttribute("d",i),h&&this.attr(j,h),j}attr(a,b){if(a&&b)for(let c in b)"textContent"==c?a.textContent=b[c]:a.setAttribute(c,b[c])}removeAttr(a,b){if(a&&b)for(let c in b)"textContent"==c?a.textContent="":a.removeAttribute(b[c])}getAttr(a,b){return a.getAttribute(b)}adjustColor(a,b){var c=Math.min;if("string"!=typeof a)return"#000000";if(-1===a.indexOf("#"))return a;let d=this.cssToRgb(a);const e=this.rgbToHsl(d);e[2]=c(1,e[2]*b),e[1]=c(1,1.1*(e[1]*b)),d=this.hslToRgb(e),a="#";for(let e,c=0;3>c;c++)e=Math.round(d[c]),e=this.decToHex(e),1===e.toString().length&&(a+="0"),a+=e;return a.toUpperCase()}_toLinearGradient(a,b,c){const d="grd"+this._id+a.replace("#","")+(b?"v":"h"),e="url("+this.getWindowHref()+"#"+d+")";if(this._gradients[e])return e;const f=document.createElementNS(this._svgns,"linearGradient");this.attr(f,{x1:"0%",y1:"0%",x2:b?"0%":"100%",y2:b?"100%":"0%",id:d});for(let d=0;d<c.length;d++){const b=c[d],e=document.createElementNS(this._svgns,"stop"),g="stop-color:"+this.adjustColor(a,b[1]);this.attr(e,{offset:b[0]+"%",style:g}),f.appendChild(e)}return this._defs.appendChild(f),this._gradients[e]=!0,e}_toRadialGradient(a,b,c){const d="grd"+this._id+a.replace("#","")+"r"+(void 0===c?"":c.key),e="url("+this.getWindowHref()+"#"+d+")";if(this._gradients[e])return e;const f=document.createElementNS(this._svgns,"radialGradient");void 0===c?this.attr(f,{cx:"50%",cy:"50%",r:"100%",fx:"50%",fy:"50%",id:d}):this.attr(f,{cx:c.x,cy:c.y,r:c.outerRadius,id:d,gradientUnits:"userSpaceOnUse"});for(let d=0;d<b.length;d++){const c=b[d],e=document.createElementNS(this._svgns,"stop"),g="stop-color:"+this.adjustColor(a,c[1]);this.attr(e,{offset:c[0]+"%",style:g}),f.appendChild(e)}return this._defs.appendChild(f),this._gradients[e]=!0,e}});