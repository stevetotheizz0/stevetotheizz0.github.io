
var narrative = document.getElementById('narrative'),
    sections = narrative.getElementsByTagName('section'),
    currentId = 'first';
var currentLayer;


var locations = function(){
  map.removeLayer(currentLayer);
  map.addLayer(billboards);
  currentLayer = billboards;
};
var traffic = function(){
  map.removeLayer(currentLayer);
  map.addLayer(billboards);
  currentLayer = billboards;
};
var buildings = function(){
  map.removeLayer(currentLayer);
  map.addLayer(billboards);
  currentLayer = billboards;
};
var digital = function(){
  map.removeLayer(currentLayer);
  map.addLayer(billboards);
  currentLayer = billboards;
};

var changeMap = function(pageSection){
  switch (pageSection) {
      case 'first': locations(); break;
      case 'second': traffic();  break;
      case 'third': buildings(); break;
      case 'fourth': digital(); break;
  }
};

setId('first');

function setId(newId) {

if (newId === currentId) return;
console.log(newId);
currentId = newId;
changeMap(newId);

}

window.onscroll = function(e) {
  var narrativeHeight = narrative.clientWidth;
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
