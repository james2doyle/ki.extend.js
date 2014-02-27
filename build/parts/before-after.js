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
