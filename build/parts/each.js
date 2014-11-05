$.each = function(arr, callback) {
  var i = 0, l = arr.length;
  for(; i < l; ++i) {
    callback.call(arr[i], i, arr[i]);
  }
  return this;
};