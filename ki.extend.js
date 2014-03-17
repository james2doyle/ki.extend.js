/*!
 * ki.extend.js
 * extend ki.js with jQuery style prototypes
 * @author James Doyle (james2doyle)
 * @license MIT
 * Resource for prototypes
 * http://youmightnotneedjquery.com/
 */

(function() {

// map some classlist functions to the jQuery counterpart
var props = ['addClass', 'removeClass', 'toggleClass'],
maps = ['add', 'remove', 'toggle'];

props.forEach(function(prop, index) {
  $.prototype[prop] = function(a) {
    return this.each(function(b) {
      b.classList[maps[index]](a);
    });
  };
});

$.prototype.hasClass = function(a) {
  return this[0].classList.contains(a);
};

$.prototype.append = function(a) {
  return this.each(function(b) {
    b.parentNode.appendChild(a);
  });
};

$.prototype.prepend = function(a) {
  return this.each(function(b) {
    b.parentNode.insertBefore(a, b.parentNode.firstChild);
  });
};

$.prototype.attr = function(a, b) {
  return b === []._ ? this[0].getAttribute(a) : this.each(function(c) {
    c.setAttribute(a, b);
  });
};

$.prototype.removeAttr = function(a) {
  return this.each(function(b) {
    b.removeAttribute(a);
  });
};

$.prototype.hasAttr = function(a) {
  return this[0].hasAttribute(a);
};

$.prototype.before = function(a) {
  return this.each(function(b) {
    b.insertAdjacentHTML('beforebegin', a);
  });
};

$.prototype.after = function(a) {
  return this.each(function(b) {
    b.insertAdjacentHTML('afterend', a);
  });
};

$.prototype.css = function(a, b) {
  return b === []._ ? this[0].style[a] : this.each(function(c) {
    c.style[a] = b;
  });
};

$.prototype.first = function() {
  return $(this[0]);
};

$.prototype.last = function() {
  return $(this[this.length - 1]);
};

$.prototype.get = function(a) {
  return $(this[a]);
};

$.prototype.text = function(a) {
  return a === []._ ? this[0].textContent : this.each(function(b) {
    b.textContent = a;
  });
};

$.prototype.html = function(a) {
  return a === []._ ? this[0].innerHTML : this.each(function(b) {
    b.innerHTML = a;
  });
};

$.prototype.parent = function() {
  return (this.length < 2) ? $(this[0].parentNode): [];
};

$.prototype.remove = function() {
  return this.each(function(b) {
    b.parentNode.removeChild(b);
  });
};

$.trim = function(a) {
  return a.replace(/^\s+|\s+$/g, '');
};

$.prototype.trigger = function(a) {
  if (document.createEvent) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(a, true, false);
    this.each(function(b) {
      b.dispatchEvent(event);
    });
  } else {
    this.each(function(b) {
      b.fireEvent('on' + a);
    });
  }
};

$.prototype.is = function(a) {
  var m = (this[0].matches || this[0].matchesSelector || this[0].msMatchesSelector || this[0].mozMatchesSelector || this[0].webkitMatchesSelector || this[0].oMatchesSelector);
  if (m) {
    return m.call(this[0], a);
  } else {
    var n = this[0].parentNode.querySelectorAll(a);
    for (var i = n.length; i--;) {
      if (n[i] === this[0]) {
        return true;
      }
      return false;
    }
  }
};

$.map = function(arr, fn) {
  var results = [];
  var i = 0, l = arr.length;
  for(; i < l; ++i) {
    results.push(fn(arr[i], i));
  }
  return results;
};

$.stop = function(e) {
  if (!e.preventDefault) {
    e.returnValue = false;
  } else {
    e.preventDefault();
  }
};

$.param = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
    str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
};

$.ajax = function(a, b, c, d) {
  var xhr = new XMLHttpRequest();
  // 1 == post, 0 == get
  var type = (typeof(b) === 'object') ? 1: 0;
  var gp = ['GET', 'POST'];
  xhr.open(gp[type], a, true);
  xhr.responseType = (typeof(c) === 'string') ? c: '';
  var cb = (!type) ? b: c;
  xhr.onerror = function() {
    cb(this, true);
  };
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400){
        cb(this.response, false);
      } else {
        cb(this, true);
      }
    }
  };
  if (type) {
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send($.param(b));
  } else {
    xhr.send();
  }
  xhr = null;
};

/**
 * Deferred and When for ki.js by James Doyle (james2doyle)
 * ---
 * ki.js homepage https://github.com/dciccale/ki.js
 * Almost a straigh copy from
 * https://github.com/warpdesign/deferred-js by Nicolas Ramz
 */
(function(ki) {
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }

  function foreach(arr, handler) {
    if (isArray(arr)) {
      for (var i = 0; i < arr.length; i++) {
        handler(arr[i]);
      }
    } else
      handler(arr);
  }

  function D(fn) {
    var status = 'pending',
      doneFuncs = [],
      failFuncs = [],
      progressFuncs = [],
      resultArgs = [],

      promise = {
        done: function() {
          for (var i = 0; i < arguments.length; i++) {
            // skip any undefined or null arguments
            if (!arguments[i]) {
              continue;
            }

            if (isArray(arguments[i])) {
              var arr = arguments[i];
              for (var j = 0; j < arr.length; j++) {
                // immediately call the function if the deferred has been resolved
                if (status === 'resolved') {
                  arr[j].apply(this, resultArgs);
                }

                doneFuncs.push(arr[j]);
              }
            } else {
              // immediately call the function if the deferred has been resolved
              if (status === 'resolved') {
                arguments[i].apply(this, resultArgs);
              }

              doneFuncs.push(arguments[i]);
            }
          }

          return this;
        },

        fail: function() {
          for (var i = 0; i < arguments.length; i++) {
            // skip any undefined or null arguments
            if (!arguments[i]) {
              continue;
            }

            if (isArray(arguments[i])) {
              var arr = arguments[i];
              for (var j = 0; j < arr.length; j++) {
                // immediately call the function if the deferred has been resolved
                if (status === 'rejected') {
                  arr[j].apply(this, resultArgs);
                }

                failFuncs.push(arr[j]);
              }
            } else {
              // immediately call the function if the deferred has been resolved
              if (status === 'rejected') {
                arguments[i].apply(this, resultArgs);
              }

              failFuncs.push(arguments[i]);
            }
          }

          return this;
        },

        always: function() {
          return this.done.apply(this, arguments).fail.apply(this, arguments);
        },

        progress: function() {
          for (var i = 0; i < arguments.length; i++) {
            // skip any undefined or null arguments
            if (!arguments[i]) {
              continue;
            }

            if (isArray(arguments[i])) {
              var arr = arguments[i];
              for (var j = 0; j < arr.length; j++) {
                // immediately call the function if the deferred has been resolved
                if (status === 'pending') {
                  progressFuncs.push(arr[j]);
                }
              }
            } else {
              // immediately call the function if the deferred has been resolved
              if (status === 'pending') {
                progressFuncs.push(arguments[i]);
              }
            }
          }

          return this;
        },

        then: function() {
          // fail callbacks
          if (arguments.length > 1 && arguments[1]) {
            this.fail(arguments[1]);
          }

          // done callbacks
          if (arguments.length > 0 && arguments[0]) {
            this.done(arguments[0]);
          }

          // notify callbacks
          if (arguments.length > 2 && arguments[2]) {
            this.progress(arguments[2]);
          }
        },

        promise: function(obj) {
          if (typeof(obj) === 'undefined') {
            return promise;
          } else {
            for (var i in promise) {
              obj[i] = promise[i];
            }
            return obj;
          }
        },

        state: function() {
          return status;
        },

        debug: function() {
          console.log('[debug]', doneFuncs, failFuncs, status);
        },

        isRejected: function() {
          return status === 'rejected';
        },

        isResolved: function() {
          return status === 'resolved';
        },

        pipe: function(done, fail, progress) {
          return D(function(def) {
            foreach(done, function(func) {
              // filter function
              if (typeof func === 'function') {
                deferred.done(function() {
                  var returnval = func.apply(this, arguments);
                  // if a new deferred/promise is returned, its state is passed to the current deferred/promise
                  if (returnval && typeof returnval === 'function') {
                    returnval.promise().then(def.resolve, def.reject, def.notify);
                  } else { // if new return val is passed, it is passed to the piped done
                    def.resolve(returnval);
                  }
                });
              } else {
                deferred.done(def.resolve);
              }
            });

            foreach(fail, function(func) {
              if (typeof func === 'function') {
                deferred.fail(function() {
                  var returnval = func.apply(this, arguments);

                  if (returnval && typeof returnval === 'function') {
                    returnval.promise().then(def.resolve, def.reject, def.notify);
                  } else {
                    def.reject(returnval);
                  }
                });
              } else {
                deferred.fail(def.reject);
              }
            });
          }).promise();
        }
      },

      deferred = {
        resolveWith: function(context) {
          if (status === 'pending') {
            status = 'resolved';
            var args = resultArgs = (arguments.length > 1) ? arguments[1] : [];
            for (var i = 0; i < doneFuncs.length; i++) {
              doneFuncs[i].apply(context, args);
            }
          }
          return this;
        },

        rejectWith: function(context) {
          if (status === 'pending') {
            status = 'rejected';
            var args = resultArgs = (arguments.length > 1) ? arguments[1] : [];
            for (var i = 0; i < failFuncs.length; i++) {
              failFuncs[i].apply(context, args);
            }
          }
          return this;
        },

        notifyWith: function(context) {
          if (status === 'pending') {
            var args = resultArgs = (arguments.length > 1) ? arguments[1] : [];
            for (var i = 0; i < progressFuncs.length; i++) {
              progressFuncs[i].apply(context, args);
            }
          }
          return this;
        },

        resolve: function() {
          return this.resolveWith(this, arguments);
        },

        reject: function() {
          return this.rejectWith(this, arguments);
        },

        notify: function() {
          return this.notifyWith(this, arguments);
        }
      }

    var obj = promise.promise(deferred);

    if (fn) {
      fn.apply(obj, [obj]);
    }

    return obj;
  }

  var when = function() {
    if (arguments.length < 2) {
      var obj = arguments.length ? arguments[0] : undefined;
      if (obj && (typeof obj.isResolved === 'function' && typeof obj.isRejected === 'function')) {
        return obj.promise();
      } else {
        return D().resolve(obj).promise();
      }
    } else {
      return (function(args) {
        var df = D(),
          size = args.length,
          done = 0,
          rp = new Array(size); // resolve params: params of each resolve, we need to track down them to be able to pass them in the correct order if the master needs to be resolved

        for (var i = 0; i < args.length; i++) {
          (function(j) {
            var obj = null;

            if (args[j].done) {
              args[j].done(function() {
                rp[j] = (arguments.length < 2) ? arguments[0] : arguments;
                if (++done == size) {
                  df.resolve.apply(df, rp);
                }
              })
                .fail(function() {
                  df.reject(arguments);
                });
            } else {
              obj = args[j];
              args[j] = new Deferred();

              args[j].done(function() {
                rp[j] = (arguments.length < 2) ? arguments[0] : arguments;
                if (++done == size) {
                  df.resolve.apply(df, rp);
                }
              })
                .fail(function() {
                  df.reject(arguments);
                }).resolve(obj);
            }
          })(i);
        }
        return df.promise();
      })(arguments);
    }
  };
  /**
   * bind these new functions to ki
   */
  ki.Deferred = D;
  ki.when = D.when = when;
})($);
})();
