
/* Smart HTML Elements v1.1.0 (2018-June) 
Copyright (c) 2011-2018 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart("smart-tank",class extends Smart.BaseElement{static get properties(){return{coerce:{value:!1,type:"boolean"},customInterval:{value:!1,type:"boolean"},customTicks:{reflectToAttribute:!1,value:["0","50","100"],type:"array"},dateLabelFormatString:{value:"d",type:"string"},decimalSeparator:{value:".",type:"string"},interval:{value:"1",type:"any"},inverted:{value:!1,type:"boolean"},labelFormatFunction:{value:null,type:"function?"},labelsVisibility:{value:"all",allowedValues:["all","endPoints","none"],type:"string"},logarithmicScale:{value:!1,type:"boolean"},max:{value:"100",type:"any"},mechanicalAction:{value:"switchWhileDragging",allowedValues:["switchUntilReleased","switchWhenReleased","switchWhileDragging"],type:"string"},messages:{value:{en:{missingReference:"{{elementType}}: Missing reference to {{files}}.",significantPrecisionDigits:"{{elementType}}: the properties significantDigits and precisionDigits cannot be set at the same time.",invalidMinOrMax:"{{elementType}}: Invalid {{property}} value. Max cannot be lower than Min.",noInteger:"{{elementType}}: precisionDigits could be set only on \"floatingPoint\" scaleType."}},type:"object",extend:!0},min:{value:"0",type:"any"},mode:{value:"numeric",allowedValues:["numeric","date"],type:"string"},name:{value:"",type:"string"},orientation:{value:"vertical",allowedValues:["horizontal","vertical"],type:"string"},precisionDigits:{value:null,type:"number?"},scalePosition:{value:"near",allowedValues:["near","far","both","none"],type:"string"},scaleType:{value:"floatingPoint",allowedValues:["floatingPoint","integer"],type:"string"},scientificNotation:{value:!1,type:"boolean"},showThumbLabel:{value:!1,type:"boolean"},showTooltip:{value:!1,type:"boolean"},showUnit:{value:!1,type:"boolean"},significantDigits:{value:null,type:"number?"},thumbLabelPosition:{value:"near",allowedValues:["near","far"],type:"string"},ticksPosition:{value:"scale",allowedValues:["scale","track"],type:"string"},ticksVisibility:{value:"minor",allowedValues:["major","minor","none"],type:"string"},tooltipPosition:{value:"near",allowedValues:["near","far"],type:"string"},unit:{value:"kg",type:"string"},value:{value:"0",type:"any"},wordLength:{value:"int32",allowedValues:["int8","uint8","int16","uint16","int32","uint32","int64","uint64"],type:"string"}}}static get listeners(){return{"track.down":"_trackDownHandler","document.move":"_documentMoveHandler","document.up":"_documentUpHandler",keydown:"_keydownHandler",resize:"_resizeHandler",styleChanged:"_styleChangedHandler","document.selectstart":"_selectStartHandler","track.mouseenter":"_trackOnMouseEnterHandler","track.mouseleave":"_trackOnMouseLeaveHandler"}}static get requires(){return{"Smart.Utilities.BigNumber":"smart.math.js","Smart.Utilities.NumericProcessor":"smart.numeric.js","Smart.Utilities.TickIntervalHandler":"smart.tickintervalhandler.js"}}template(){return"<div id=\"container\" class=\"smart-container\"><div id=\"scaleNear\" class=\"smart-scale smart-scale-near\"></div><div id=\"track\" class=\"smart-track\"><div id=\"fill\" class=\"smart-value\"><div id=\"bubbleContainer\" class=\"smart-bubble-container\"></div><div id=\"tooltip\" class=\"smart-tooltip\"><div id=\"tooltipContent\" class=\"smart-tooltip-content smart-unselectable\"></div></div><div id=\"thumb\" class=\"smart-thumb\"><span id=\"thumbLabel\" class=\"smart-thumb-label\"></span></div></div><div id=\"trackTicksContainer\" class=\"smart-track-ticks-container smart-hidden\"></div></div><div id=\"scaleFar\" class=\"smart-scale smart-scale-far\"></div><input id=\"hiddenInput\" type=\"hidden\" name=\"[[name]]\"></div>"}ready(){super.ready(),this._createElement()}_createElement(){const e=this;return e.$.fill.style.transition="none","numeric"===e.mode?e._getEventValue=function(){return e.value}:e._handleDateScale(),e._setSettingsObject(),e._setDrawVariables(),e._getLayoutType(),e._numericProcessor=new Smart.Utilities.NumericProcessor(e,"scaleType"),e._numberRenderer=new Smart.Utilities.NumberRenderer,e._isVisible()?void(e._renderingSuspended=!1,e._setInitialComponentDisplay(),e._measurements={},e._wordLengthNumber=e._numericProcessor.getWordLength(e.wordLength),e._validateInitialPropertyValues(),e._setTicksAndInterval(),e._validate(!0),e._updateTooltipValue(e._drawValue),e._setFocusable(),e._setTrackSize(),e._setBubbles(),e.$.fill.style.transition="",e.$.hiddenInput.value=e._getEventValue()):void(e._renderingSuspended=!0)}val(e){const a=this;if(e!==void 0){if("date"===a.mode){let t=Smart.Utilities.DateTime.validateDate(e);return t=t.getTimeStamp(),0===t.compare(a.value)?a._valueDate:(a._programmaticValueIsSet=!0,a._validate(!1,t),void(a._programmaticValueIsSet=!1))}if(a.value.toString().toUpperCase()!==e.toString().toUpperCase()){e=e.toString().replace(/\s/g,""),a._numericProcessor.regexScientificNotation.test(e)&&(e=a._numericProcessor.scientificToDecimal(e));const t=a._discardDecimalSeparator(e.toString());a._programmaticValueIsSet=!0,a._validate(!1,t),a._programmaticValueIsSet=!1,delete a._valueBeforeCoercion}else return a.value="string"==typeof e?e:e.toString()}else return a._getEventValue()}_setBubbles(){const e=this;if(!e.$.hasClass("animation"))return;let a,t=document.createDocumentFragment();for(let e=0;5>e;e++)a=document.createElement("div"),a.classList.add("bubble"),a.classList.add("bubble"+(e+1)),t.appendChild(a);e.$.bubbleContainer.appendChild(t)}_setTrackSize(){const e=this;e._trackSize="vertical"===e.orientation?e.$.track.offsetWidth:e.$.track.offsetHeight}getOptimalSize(){const e=this;if(e._renderingSuspended)return{width:0,height:0};let a,t,i;switch(e.labelsVisibility){case"all":t=e._numericProcessor._longestLabelSize;break;case"endPoints":t=Math.max(e._tickIntervalHandler.labelsSize.minLabelOtherSize,e._tickIntervalHandler.labelsSize.maxLabelOtherSize);break;case"none":t=0;}switch(e.orientation){case"horizontal":return a={marginA:"marginBottom",marginB:"marginTop",nearScaleDistance:"bottom",farScaleDistance:"top",paddingA:"paddingBottom",paddingB:"paddingTop",offset:"offsetWidth",distance:"left"},e._orientationChanged&&(a.offset="offsetHeight",e._trackChanged=!0),i=e._getSize(t,a),{width:i.optimalOtherSize,height:i.optimalSize};case"vertical":return a={marginA:"marginLeft",marginB:"marginRight",nearScaleDistance:"right",farScaleDistance:"left",paddingA:"paddingLeft",paddingB:"paddingRight",offset:"offsetHeight",distance:"top"},e._orientationChanged&&(a.offset="offsetWidth",e._trackChanged=!0),i=e._getSize(t,a),{width:i.optimalSize,height:i.optimalOtherSize};}}propertyChangedHandler(e,a,t){var i=Math.pow,r=Math.log10;super.propertyChangedHandler(e,a,t);const n=this;if(!n._isVisible()||n._renderingSuspended)return void(n._renderingSuspended=!0);switch(e){case"labelsVisibility":case"ticksVisibility":return void n._updateScaleWidth(n._numericProcessor._longestLabelSize);case"coerce":if(t){const e=n.value,a=t=n.logarithmicScale?i(10,n._numericProcessor.getCoercedValue(r(e))):n._numericProcessor.getCoercedValue(e);n._validate(!1,a,!0),n._valueBeforeCoercion=e}else void 0!==n._valueBeforeCoercion&&n._validate(!1,n._valueBeforeCoercion,!1);return;case"interval":{n._numericProcessor.validateInterval(t);const e=t=n.logarithmicScale?i(10,n._numericProcessor.getCoercedValue(r(n.value))):n._numericProcessor.getCoercedValue(n.value);n._validate(!1,e,n.coerce);break}case"min":case"max":{"date"===n.mode&&(delete n._dateInterval,n[e]=Smart.Utilities.DateTime.validateDate(t).getTimeStamp()),n._validateMinMax(e,!1,a);const i=n._numericProcessor.createDescriptor(n._discardDecimalSeparator(n.value,n.decimalSeparator)),r=n._numericProcessor.validate(i,n._minObject,n._maxObject);n._setTicksAndInterval(),n._numericProcessor.updateValue(r);let o=n.getOptimalSize();n.style.width=o.width+"px",n.style.height=o.height+"px";break}case"inverted":{n._getLayoutType(),n._normalLayout&&(n.$.fill.style[n._settings.margin]="0px");let e=n._numericProcessor.createDescriptor(n.value),a=n._numericProcessor.validate(e,n._minObject,n._maxObject);n._setTicksAndInterval(),n._numericProcessor.updateValue(a);break}case"orientation":{const e=n.$.fill.style,a=n.$.container.style;switch(!0!==n._orientationChanged&&(n._orientationChanged=!0),n._tankSizeBeforeOrientation={width:n.offsetWidth,height:n.offsetHeight},n._setSettingsObject(),n._getLayoutType(),n.inverted&&(e.marginTop="0",e.marginLeft="0"),n.orientation){case"vertical":n.inverted||(e.marginTop="auto",e.marginLeft="0"),e.width="100%",a.paddingLeft="0",a.paddingRight="0";break;case"horizontal":n.inverted||(e.marginTop="0",e.marginLeft="auto"),e.height="100%",a.paddingTop="0",a.paddingBottom="0";}n._validateMinMax("both");const t=n._numericProcessor.createDescriptor(n.value),i=n._numericProcessor.validate(t,n._minObject,n._maxObject);n._setTicksAndInterval(),n._setTicksAndInterval(),n._numericProcessor.updateValue(i),n._trackChanged=!0;break}case"significantDigits":case"precisionDigits":{if("date"===n.mode)return;if("precisionDigits"===e&&"integer"===n.scaleType&&n.error(n.localize("noInteger",{elementType:n.nodeName.toLowerCase(),property:e})),"significantDigits"===e&&null!==n.precisionDigits?n.precisionDigits=null:"precisionDigits"==e&&null!==n.significantDigits&&(n.significantDigits=null),n._validateInitialPropertyValues(),n._setTicksAndInterval(),"horizontal"===n.orientation&&n.inverted){const e=n._numericProcessor.valueToPx(n._numericProcessor.getCoercedValue(n._drawValue));n.updateFillSizeAndPosition(e,n._settings.margin,t,!1)}break}case"decimalSeparator":{if("integer"===n.scaleType||"date"===n.mode)return;const e=n._discardDecimalSeparator(n.value,a),t=n._applyDecimalSeparator(e);n.value=e,delete n._valueBeforeCoercion,n._numericProcessor.addTicksAndLabels(),n._updateTooltipValue(t);break}case"value":{if(null===t)return;if("date"===n.mode){let e=Smart.Utilities.DateTime.validateDate(t);return e=e.getTimeStamp(),void(0!==e.compare(a)&&(n._programmaticValueIsSet=!0,n._validate(!1,e),n._programmaticValueIsSet=!1))}if(n.value.toString().toUpperCase()!==a.toString().toUpperCase()){let e=void 0===t?a.toString().replace(/\s/g,""):t.toString().replace(/\s/g,"");n._numericProcessor.regexScientificNotation.test(e)&&(e=n._numericProcessor.scientificToDecimal(e)),n._programmaticValueIsSet=!0,n._validate(!1,e),n._programmaticValueIsSet=!1,delete n._valueBeforeCoercion}else n.value="string"==typeof t?t:t.toString();break}case"scaleType":if("date"===n.mode)return void(n.scaleType="integer");n._changeScaleType(a,t);break;case"disabled":case"unfocusable":n._setFocusable();break;case"showUnit":case"unit":{n._setTicksAndInterval(),n._moveThumbBasedOnValue(n._drawValue);break}case"tooltipPosition":break;case"wordLength":{if("date"===n.mode)return void(n.wordLength="uint64");n._wordLengthNumber=n._numericProcessor.getWordLength(t),n._validateMinMax("both");const e=n._numericProcessor.createDescriptor(n.value),a=n._numericProcessor.validate(e,n._minObject,n._maxObject);n._setTicksAndInterval(),n._numericProcessor.updateValue(a);break}case"scalePosition":{n._setInitialComponentDisplay(),n._setTicksAndInterval(),n._moveThumbBasedOnValue(n._drawValue);break}case"labelFormatFunction":case"scientificNotation":{if("date"===n.mode&&"scientificNotation"===e)return;const a=n._discardDecimalSeparator(n.value,n.decimalSeparator);n._setTicksAndInterval(),n._updateTooltipValue(a);break}case"logarithmicScale":if("date"===n.mode)return void(n.logarithmicScale=!1);n._validateMinMax("both"),n._setTicksAndInterval(),n._validate(!1,n.value);break;case"ticksPosition":"scale"===t?(n.$trackTicksContainer.addClass("smart-hidden"),n.$.trackTicksContainer.innerHTML=""):n.$trackTicksContainer.removeClass("smart-hidden"),n._numericProcessor.addTicksAndLabels();break;case"customInterval":t?(n._customTicks&&(n.customTicks=n._customTicks),n._numericProcessor.validateCustomTicks()):"date"===n.mode&&(n._customTicks=n.customTicks),n._setTicksAndInterval(),n._coerceCustomInterval();break;case"customTicks":if("date"===n.mode&&!n.customInterval)return n._customTicks=t,void(n.customTicks=a);n._numericProcessor.validateCustomTicks(),n.customInterval&&(n._setTicksAndInterval(),n._coerceCustomInterval());break;case"dateLabelFormatString":"date"===n.mode&&n._setTicksAndInterval();break;case"mode":n.mode=a;break;case"showThumbLabel":t&&n.showTooltip&&(n.showTooltip=!1);break;case"showTooltip":t&&n.showThumbLabel&&(n.showThumbLabel=!1);}}_setSettingsObject(){const e=this;e._settings="horizontal"===e.orientation?{clientSize:"clientWidth",dimension:"width",leftOrTop:"left",margin:"marginLeft",offset:"offsetLeft",otherSize:"offsetHeight",size:"offsetWidth",page:"pageX"}:{clientSize:"clientHeight",dimension:"height",leftOrTop:"top",margin:"marginTop",offset:"offsetTop",otherSize:"offsetWidth",size:"offsetHeight",page:"pageY"}}_setInitialComponentDisplay(){const e=this;switch(e.scalePosition){case"near":e.$scaleNear.removeClass("smart-hidden"),e.$scaleFar.addClass("smart-hidden");break;case"far":e.$scaleNear.addClass("smart-hidden"),e.$scaleFar.removeClass("smart-hidden");break;case"both":e.$scaleFar.removeClass("smart-hidden"),e.$scaleNear.removeClass("smart-hidden");break;case"none":e.$scaleFar.addClass("smart-hidden"),e.$scaleNear.addClass("smart-hidden");}e.$tooltip.addClass("smart-hidden"),"track"===e.ticksPosition&&e.$trackTicksContainer.removeClass("smart-hidden")}_styleChangedHandler(){const e=this;return e._isVisible()?e._renderingSuspended?void e._createElement():void(e._renderingSuspended||(e._setTicksAndInterval(),e._moveThumbBasedOnValue(e._drawValue))):void(e._renderingSuspended=!0)}_validateInitialPropertyValues(){const e=this,a=typeof e.value===String?e.value.replace(/\s/g,""):e.value.toString().replace(/\s/g,"");"numeric"===e.mode&&e._numericProcessor.regexScientificNotation.test(a)&&(e.value=e._numericProcessor.scientificToDecimal(a),delete e._valueBeforeCoercion),e.significantDigits=null===e.significantDigits?null:Math.min(Math.max(e.significantDigits,1),21),null===e.significantDigits&&null===e.precisionDigits?e.significantDigits=8:null!==e.significantDigits&&null!==e.precisionDigits&&e.error(e.localize("significantPrecisionDigits",{elementType:e.nodeName.toLowerCase()})),e._validateMinMax("both",!0),e.showTooltip&&e.showThumbLabel&&(e.showTooltip=!1)}_validateMinMax(e,a,t){function i(e,t){r._numericProcessor.validateMinMax("min"===e||a,"max"===e||a);const i=r["_"+e+"Object"];let s="min"===e?0>=new Smart.Utilities.BigNumber(r.max).compare(i):0<new Smart.Utilities.BigNumber(r.min).compare(i);s?t?(r._numberRenderer=new Smart.Utilities.NumberRenderer(t),"min"===e?n=!1:o=!1,r[e]=t,r["_"+e+"Object"]=t):r.error(r.localize("invalidMinOrMax",{elementType:r.nodeName.toLowerCase(),property:e})):(r._numberRenderer=new Smart.Utilities.NumberRenderer(i),r[e]=r["_"+e+"Object"])}const r=this;let n="min"===e||"both"===e,o="max"===e||"both"===e;typeof a===void 0&&(a=!1),"both"===e?(i("min",t),i("max",t)):i(e,t),r.logarithmicScale?r._validateOnLogarithmicScale(n,o,t):(r._drawMin=r.min,r._drawMax=r.max),r.min=r.min.toString(),r.max=r.max.toString(),r._minObject=r._numericProcessor.createDescriptor(r.min),r._maxObject=r._numericProcessor.createDescriptor(r.max),"date"===r.mode&&(r._minDate=Smart.Utilities.DateTime.fromFullTimeStamp(r.min),r._maxDate=Smart.Utilities.DateTime.fromFullTimeStamp(r.max)),r._numericProcessor.validateInterval(r.interval),r.customInterval&&r._numericProcessor.validateCustomTicks()}_calculateTickInterval(){const e=this;let a=e._tickIntervalHandler.getInterval("linear",e._drawMin,e._drawMax,e.$.track,e.logarithmicScale);a.major===e._majorTicksInterval?e._intervalHasChanged=!0:(e._intervalHasChanged=!0,e._majorTicksInterval=a.major),e._minorTicksInterval=a.minor,"date"===e.mode&&e._calculateDateInterval(a.major)}_calculateDateInterval(e){const a=this,t={month:"2628000000000000000000000000000",day:"86400000000000000000000000000",hour:"3600000000000000000000000000",minute:"60000000000000000000000000",second:"1000000000000000000000000"};let i="year",r=new Smart.Utilities.BigNumber("31536000000000000000000000000000"),n=r.subtract(e).abs(),o=new Smart.Utilities.BigNumber(a.min).subtract(a.max).abs(),s=o.divide(e).toString();for(let a in 2>s&&(e=o.divide(3)),t)if(t.hasOwnProperty(a)){const o=new Smart.Utilities.BigNumber(t[a]),s=o.subtract(e).abs();if(-1===s.compare(n))i=a,r=o,n=s;else break}if("second"==i){if(a._numberRenderer.numericValue=parseFloat(e),1e3>a._numberRenderer.numericValue)return a._dateIncrementMethod="addYoctoseconds",void(a._dateIntervalNumber=1);let t=a._numberRenderer.toScientific(10);return t=t.charAt(t.length-1),a._dateIncrementMethod=a._unitToMethod[t],void(a._dateIntervalNumber=Math.pow(10,a._numericProcessor.prefixesToPowers[t]))}a._dateInterval=!0;const l=!a.customInterval;let c,d,m;switch(l&&(c=[new Smart.Utilities.BigNumber(a.min)],d=o.divide(r).toString(),m=Math.max(1,Math.floor(d/s))),i){case"year":if(l)for(let e=a._minDate.year()+m;e<a._maxDate.year();e+=m)c.push(new Smart.Utilities.BigNumber(new Smart.Utilities.DateTime(e,1,1).getTimeStamp()));a._dateIncrementMethod="addYears";break;case"month":if(l)for(let e=new Smart.Utilities.DateTime(a._minDate.year(),a._minDate.month()+m,1);-1===e.compare(a._maxDate);e.addMonths(m,!1))c.push(new Smart.Utilities.BigNumber(e.getTimeStamp()));a._dateIncrementMethod="addMonths";break;case"day":if(l)for(let e=new Smart.Utilities.DateTime(a._minDate.year(),a._minDate.month(),a._minDate.day()+m);-1===e.compare(a._maxDate);e.addDays(m,!1))c.push(new Smart.Utilities.BigNumber(e.getTimeStamp()));a._dateIncrementMethod="addDays",a._dateIntervalNumber=864e26;break;case"hour":if(l)for(let e=new Smart.Utilities.DateTime(a._minDate.year(),a._minDate.month(),a._minDate.day(),a._minDate.hour()+m);-1===e.compare(a._maxDate);e.addHours(m,!1))c.push(new Smart.Utilities.BigNumber(e.getTimeStamp()));a._dateIncrementMethod="addHours",a._dateIntervalNumber=36e26;break;case"minute":if(l)for(let e=new Smart.Utilities.DateTime(a._minDate.year(),a._minDate.month(),a._minDate.day(),a._minDate.hour(),a._minDate.minute()+m);-1===e.compare(a._maxDate);e.addMinutes(m,!1))c.push(new Smart.Utilities.BigNumber(e.getTimeStamp()));a._dateIncrementMethod="addMinutes",a._dateIntervalNumber=6e25;}l&&(-1===c[c.length-1].compare(a.max)&&c.push(new Smart.Utilities.BigNumber(a.max)),a.customTicks=c)}_formatNumber(e){var a=Math.round;const t=this;if("date"===t.mode){const a=Smart.Utilities.DateTime.fromFullTimeStamp(e);return a.toString(t.dateLabelFormatString)}const i=t._numberRenderer;let r=parseFloat(e);if(i.numericValue=e,t.scientificNotation)r=t._numberRenderer.toScientific(t.significantDigits,t.precisionDigits);else switch(t.scaleType){case"floatingPoint":r=t._applyDecimalSeparator(i.toDigits(t.significantDigits,t.precisionDigits));break;case"integer":r=i.isENotation(r)?a(i.largeExponentialToDecimal(r)):a(r),r=i.toDigits(t.significantDigits,0);}return r}_formatLabel(e,a){const t=this;let i;return t.labelFormatFunction&&("date"===t.mode&&(e=Smart.Utilities.DateTime.fromFullTimeStamp(e)),i=t.labelFormatFunction(e),void 0!==i&&""!==i)?i:(i=t._formatNumber(e),t._numberRenderer=new Smart.Utilities.NumberRenderer(i),t.showUnit&&(!1===a?i+=" "+t.unit:i+=" <span class=\"smart-unselectable\">"+t.unit+"</span>"),i)}_layout(){const e=this,a=e.$.container.style,t=e._tickIntervalHandler.labelsSize.minLabelSize/2+"px",i=e._tickIntervalHandler.labelsSize.maxLabelSize/2+"px";switch(e.orientation){case"horizontal":if("none"===e.scalePosition){a.paddingLeft="",a.paddingRight="";break}e.inverted?(a.paddingLeft=i,a.paddingRight=t):(a.paddingLeft=t,a.paddingRight=i);break;case"vertical":if("none"===e.scalePosition){a.paddingTop="",a.paddingBottom="";break}e.inverted?(a.paddingBottom=i,a.paddingTop=t):(a.paddingBottom=t,a.paddingTop=i);}e._measurements.trackLength=e.$.track[this._settings.clientSize]}_trackDownHandler(e){const a=this;a.disabled||a.readonly||("switchUntilReleased"===a.mechanicalAction&&(a._cachedValue={},a._cachedValue._number=a._number,a._cachedValue._drawValue=a._drawValue,a._cachedValue.value=a.value,a._valueDate&&(a._cachedValue._valueDate=a._valueDate)),a._getTrackStartAndEnd(),a._moveThumbBasedOnCoordinates(e,!0,"switchWhenReleased"!==a.mechanicalAction),a._thumbDragged=!0,a.$track.addClass("smart-dragged"),a.showTooltip&&a.$tooltip.removeClass("smart-hidden"))}_documentMoveHandler(e){const a=this;a._thumbDragged&&(e.preventDefault(),a._moveThumbBasedOnCoordinates(e,!0,"switchWhenReleased"!==a.mechanicalAction),a.$fill.addClass("disable-animation"))}_documentUpHandler(e){const a=this;if(a._thumbDragged){if("switchWhenReleased"===a.mechanicalAction)a._moveThumbBasedOnCoordinates(e,!0,!0);else if("switchUntilReleased"===a.mechanicalAction&&a._numericProcessor.compare(a._number,a._cachedValue._number)){const e=a._getEventValue();a._number=a._cachedValue._number,a._drawValue=a._cachedValue._drawValue,a._cachedValue._valueDate&&(a._valueDate=a._cachedValue._valueDate),a.value=a._cachedValue.value,a._moveThumbBasedOnValue(a._drawValue);const t=a._getEventValue();a.$.fireEvent("change",{value:t,oldValue:e}),a.$.hiddenInput.value=t}a.showTooltip&&a.$tooltip.addClass("smart-hidden"),a._thumbDragged=!1,a.$track.removeClass("smart-dragged"),a.$fill.removeClass("disable-animation")}}_selectStartHandler(e){const a=this;a._thumbDragged&&e.preventDefault()}_resizeHandler(){const e=this;return e._isVisible()?e._renderingSuspended?void e._createElement():void(e._renderingSuspended||(!0!==e._orientationChanged&&(e._setTicksAndInterval(),e._moveThumbBasedOnValue(e._drawValue)),e._trackChanged&&(e._measurements.trackLength=e.$.track[this._settings.clientSize],e._setTicksAndInterval(),e._moveThumbBasedOnValue(e._drawValue)),e._setTrackSize(),delete e._orientationChanged,delete e._trackChanged)):void(e._renderingSuspended=!0)}_moveThumbBasedOnCoordinates(e,a,t){var i=Math.min,r=Math.max;const n=this;let o=a?i(r(e[n._settings.page],n._trackStart),n._trackEnd):e[n._settings.page],s=n._numericProcessor.pxToValue(o);n.logarithmicScale?(n._drawValue=Math.log10(s),s=n._numericProcessor.getCoercedValue(n._drawValue)):(n._drawValue=s,s=n._numericProcessor.getCoercedValue(s)),o=i(r(n._numericProcessor.valueToPx(s)+n._trackStart,n._trackStart),n._trackEnd);const l=o-n._trackStart;n.updateFillSizeAndPosition(l,n._settings.margin,s,!0,t),e.originalEvent&&e.originalEvent.stopPropagation()}_moveThumbBasedOnValue(e){const a=this,t=a._numericProcessor.valueToPx(a._numericProcessor.getCoercedValue(e));a.updateFillSizeAndPosition(t,a._settings.margin,e,!0)}updateFillSizeAndPosition(e,a,t,i,r){const n=this,o=n.$.fill.style;if(n._normalLayout?o[n._settings.dimension]=e+"px":(o[n._settings.dimension]=Math.min(n._measurements.trackLength,Math.max(0,n._measurements.trackLength-e))+"px",o[a]=e+"px"),i){const e=n.value;delete n._valueBeforeCoercion,n._numericProcessor.updateToolTipAndValue(t,e,r)}}_updateTooltipValue(e){const a=this;e===void 0&&(e=a.value),a.logarithmicScale&&(e=Math.pow(10,e.toString())),e=a._formatLabel(e),a.$.tooltipContent.innerHTML=e,a.$.thumbLabel.innerHTML=e}_getSize(e,a){function t(e,a){const t=e.getElementsByClassName("smart-label");s=t[0],l=t[t.length-1];const i=window.getComputedStyle(t[0])[a];c+=parseFloat(i)}const i=this,r=window.getComputedStyle(i),n=window.getComputedStyle(i.$.track),o=i._trackSize+parseFloat(n[a.marginA])+parseFloat(n[a.marginB]);let s,l,c,d;switch(c=o,i.scalePosition){case"none":return c+=parseFloat(r[a.paddingA])+parseFloat(r[a.paddingB]),d="undefined"==typeof i._tankSizeBeforeOrientation?"horizontal"===i.orientation?parseFloat(n.width):parseFloat(n.height):"horizontal"===i.orientation?i._tankSizeBeforeOrientation.height:i._tankSizeBeforeOrientation.width,!0!==i._trackChanged&&(i._trackChanged=!0),{optimalSize:c,optimalOtherSize:d};case"near":c+=e,t(i.$.scaleNear,a.nearScaleDistance);break;case"far":c+=e,t(i.$.scaleFar,a.farScaleDistance);break;case"both":c+=2*e,t(i.$.scaleNear,a.nearScaleDistance),t(i.$.scaleFar,a.farScaleDistance);}let m,u,_;return c+=parseFloat(r[a.paddingA])+parseFloat(r[a.paddingB]),m=s.getBoundingClientRect(),u=l.getBoundingClientRect(),d=i[a.offset],_=m[a.distance]+s[a.offset]-u[a.distance],0<_&&(d=s[a.offset]+l[a.offset]),{optimalSize:c,optimalOtherSize:d}}_getRange(){const e=this;return e.logarithmicScale?void(e._range=e._drawMax-e._drawMin):void(e._range=new Smart.Utilities.BigNumber(e._drawMax).subtract(new Smart.Utilities.BigNumber(e._drawMin)).toString())}_getTrackStartAndEnd(){const e=this;let a,t=e.$.track.getBoundingClientRect();if("horizontal"===e.orientation){const e=document.body.scrollLeft||document.documentElement.scrollLeft;a=t.left+e}else{const e=document.body.scrollTop||document.documentElement.scrollTop;a=t.top+e}const i=a+e._measurements.trackLength,r=i-a;e._trackStart=a,e._trackEnd=i,e._valuePerPx=e._numericProcessor.getValuePerPx(e._range,r)}_updateScaleWidth(e){var a=Math.max;const t=this;let i="track"===t.ticksPosition?4:12;switch(t.labelsVisibility){case"all":e=t._numericProcessor._longestLabelSize;break;case"endPoints":e=a(t._tickIntervalHandler.labelsSize.minLabelOtherSize,t._tickIntervalHandler.labelsSize.maxLabelOtherSize);break;case"none":e=0;}let r=i+e,n=window.getComputedStyle(t.$.track),o=!!n.getPropertyValue("--smart-tank-scale-size");if(o)t.$.container.style.setProperty("--smart-tank-scale-size",r+"px");else{const e=window.getComputedStyle(t),i=t.$.scaleNear.style,o=t.$.scaleFar.style,s=t.$.track.style,l=parseFloat(n.getPropertyValue("min-width"));let c,d,m,u,_,g=parseFloat(n.getPropertyValue("outline-width"))||0,p=parseFloat(n.getPropertyValue("outline-offset"))||0,h=g+p;switch(t.orientation){case"horizontal":c="height",d="width",m=t.offsetHeight,_=parseFloat(e.getPropertyValue("padding-top"))+parseFloat(e.getPropertyValue("padding-bottom")),u=parseFloat(n.getPropertyValue("margin-top"))+parseFloat(n.getPropertyValue("margin-bottom"));break;case"vertical":c="width",d="height",m=t.offsetWidth,_=parseFloat(e.getPropertyValue("padding-left"))+parseFloat(e.getPropertyValue("padding-right")),u=parseFloat(n.getPropertyValue("margin-left"))+parseFloat(n.getPropertyValue("margin-right"));}switch(t.scalePosition){case"near":i.setProperty(c,r+"px"),s.setProperty(c,a(isNaN?0:l,m-_-r-4-u-h)+"px");break;case"far":o.setProperty(c,r+"px"),s.setProperty(c,a(isNaN?0:l,m-_-r-4-u-h)+"px");break;case"both":i.setProperty(c,r+"px"),o.setProperty(c,r+"px"),s.setProperty(c,a(isNaN?0:l,m-_-2*r-4-u-h)+"px");break;case"none":s.setProperty(c,"");}s.setProperty(d,"100%"),i.setProperty(d,"100%"),o.setProperty(d,"100%")}}_appendTicksAndLabelsToScales(e,a){function t(t){t.innerHTML=a,"scale"===i.ticksPosition&&(t.innerHTML+=e)}const i=this;switch(i.scalePosition){case"near":t(i.$.scaleNear);break;case"far":t(i.$.scaleFar);break;case"both":t(i.$.scaleNear),t(i.$.scaleFar);}"track"===i.ticksPosition&&(i.$.trackTicksContainer.innerHTML=e)}_discardDecimalSeparator(e,a){const t=this;if(void 0===a&&(a=t.decimalSeparator),"."!==a){let t=new RegExp(a,"g");return"string"==typeof e?e.replace(t,"."):e.toString().replace(t,".")}return e}_applyDecimalSeparator(e){const a=this;return"string"!=typeof e&&(e=e.toString()),"."!==a.decimalSeparator&&(e=e.replace(/\./g,a.decimalSeparator)),e}_validate(e,a,t){var i=Math.log10;const r=this;let n=e?r.value:a;let o,s;!0!==t&&r.coerce?(o=r._numericProcessor.createDescriptor(n,!0,!0,!0),o=r.logarithmicScale?Math.pow(10,r._numericProcessor.getCoercedValue(i(o))):r._numericProcessor.getCoercedValue(o),s=o):(o=r._numericProcessor.createDescriptor(n,!0,!0,!1),s=r._numericProcessor.validate(o,r._minObject,r._maxObject)),r._numericProcessor.regexScientificNotation.test(s)&&(s=r._numericProcessor.scientificToDecimal(s)),s=r._discardDecimalSeparator(s,r.decimalSeparator),e?(r._number=s,r._drawValue=r.logarithmicScale?i(s):s,"numeric"===r.mode?r.value=o.toString():(r._valueDate=Smart.Utilities.DateTime.fromFullTimeStamp(o),r.value=o),delete r._valueBeforeCoercion,r._moveThumbBasedOnValue(r._drawValue),r._programmaticValueIsSet=!1):r._numericProcessor.updateValue(o)}_changeScaleType(){const e=this;e._numericProcessor=new Smart.Utilities.NumericProcessor(e,"scaleType"),e._validateMinMax("both"),e._setTicksAndInterval(),e._scaleTypeChangedFlag=!0,e._validate(!0,e._number.toString()),e._scaleTypeChangedFlag=!1}_setTicksAndInterval(){const e=this;if(!e._isVisible()||e._renderingSuspended)return void(e._renderingSuspended=!0);let a=e._formatLabel(e.min),t=e._formatLabel(e.max);e._getRange(),e._tickIntervalHandler=new Smart.Utilities.TickIntervalHandler(e,a,t,"smart-label",e._settings.size,"integer"===e.scaleType,e.logarithmicScale),e._layout(),e.customInterval?("date"===e.mode&&e._calculateTickInterval(),e._intervalHasChanged=!0,e._numericProcessor.addCustomTicks()):(e._calculateTickInterval(),e._dateInterval?(e._intervalHasChanged=!0,e._numericProcessor.addCustomTicks()):e._numericProcessor.addTicksAndLabels())}_setFocusable(){const e=this;return e.disabled||e.unfocusable?void e.removeAttribute("tabindex"):void(e.tabIndex=0<e.tabIndex?e.tabIndex:0)}_keyIncrementDecrement(e,a){const t=this,i="add"===e?1:-1,r=void 0===a;if(r&&(a=t.logarithmicScale?new Smart.Utilities.BigNumber(t._drawValue):t._drawValue),t.customInterval&&t.coerce){r&&(t.logarithmicScale&&(a=t.value),"numeric"===t.mode&&(a=a.toString()));let n,o;"numeric"===t.mode?(n=-1===t.customTicks.indexOf(t.min)?[t.min].concat(t.customTicks):t.customTicks.slice(0),o=n.indexOf(a)):(n=-1===t.customTicks.findIndex(function(e){return 0===e.compare(t._drawMin)})?[t._drawMin].concat(t.customTicks):t.customTicks.slice(0),o=n.findIndex(function(e){return 0===e.compare(a)}));const s=n[o+1*i];return void 0===s?a===t.max&&"subtract"===e?n[n.length-2]:a:s}if("numeric"===t.mode){let i=t._numericProcessor.incrementDecrement(a,e,t._validInterval);return t.logarithmicScale&&(t._drawValue=i,i=Math.pow(10,Math.round(i))),i}return t._valueDate[t._dateIncrementMethod](i*parseFloat(t.interval),!1),t._drawValue=new Smart.Utilities.BigNumber(t._valueDate.getTimeStamp()),-1===t._drawValue.compare(t._drawMin)?new Smart.Utilities.BigNumber(t._drawMin):1===t._drawValue.compare(t._drawMax)?new Smart.Utilities.BigNumber(t._drawMax):t._drawValue}_keydownHandler(e){const a=this;if(a.disabled||a.readonly)return;const t=e.charCode?e.charCode:e.which;if(-1===[35,36,37,38,39,40].indexOf(t))return;const i=-1<[35,38,39].indexOf(t),r=-1<[36,37,40].indexOf(t);if(e.preventDefault(),"floatingPoint"!==a.scaleType){let e=new Smart.Utilities.BigNumber(a._drawValue);if(1!==e.compare(a._drawMin)&&r||-1!==e.compare(a._drawMax)&&i)return}else if(parseFloat(a.value)<=parseFloat(a.min)&&r||parseFloat(a.value)>=parseFloat(a.max)&&i)return;let n;return 40===t||37===t?n=a._keyIncrementDecrement("subtract"):38===t||39===t?n=a._keyIncrementDecrement("add"):36===t?(a._drawValue=a._drawMin,n=a.min):35===t?(a._drawValue=a._drawMax,n=a.max):void 0,a._validate(!1,n),!1}_setDrawVariables(){var e=Math.log10;const a=this;a.logarithmicScale?(a._drawValue=e(a.value),a._drawMin=e(a.min),a._drawMax=e(a.max)):(a._drawValue=a.value,a._drawMin=a.min,a._drawMax=a.max)}_validateOnLogarithmicScale(e,a){function t(e){return Math.pow(10,Math.round(i(e)-0.7403626894942439+.5))}var i=Math.log10;const r=this;if(e)if(0>=r.min)r.min=1,r._drawMin=0;else if(0!=i(r.min)%1){let e=t(parseFloat(r.min));e>r.min&&(e/=10),r._drawMin=i(r.min)}else r._drawMin=i(r.min);if(a)if(0>=r.max)r.max=1,r._drawMax=0;else if(0!=i(r.max)%1){let e=t(parseFloat(r.max));e<r.max&&(e*=10),r._drawMax=i(r.max)}else r._drawMax=i(r.max);"integer"===r.scaleType&&(0>r._drawMin&&(r._drawMin=0,r.min=1),0>r._drawMax&&(r._drawMax=1,r.max=10)),r._drawMax===r._drawMin&&(r._drawMax=r._drawMin+1)}_getLayoutType(){const e=this,a=e.orientation,t=e.inverted;e._normalLayout="horizontal"===a&&!t||"vertical"===a&&t}_trackOnMouseEnterHandler(){const e=this;e.readonly||e.disabled||e.$track.addClass("track-hovered")}_trackOnMouseLeaveHandler(){const e=this;e.readonly||e.disabled||e.$track.removeClass("track-hovered")}_isVisible(){const e=this;return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}_coerceCustomInterval(){const e=this;if(e.coerce){const a=e._valueBeforeCoercion,t=e.logarithmicScale?Math.pow(10,e._numericProcessor.getCoercedValue(Math.log10(e.value))):e._numericProcessor.getCoercedValue(e.value);e._validate(!1,t,!0),e._valueBeforeCoercion=a}}_handleDateScale(){const e=this,a=Smart.Utilities.DateTime;a||e.error(e.localize("missingReference",{elementType:e.nodeName.toLowerCase(),files:"smart.date.js"})),e._customTicks=e.customTicks,e._unitToMethod={Y:"addSeconds",Z:"addMilliseconds",E:"addMicroseconds",P:"addNanoseconds",T:"addPicoseconds",G:"addFemtoseconds",M:"addAttoseconds",k:"addZeptoseconds"},e._minDate=a.validateDate(e.min),e.min=e._minDate.getTimeStamp(),e._maxDate=a.validateDate(e.max),e.max=e._maxDate.getTimeStamp(),e.rangeSlider||(e._valueDate=a.validateDate(e.value),e.value=e._valueDate.getTimeStamp()),e._properties.min.serialize="_serializeMin",e._properties.max.serialize="_serializeMax",e._properties.value.serialize="_serializeValue",e.scaleType="integer",e.logarithmicScale=!1,e.wordLength="uint64";const t=["min","max","value"];for(let a=0;a<t.length;a++){const i=t[a];Object.defineProperty(e,i,{get:function(){return e.context===e?e.properties[i].value:e["_"+i+"Date"]},set(a){e.updateProperty(e,e._properties[i],a)}})}e._getEventValue=function(){return e._valueDate.clone()}}_serializeMin(){return this._minDate.toString()}_serializeMax(){return this._maxDate.toString()}_serializeValue(){return this._valueDate.toString()}});