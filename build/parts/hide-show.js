$.prototype.hide = function() {
  return this.each(function(b) {
    b.style.display = 'none';
  });
};

$.prototype.show = function() {
  return this.each(function(b) {
    b.style.display = '';
  });
};
