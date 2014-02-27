// map some classlist functions to the jQuery counterpart
var props = ['addClass', 'removeClass', 'toggleClass'],
maps = ['add', 'remove', 'toggle'];

props.forEach(function(prop, index) {
  $.prototype[prop] = function(a) {
    return this.each(function(b) {
      b.classList[maps[index]](a);
    });
  };
});

$.prototype.hasClass = function(a) {
  return this[0].classList.contains(a);
};
