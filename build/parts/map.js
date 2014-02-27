$.map = function(arr, fn) {
  var results = [];
  var i = 0, l = arr.length;
  for(; i < l; ++i) {
    results.push(fn(arr[i], i));
  }
  return results;
};
