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
})({"myFunc.js":[function(require,module,exports) {
(function ($) {
  $.fn.Slider = function (options) {
    var defaults = {
      minPos: 10,
      maxPos: 100,
      step: 2,
      output: false,
      input: true,
      doublerange: false
    };
    var config = $.extend({}, defaults, options);
    var output = config.output;
    var input = config.input;
    var doublerange = config.doublerange;
    var vertical = config.vertical;
    var toggle, toggle2, toggle2Y, output1, output2, input2, input1, bar, barY, barWidth, barHeight, toggleWidth2;
    var $this = $(this);
    var view = {
      init: function init() {
        if (vertical) {
          $this.removeClass("slider").addClass("sliderY");
          $(".slider__bar", $this).removeClass("slider__bar").addClass("slider__barY");
          $(".slider__output", $this).removeClass("slider__output").addClass("slider__outputY");
          $(".slider__output2", $this).removeClass("slider__output2").addClass("slider__output2Y");
          $(".slider__toggle2", $this).removeClass("slider__toggle2").addClass("slider__toggle2Y");
        }

        bar = $(".slider__bar", $this);
        toggle = $(".slider__toggle", $this);
        toggle2 = $(".slider__toggle2", $this);
        input1 = $(".slider__input", $this);
        input2 = $(".slider__input2", $this);
        output1 = $(".slider__output", $this);
        output2 = $(".slider__output2", $this);
        barY = $(".slider__barY", $this);
        toggle2Y = $(".slider__toggle2Y");
        barHeight = barY.outerHeight();
        barWidth = bar.outerWidth();
        toggleWidth2 = toggle.outerWidth();
        output1.text(config.minPos);
        output2.text(config.maxPos);
        output2.css("marginLeft", barWidth - toggleWidth2);
        input1.val(config.minPos);
        input2.val(config.maxPos);
        controller.control();
      }
    };
    var controller = {
      control: function control() {
        toggle.on("mousedown", function () {
          toggle.on("dragstart", function (e) {
            e.preventDefault();
          });
          $(document).on("mousemove", model.moveThumb);
          $(document).on("mouseup", model.onThumbMouseup);
        });
        toggle2.on("mousedown", function () {
          toggle2.on("dragstart", function (e) {
            e.preventDefault();
          });
          $(document).on("mousemove", model.moveThumb2);
          $(document).on("mouseup", model.onThumbMouseup2);
        });
        toggle2Y.on("mousedown", function () {
          toggle2Y.on("dragstart", function (e) {
            e.preventDefault();
          });
          $(document).on("mousemove", model.moveThumb2);
          $(document).on("mouseup", model.onThumbMouseup2);
        });
        input1.on("change", model.changeInput);
        input2.on("change", model.changeInput2);
      }
    };

    if (output) {
      $("<div/>", {
        text: "",
        class: "slider__output"
      }).appendTo($this);
    }

    if (doublerange) {
      $("<div/>", {
        class: "slider__toggle2"
      }).appendTo($this);
    }

    if (output && doublerange) {
      $("<div/>", {
        text: "",
        class: "slider__output2"
      }).css("marginLeft", barWidth - toggleWidth2 + 10).appendTo($this);
    }

    if (input) {
      $("<input/>", {
        type: "number",
        class: "slider__input",
        min: 0,
        max: config.maxPos
      }).appendTo($this);
    }

    if (input && doublerange) {
      $("<input/>", {
        type: "number",
        class: "slider__input2",
        min: 0,
        max: config.maxPos
      }).appendTo($this);
    }

    var LimitMovementX, LimitMovementY, toggleHeight;
    var model = {
      moveThumb: function moveThumb(event) {
        if (vertical) {
          var _barY = $(".slider__barY", $this);

          var outputY = $(".slider__outputY");

          var barTop = _barY.offset().top;

          toggleHeight = toggle.outerHeight();
          LimitMovementY = {
            min: barTop,
            max: barTop + barHeight - toggleHeight
          };
          var thumbCoordY = event.pageY;

          if (thumbCoordY < LimitMovementY.min) {
            thumbCoordY = LimitMovementY.min;
          }

          if (thumbCoordY > LimitMovementY.max) {
            thumbCoordY = LimitMovementY.max;
          }

          var stepCountY = (config.maxPos - config.minPos) / config.step;
          var stepSizeY = (barHeight - toggleHeight) / stepCountY;
          var newthumbCoordY = thumbCoordY - barTop;
          var leftPosY = Math.round(newthumbCoordY / stepSizeY * stepSizeY);
          var fffY = Math.round(leftPosY / stepSizeY);
          toggle.css("top", leftPosY);
          outputY.css("marginTop", leftPosY - barHeight);
          outputY.text(Math.round(fffY * config.step + config.minPos));
          input1.val(Math.round(fffY * config.step + config.minPos));
        } else {
          var barLeft = bar.offset().left;
          var toggleWidth = toggle.outerWidth();
          LimitMovementX = {
            min: barLeft,
            max: barLeft + barWidth - toggleWidth
          };
          thumbCoord = event.pageX;

          if (thumbCoord < LimitMovementX.min) {
            thumbCoord = LimitMovementX.min;
          }

          if (thumbCoord > LimitMovementX.max) {
            thumbCoord = LimitMovementX.max;
          }

          var stepCount = (config.maxPos - config.minPos) / config.step;
          var stepSize = (barWidth - toggleWidth) / stepCount;
          var newthumbCoord = thumbCoord - barLeft;
          var leftPos = Math.round(newthumbCoord / stepSize) * stepSize;
          var fff = leftPos / stepSize;
          toggle.css("left", leftPos);
          output1.css("marginLeft", leftPos);
          output1.text(Math.round(fff * config.step + config.minPos));
          input1.val(Math.round(leftPos / stepSize * config.step + config.minPos));
        }
      },
      changeInput: function changeInput() {
        if (vertical) {
          var outputY = $(".slider__outputY");
          var stepCountY = (config.maxPos - config.minPos) / config.step;
          toggleHeight = toggle.outerHeight();
          var stepSizeY = (barHeight - toggleHeight) / stepCountY;
          var inputValue = $(".slider__input", $this).val();
          var togglePosition = inputValue / config.step * stepSizeY + config.minPos;
          toggle.css("top", togglePosition);
          var fff = togglePosition / stepSizeY;
          outputY.css("marginTop", togglePosition - barHeight);
          outputY.text(Math.round(fff * config.step + config.minPos));
        } else {
          var toggleWidth = toggle.outerWidth();
          var stepCount = (config.maxPos - config.minPos) / config.step;
          var stepSize = (barWidth - toggleWidth) / stepCount;
          var inputValue = $(".slider__input", $this).val();
          var togglePosition = inputValue / config.step * stepSize + config.minPos;
          toggle.css("left", togglePosition);

          var _fff = Math.round(togglePosition / stepSize);

          output1.css("marginLeft", togglePosition);
          output1.text(Math.round(_fff * config.step + config.minPos));
        }
      },
      onThumbMouseup: function onThumbMouseup() {
        $(document).off("mousemove");
        $(document).off("mouseup");
      },
      moveThumb2: function moveThumb2(event) {
        if (vertical) {
          var _toggle2Y = $(".slider__toggle2Y");

          var _barY2 = $(".slider__barY", $this);

          var output2Y = $(".slider__output2Y", $this);

          var barTop = _barY2.offset().top;

          var toggleHeight2 = _toggle2Y.outerHeight();

          LimitMovementY = {
            min: barTop,
            max: barTop + barHeight - toggleHeight2
          };
          var thumbCoordY2 = event.pageY;

          if (thumbCoordY2 < LimitMovementY.min) {
            thumbCoordY2 = LimitMovementY.min;
          }

          if (thumbCoordY2 > LimitMovementY.max) {
            thumbCoordY2 = LimitMovementY.max;
          }

          var stepCountY2 = (config.maxPos - config.minPos) / config.step;
          var stepSizeY2 = (barHeight - toggleHeight2) / stepCountY2;
          var newthumbCoordY2 = thumbCoordY2 - barTop;
          var leftPosY2 = Math.round(newthumbCoordY2 / stepSizeY2 * stepSizeY2);
          var fffY2 = Math.round(leftPosY2 / stepSizeY2);

          _toggle2Y.css("top", leftPosY2);

          output2Y.css("marginTop", leftPosY2 - barHeight);
          output2Y.text(Math.round(fffY2 * config.step + config.minPos));
          input2.val(Math.round(fffY2 * config.step + config.minPos));
        } else {
          var barLeft = bar.offset().left;

          var _toggleWidth = toggle2.outerWidth();

          LimitMovementX = {
            min2: barLeft,
            max2: barLeft + barWidth - _toggleWidth
          };
          thumbCoord2 = event.pageX;

          if (thumbCoord2 < LimitMovementX.min2) {
            thumbCoord2 = LimitMovementX.min2;
          }

          if (thumbCoord2 > LimitMovementX.max2) {
            thumbCoord2 = LimitMovementX.max2;
          }

          var stepCount2 = (config.maxPos - config.minPos) / config.step;
          var stepSize2 = (barWidth - _toggleWidth) / stepCount2;
          var newthumbCoord2 = thumbCoord2 - barLeft;
          var leftPos2 = Math.round(newthumbCoord2 / stepSize2) * stepSize2;
          var fff = leftPos2 / stepSize2;
          toggle2.css("left", leftPos2);
          output2.css("marginLeft", leftPos2);
          output2.text(Math.round(fff * config.step + config.minPos));
          input2.val(Math.round(fff * config.step + config.minPos));
        }
      },
      changeInput2: function changeInput2() {
        if (vertical) {
          var output2Y = $(".slider__output2Y");

          var _toggle2Y2 = $(".slider__toggle2Y");

          var stepCountY2 = (config.maxPos - config.minPos) / config.step;
          var toggleHeight2 = toggle.outerHeight();
          var stepSizeY2 = (barHeight - toggleHeight2) / stepCountY2;
          var inputValue2 = $(".slider__input2", $this).val();
          var togglePosition2 = inputValue2 / config.step * stepSizeY2 - config.minPos;
          var fff = togglePosition2 / stepSizeY2;

          _toggle2Y2.css("top", togglePosition2);

          output2Y.css("marginTop", togglePosition2 - barHeight);
          output2Y.text(Math.round(fff * config.step + config.minPos));
        } else {
          var toggleWidth2 = toggle.outerWidth();
          var stepCount2 = (config.maxPos - config.minPos) / config.step;
          var stepSize2 = (barWidth - toggleWidth2) / stepCount2;
          var inputValue2 = $(".slider__input2", $this).val();
          var togglePosition2 = inputValue2 / config.step * stepSize2 - config.minPos;
          toggle2.css("left", togglePosition2);
          output2.css("marginLeft", togglePosition2);
          var fffY2 = Math.round(togglePosition2 / stepSize2);
          output2.text(Math.round(fffY2 * config.step + config.minPos));
        }

        console.log(2);
      },
      onThumbMouseup2: function onThumbMouseup2() {
        $(document).off("mousemove");
        $(document).off("mouseup");
      }
    };
    view.init();
    return this;
  };
})(jQuery);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53247" + '/');

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
      }); // Enable HMR for CSS by default.

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
      } else {
        window.location.reload();
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","myFunc.js"], null)
//# sourceMappingURL=/myFunc.js.map