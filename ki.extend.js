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

  $.prototype.css = function(a, b) {
    return b === []._ ? this[0].style[a] : this.each(function(c) {
      c.style[a] = b;
    });
  };

  $.prototype.attr = function(a, b) {
    return b === []._ ? this[0].getAttribute[a] : this.each(function(c) {
      c.setAttribute[a] = b;
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

  $.prototype.hasClass = function(a) {
    return this[0].classList.contains(a);
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

  $.prototype.append = function(a) {
    return this.each(function(b) {
      b.parentNode.appendChild(a);
    });
  };

  $.prototype.remove = function() {
    return this.each(function(b) {
      b.parentNode.removeChild(b);
    });
  };

  $.prototype.parent = function() {
    return (this.length < 2) ? $(this[0].parentNode): [];
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

  /*!
   * Utilities
   */

  $.stop = function(e) {
    if (!e.preventDefault) {
      e.returnValue = false;
    } else {
      e.preventDefault();
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

  $.trim = function(a) {
    return a.replace(/^\s+|\s+$/g, '');
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
})();
