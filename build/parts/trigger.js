$.prototype.trigger = function(a) {
  if (document.createEvent) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(a, true, false);
    this.each(function(b) {
      b.dispatchEvent(event);
    });
  } else {
    this.each(function(b) {
      b.fireEvent('on' + a);
    });
  }
};
