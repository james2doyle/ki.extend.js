$.prototype.css = function(a, b) {
  return b === []._ ? this[0].style[a] : this.each(function(c) {
    c.style[a] = b;
  });
};
