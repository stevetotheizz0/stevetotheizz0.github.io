
var narrative = document.getElementById('narrative'),
    sections = narrative.getElementsByTagName('section'),
    currentId = '';

setId('first');

function setId(newId) {

if (newId === currentId) return;
console.log(newId);
currentId = newId;

}

window.onscroll = function(e) {
  var narrativeHeight = narrative.offsetHeight;
  var newId = currentId;
  // Find the section that's currently scrolled-to.
  // We iterate backwards here so that we find the topmost one.
  for (var i = sections.length - 1; i >= 0; i--) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= narrativeHeight) {
          newId = sections[i].id;
      }
  }
  setId(newId);
};
