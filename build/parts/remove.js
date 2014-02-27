$.prototype.remove = function() {
  return this.each(function(b) {
    b.parentNode.removeChild(b);
  });
};
