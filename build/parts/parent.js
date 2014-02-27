$.prototype.parent = function() {
  return (this.length < 2) ? $(this[0].parentNode): [];
};
