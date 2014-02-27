$.prototype.text = function(a) {
  return a === []._ ? this[0].textContent : this.each(function(b) {
    b.textContent = a;
  });
};

$.prototype.html = function(a) {
  return a === []._ ? this[0].innerHTML : this.each(function(b) {
    b.innerHTML = a;
  });
};
