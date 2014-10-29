"filter map".split(" ").forEach(function(m) {
  $[m] = function(a, b) {
    return a[m](b);
  };
});
