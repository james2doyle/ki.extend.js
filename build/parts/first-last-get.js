$.prototype.first = function() {
  return $(this[0]);
};

$.prototype.last = function() {
  return $(this[this.length - 1]);
};

$.prototype.get = function(a) {
  return $(this[a]);
};
