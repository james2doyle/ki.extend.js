$.param = function(obj, prefix) {
  var str = [];
  for(var p in obj) {
    var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
    str.push(typeof v == "object" ? $.param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
  }
  return str.join("&");
};

// var p = new $.Deferred();
// p.resolve(n);
// return p.promise();

$.ajax = function(a, b, c) {
  var xhr = new XMLHttpRequest();
  var p = new $.Deferred();
  // 1 == post, 0 == get
  var type = (typeof(b) === 'object') ? 1: 0;
  var gp = ['GET', 'POST'];
  xhr.open(gp[type], a, true);
  var cb = (!type) ? b: c;
  if (typeof(c) === 'undefined' && typeof(b) !== 'function') {
    cb = function(){};
  }
  xhr.onerror = function() {
    p.reject(this);
    cb(this, true);
  };
  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400){
        p.resolve(this.response);
        cb(this.response, true);
      } else {
        p.reject(this);
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
  return p.promise();
};
