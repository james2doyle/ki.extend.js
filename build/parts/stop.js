$.stop = function(e) {
  if (!e.preventDefault) {
    e.returnValue = false;
  } else {
    e.preventDefault();
  }
};
