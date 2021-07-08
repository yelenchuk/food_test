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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/elenchuk/Desktop/projects_tat/Food/src/js/main.js: Unexpected token (334:0)\n\n\u001b[0m \u001b[90m 332 | \u001b[39m\u001b[90m//     .then((json) => console.log(json));\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 333 | \u001b[39m\u001b[90m// });\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 334 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n    at Parser._raise (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:742:17)\n    at Parser.raiseWithData (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:735:17)\n    at Parser.raise (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:729:17)\n    at Parser.unexpected (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:8757:16)\n    at Parser.parseExprAtom (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:10052:20)\n    at Parser.parseExprSubscripts (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:9602:23)\n    at Parser.parseMaybeUnary (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:9582:21)\n    at Parser.parseExprOps (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:9452:23)\n    at Parser.parseMaybeConditional (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:9425:23)\n    at Parser.parseMaybeAssign (/Users/elenchuk/Desktop/projects_tat/Food/node_modules/@babel/parser/lib/index.js:9380:21)");

/***/ })

/******/ });
//# sourceMappingURL=script.js.map