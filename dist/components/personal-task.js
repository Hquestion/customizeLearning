"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),_wepy=require("./../npm/wepy/lib/wepy.js"),_wepy2=_interopRequireDefault(_wepy),_richButton=require("./rich-button.js"),_richButton2=_interopRequireDefault(_richButton),PersonalTask=function(t){function e(){var t,n,o,r;_classCallCheck(this,e);for(var i=arguments.length,u=Array(i),a=0;a<i;a++)u[a]=arguments[a];return n=o=_possibleConstructorReturn(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(u))),o.data={bTheme:"blue"},o.props={taskInfo:{},theme:{default:"male"}},o.$repeat={},o.$props={"rich-button1":{size:"middle",text:"继续课程","xmlns:v-bind":"","v-bind:theme.sync":"bTheme","xmlns:v-on":""},"rich-button2":{size:"middle",text:"已暂停，点击启动",theme:"grey"}},o.$events={"rich-button1":{"v-on:tap":"onTapCoutinue"},"rich-button2":{"v-on:tap":"onTapStart"}},o.components={"rich-button1":_richButton2.default,"rich-button2":_richButton2.default},o.methods={onTapStart:function(){this.$emit("restart",this.taskInfo)},onTapCoutinue:function(){this.$emit("continue",this.taskInfo)},reviewTask:function(){0!==this.taskInfo.Status&&this.$emit("review",this.taskInfo)}},o.watch={theme:function(t){this.bTheme="male"===t?"blue":"red",this.$apply()}},r=n,_possibleConstructorReturn(o,r)}return _inherits(e,t),_createClass(e,[{key:"onLoad",value:function(){}}]),e}(_wepy2.default.component);exports.default=PersonalTask;