$.prototype.css = function(a, b) {
  if (typeof(a) === 'object') {
    for(var prop in a) {
      this.each(function(c) {
        c.style[prop] = a[prop];
      });
    }
    return this;
  } else {
    return b === []._ ? this[0].style[a] : this.each(function(c) {
      c.style[a] = b;
    });
  }
};
