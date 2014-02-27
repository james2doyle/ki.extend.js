$.prototype.append = function(a) {
  return this.each(function(b) {
    b.parentNode.appendChild(a);
  });
};

$.prototype.prepend = function(a) {
  return this.each(function(b) {
    b.parentNode.insertBefore(a, b.parentNode.firstChild);
  });
};
