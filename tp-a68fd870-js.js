(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tp-a68fd870-js"],{

/***/ "XlPe":
/*!**********************************************************!*\
  !*** ./node_modules/bnc-onboard/dist/esm/tp-a68fd870.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _content_612bd04b_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content-612bd04b.js */ "zfVJ");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var img = "data:image/png;base64,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";
var img$1 = "data:image/png;base64,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";

function tp(options) {
  var preferred = options.preferred,
      label = options.label,
      iconSrc = options.iconSrc,
      svg = options.svg;
  return {
    name: label || 'tp',
    iconSrc: iconSrc || img,
    iconSrcSet: iconSrc || img$1,
    svg: svg,
    wallet: function () {
      var _wallet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(helpers) {
        var getProviderName, createModernProviderInterface, provider;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                getProviderName = helpers.getProviderName, createModernProviderInterface = helpers.createModernProviderInterface;
                provider = window.ethereum || window.web3 && window.web3.currentProvider;
                return _context.abrupt("return", {
                  provider: provider,
                  "interface": getProviderName(provider) === 'tp' && createModernProviderInterface(provider) || null
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function wallet(_x) {
        return _wallet.apply(this, arguments);
      }

      return wallet;
    }(),
    type: 'injected',
    link: 'https://tokenpocket.jp',
    installMessage: _content_612bd04b_js__WEBPACK_IMPORTED_MODULE_0__["m"],
    mobile: true,
    preferred: preferred
  };
}

/* harmony default export */ __webpack_exports__["default"] = (tp);

/***/ })

}]);
//# sourceMappingURL=tp-a68fd870-js.js.map