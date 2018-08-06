
/* Smart HTML Elements v1.1.0 (2018-June) 
Copyright (c) 2011-2018 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart("smart-card",class extends Smart.ContentElement{static get properties(){return{dataSource:{value:null,type:"object?",reflectToAttribute:!1},itemTemplate:{value:null,type:"any?",reflectToAttribute:!1},contentHandler:{value:null,type:"function?",reflectToAttribute:!1}}}static get listeners(){return{mouseenter:"_mouseEnterHandler",mouseleave:"_mouseLeaveHandler","container.swipeleft":"_swipeHandler","container.swiperight":"_swipeHandler","container.swipetop":"_swipeHandler","container.swipebottom":"_swipeHandler"}}template(){return`<div id="container" inner-h-t-m-l="[[innerHTML]]">
                <content></content>
            </div>`}propertyChangedHandler(a,b,c){super.propertyChangedHandler(a,b,c);const d=this;"itemTemplate"===a?(d._template=d._handleTemplate(),d.innerHTML=d._processTemplate(),d.contentHandler&&d.contentHandler(d)):"dataSource"===a?(d.innerHTML=d._processTemplate(),d.contentHandler&&d.contentHandler(d)):"contentHandler"===a?d.contentHandler&&d.contentHandler(d):void 0}ready(){super.ready();const a=this;a._template=a._handleTemplate(),a._template.hasBindings?a.innerHTML=a._processTemplate():a.itemTemplate&&(a.innerHTML=a._template.content),a.contentHandler&&a.contentHandler(a)}_handleTemplate(){const a=this;let b=a.itemTemplate,c="",d=!1,e=/{{\w+}}/g;return a.itemTemplate?b instanceof HTMLElement?c=b.innerHTML:(b=document.getElementById(b),c=b?b.innerHTML:""):c=a.innerHTML,e.exec(c)&&(d=!0),{content:c,hasBindings:d}}_processTemplate(){const a=this,b=/{{\w+}}/g,c=a._template.content.match(b),d=a.dataSource||{};let e=a._template.content;return c&&0!==c.length?(c.forEach(function(a){const b=a.replace("{{","").replace("}}","");e=e.replace(a,d[b]||"")}),e):e}_swipeHandler(a){a.stopPropagation(),this.$.fireEvent(a.type)}});