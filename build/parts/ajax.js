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
