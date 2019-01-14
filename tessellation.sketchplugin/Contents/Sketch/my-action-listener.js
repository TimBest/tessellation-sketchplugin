var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/my-action-listener.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/my-action-listener.js":
/*!***********************************!*\
  !*** ./src/my-action-listener.js ***!
  \***********************************/
/*! exports provided: onActionHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onActionHandler", function() { return onActionHandler; });
var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

function MSRectToSVGCommands(rect) {
  var x = rect.x();
  var y = rect.y();
  var w = rect.width();
  var h = rect.height();
  return "M ".concat(x, " ").concat(y, " h ").concat(w, " v ").concat(h, " H ").concat(x, " z");
}

function squarePath(svgPath) {
  var name = 'boundingbox';
  var bezierPath = Utils.svgPathToBezierPath(svgPath).path;
  var shape = MSShapeGroup.shapeWithBezierPath(bezierPath);
  shape.setName(name); // `0` constant indicates that we need a `fill` part to be created

  var fill = shape.style().addStylePartOfType(0);
  fill.color = MSColor.colorWithRGBADictionary({
    r: 0,
    g: 0.8,
    b: 0.4,
    a: 1
  });
  return shape;
}

function onActionHandler(context) {
  var oldSelection = context.actionContext.oldSelection;
  var name = oldSelection[0].name();

  if (name != 'testName') {
    // if name is in -> Settings.settingForKey('tesselations')
    return;
  } // var triangle = Utils.svgPathToBezierPath("M0,0L90 100 0 100z").path;
  // oldSelection[0].setName('trianlge');


  var newPath = oldSelection[0].bezierPath().svgPathAttribute();
  var oldPath = Settings.settingForKey('tesselations').path;

  if (newPath == oldPath) {
    return;
  }

  var boundingBox = MSRectToSVGCommands(oldSelection[0].frame());
  var currentParentGroup = Utils.getParentGroup(context.actionContext.document); // removeLayer

  currentParentGroup.addLayers([squarePath(boundingBox)]);
  currentParentGroup.removeLayer(oldPath[0]); // UI.alert("title", shape);
  // var document = Document.getSelectedDocument();
  // var layers = document.getLayersNamed(name);
  // UI.alert("layers", layers[0]);
  // check if layers is length 1 and that selection is a tesselation layer
  // upldae layer with changes so that it can tessellate
  // context.actionContext.document.showMessage('edit?')
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: svgPathToBezierPath, getParentGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgPathToBezierPath", function() { return svgPathToBezierPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParentGroup", function() { return getParentGroup; });
function svgPathToBezierPath(svgPath) {
  var isClosedPtr = MOPointer.alloc().init();
  var path = SVGPathInterpreter.bezierPathFromCommands_isPathClosed(svgPath, isClosedPtr);
  return {
    path: path,
    isClosed: isClosedPtr.value()
  };
}
function getParentGroup(document) {
  var documentData = document.documentData();
  return documentData.currentPage().currentArtboard() || documentData.currentPage();
}

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onActionHandler'] = __skpm_run.bind(this, 'onActionHandler');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=my-action-listener.js.map