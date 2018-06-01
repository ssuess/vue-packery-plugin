'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.packeryEvents=void 0;var _vue=require('vue'),_vue2=_interopRequireDefault(_vue);require('packery/dist/packery');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var ADD='itemAdded',CHANGE='itemChange',REMOVE='itemRemoved',LAYOUT='layout',packeryPlugin=function(){};exports.default=packeryPlugin;var packeryEvents=exports.packeryEvents=new _vue2.default({});function CustomEvent(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent('CustomEvent');return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent,packeryPlugin.install=function(a){a.directive('packery',{bind:function bind(c,d,e){var f=null;c.packery=new Packery(c,d.value);var g=function(j){c.packery&&c.isSameNode(j)&&a.nextTick(function(){c.packery.reloadItems(),c.packery.layout()})},h=function(j,k){return e.componentInstance?void e.componentInstance.$emit(j,k):void e.elm.dispatchEvent(new CustomEvent(j,k))};c.packery.on('layoutComplete',function(j,k){h('layoutComplete',{event:j,laidOutItems:k})}),c.packery.on('dragItemPositioned',function(j,k){h('dragItemPositioned',{event:j,draggedItem:k})}),c.packery.on('fitComplete',function(j,k){h('fitComplete',{event:j,item:k})});var i=function(j){clearTimeout(f),f=setTimeout(function(){g(j)},1)};packeryEvents.$on(ADD,function(j){i(j)}),packeryEvents.$on(CHANGE,function(j){i(j)}),packeryEvents.$on(REMOVE,function(j){i(j)}),packeryEvents.$on(LAYOUT,function(j){i(j)})},unbind:function unbind(c){var d=setInterval(function(){document.body.contains(c)||(c.packery.destroy(),c.packery=null,clearTimeout(d))},1e3)}}),a.directive('packeryItem',{inserted:function inserted(c){c.packeryNode=c.parentNode,packeryEvents.$emit(ADD,c.packeryNode)},componentUpdated:function componentUpdated(c){packeryEvents.$emit(CHANGE,c.packeryNode)},unbind:function unbind(c){packeryEvents.$emit(REMOVE,c.packeryNode)}})};
