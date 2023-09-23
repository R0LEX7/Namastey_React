// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/images/dummy.png":[function(require,module,exports) {
module.exports = "/dummy.85b8644c.png";
},{}],"Components/Pages/MenuItems.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ai = require("react-icons/ai");
var _config = require("../../Config/config");
var _dummy = _interopRequireDefault(require("../../assets/images/dummy.png"));
var _app = _interopRequireDefault(require("firebase/app"));
var _database = require("firebase/database");
var _auth = require("firebase/auth");
var _Snackbar = _interopRequireDefault(require("@mui/material/Snackbar"));
var _SnackbarAlert = require("../../Alerts/SnackbarAlert");
var _firebaseConfig = require("../../Config/firebase-config");
var _CartContext = _interopRequireDefault(require("../../Context/CartContext"));
var _reactShimmer = require("react-shimmer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // import userContext from "./utils/userContext";
var MenuItems = function MenuItems(props) {
  var _ratings$aggregatedRa;
  var _useContext = (0, _react.useContext)(_CartContext.default),
    cartItems = _useContext.cartItems;
  var isItemAlreadyAdded = function isItemAlreadyAdded(name) {
    var matchingItems = cartItems.filter(function (item) {
      return item === null || item === void 0 ? void 0 : item.name.toLowerCase().includes(name.toLowerCase());
    });
    return matchingItems.length > 0;
  };
  var _props$menuItem = props.menuItem,
    name = _props$menuItem.name,
    description = _props$menuItem.description,
    price = _props$menuItem.price,
    category = _props$menuItem.category,
    imageId = _props$menuItem.imageId,
    inStock = _props$menuItem.inStock,
    isVeg = _props$menuItem.isVeg,
    ratings = _props$menuItem.ratings;
  var newRating = ratings === null || ratings === void 0 || (_ratings$aggregatedRa = ratings.aggregatedRating) === null || _ratings$aggregatedRa === void 0 ? void 0 : _ratings$aggregatedRa.rating;
  var newPrice = price / 100;

  /* setting toast */
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0, _react.useState)("success"),
    _useState4 = _slicedToArray(_useState3, 2),
    alertSeverity = _useState4[0],
    setAlertSeverity = _useState4[1];
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    alertMessage = _useState6[0],
    setAlertMessage = _useState6[1];
  var handleClick = function handleClick(severity, message) {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setOpen(true);
  };
  var handleClose = function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  /* setting user */

  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    user = _useState8[0],
    setUser = _useState8[1];
  (0, _react.useEffect)(function () {
    (0, _auth.onAuthStateChanged)(_firebaseConfig.auth, function (user) {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  var addItemToCart = function addItemToCart() {
    if (user === null) {
      handleClick("info", "Please Login for add to cart");
      return;
    } else {
      if (isItemAlreadyAdded(name)) {
        handleClick("warning", "Item already added to cart;");
        return;
      }
      var db = (0, _database.getDatabase)();
      var newItem = {
        name: name,
        price: newPrice,
        quantity: 1,
        rating: ratings || 0,
        imageId: imageId || "",
        isVeg: isVeg || false
      };
      var cartRef = (0, _database.ref)(db, "carts/".concat(user.uid, "/"));
      try {
        // Use push to add a new item to the user's cart
        var newItemRef = (0, _database.push)(cartRef, newItem);
        handleClick("success", "Item added to cart successfully");
      } catch (error) {
        handleClick("error", "An error occurred while adding the item to the cart");
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-Card"
  }, /*#__PURE__*/_react.default.createElement(_reactShimmer.Image, {
    src: imageId ? _config.ITEM_IMG_CDN_URL + imageId : _dummy.default,
    alt: imageId,
    fallback: /*#__PURE__*/_react.default.createElement(_reactShimmer.Shimmer, {
      width: 210,
      height: 120
    }),
    fadeIn: true
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/_react.default.createElement("h3", null, name), /*#__PURE__*/_react.default.createElement("h5", null, description), /*#__PURE__*/_react.default.createElement("div", {
    className: "details"
  }, /*#__PURE__*/_react.default.createElement("h4", null, "Category: "), /*#__PURE__*/_react.default.createElement("h4", null, isVeg ? "🟢Veg" : "🔴Non-Veg"), /*#__PURE__*/_react.default.createElement("h4", null, category)), /*#__PURE__*/_react.default.createElement("div", {
    className: "details"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: newRating > 3.8 ? "green" : "red"
  }, /*#__PURE__*/_react.default.createElement(_ai.AiFillStar, null), newRating ? newRating : "NA"), /*#__PURE__*/_react.default.createElement("h3", null, " ", price ? "₹" + newPrice + ".00" : "Not available"), price && /*#__PURE__*/_react.default.createElement("button", {
    onClick: addItemToCart
  }, " Add"))), /*#__PURE__*/_react.default.createElement(_Snackbar.default, {
    open: open,
    autoHideDuration: 3000,
    onClose: handleClose,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center"
    }
  }, /*#__PURE__*/_react.default.createElement(_SnackbarAlert.Alert, {
    onClose: handleClose,
    severity: alertSeverity,
    sx: {
      width: "100%"
    }
  }, alertMessage))));
};
var _default = MenuItems;
exports.default = _default;
},{"react":"node_modules/react/index.js","react-icons/ai":"node_modules/react-icons/ai/index.esm.js","../../Config/config":"Config/config.js","../../assets/images/dummy.png":"assets/images/dummy.png","firebase/app":"node_modules/firebase/app/dist/esm/index.esm.js","firebase/database":"node_modules/firebase/database/dist/esm/index.esm.js","firebase/auth":"node_modules/firebase/auth/dist/esm/index.esm.js","@mui/material/Snackbar":"node_modules/@mui/material/Snackbar/index.js","../../Alerts/SnackbarAlert":"Alerts/SnackbarAlert.js","../../Config/firebase-config":"Config/firebase-config.js","../../Context/CartContext":"Context/CartContext.js","react-shimmer":"node_modules/react-shimmer/dist/react-shimmer.esm.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6200" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/MenuItems.b79a71d2.js.map