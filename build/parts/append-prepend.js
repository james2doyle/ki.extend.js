$.prototype.append = function(a) {
  return this.each(function(b) {
    b.appendChild(a[0]);
  });
};

$.prototype.prepend = function(a) {
  return this.each(function(b) {
    b.insertBefore(a[0], b.parentNode.firstChild);
  });
};
