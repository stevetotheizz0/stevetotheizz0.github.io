
var narrative = document.getElementById('narrative'),
    sections = narrative.getElementsByTagName('section'),
    currentId = 'first';
    currentLegend = '#Strength';


/*
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    billboards = L.geoJson(rawBillboard, {
            pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);}
    }).addTo(map);
    currentLayer = billboards;
*/


var locations = function(){
  $(currentLegend).hide();
  currentLegend = '#Location';
  $(currentLegend).show();

  map.removeLayer(currentLayer);
  var geojsonMarkerOptions = function(feature) {
        switch (feature.properties.Digital) {
          case 'NO': return {fillColor: "#000000", radius:2, fillOpacity: 1, stroke:false};
          case ' no': return {fillColor: "#000000", radius:2, fillOpacity: 1, stroke:false};
          case 'no': return {fillColor: "#000000", radius:2, fillOpacity: 1, stroke:false};
          case 'yes':   return {fillColor: "#b2182b", radius:4, fillOpacity: 1, stroke:false};
        }
      };
  billboards = L.geoJson(rawBillboard, {
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions(feature));}
  }).addTo(map);
  currentLayer = billboards;
};
var traffic = function(){
  $(currentLegend).hide();
  currentLegend = '#Strength';
  $(currentLegend).show();

  map.removeLayer(currentLayer);
  var geojsonMarkerOptions = function(feature) {
        if(feature.properties.DLY_VMT < 10000) {                                             return {fillColor: "#D79E9E", radius:2, fillOpacity: 1, stroke:true, weight: 0.5, opacity: 1,color: "#000000", };}
        else if(feature.properties.DLY_VMT > 10000 && feature.properties.DLY_VMT <= 25000) { return {fillColor: "#D76666", radius:3, fillOpacity: 1, stroke:true, weight: 0.5, opacity: 1,color: "#000000"};}
        else if(feature.properties.DLY_VMT > 25000 && feature.properties.DLY_VMT <= 50000) { return {fillColor: "#F5A27A", radius:4, fillOpacity: 1, stroke:true, weight: 0.5, opacity: 1,color: "#000000"};}
        else if(feature.properties.DLY_VMT > 50000 && feature.properties.DLY_VMT <= 100000) {return {fillColor: "#C80000", radius:5, fillOpacity: 1, stroke:true, weight: 0.5, opacity: 1,color: "#000000"};}
        else {                                                                               return {fillColor: "#940000", radius:6, fillOpacity: 1, stroke:true, weight: 0.5, opacity: 1,color: "#000000"};}
      };
  billboards = L.geoJson(rawBillboard, {
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions(feature));}
  }).addTo(map);
  currentLayer = billboards;
};
var buildings = function(){
  $(currentLegend).hide();
  currentLegend = '#TradeIn';
  $(currentLegend).show();

  map.removeLayer(currentLayer);
  var geojsonMarkerOptions = function(feature) {
        switch (feature.properties.MktAnalysi) {
          case 'Legal Conforming':                      return {fillColor: "#FED976", radius:4, fillOpacity: 1, stroke:true, weight: 1, opacity:1,color: "#000000"};
          case 'Legal Conforming (From a Cluster)':     return {fillColor: "#800026", radius:4, fillOpacity: 1, stroke:true, weight: 1, opacity:1,color: "#000000"};
          case 'Within 300 ft of Another Billboard':    return {fill: false, radius:2, stroke:true, weight: 1, opacity:1, color: "#000000"};
          case 'Weak':                                  return {fillColor: "#0070FF", radius:2, fillOpacity: 1, stroke:true, weight: 1, opacity: 1,color: "#000000"};
        }
      };
  billboards = L.geoJson(rawBillboard, {
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions(feature));}
  }).addTo(map);
  currentLayer = billboards;
};
var digital = function(){
  $(currentLegend).hide();
  currentLegend = '#Vacant';
  $(currentLegend).show();
  map.removeLayer(currentLayer);
  var geojsonMarkerOptions = function(feature) {
        switch (feature.properties.building) {
          case 'Building':                  return {fillColor: "#A80000", radius:5, fillOpacity: 1, stroke:false};
          case 'Building, Near Match':      return {fillColor: "#FFA77F", radius:3, fillOpacity: 1, stroke:false};
          case 'No Building':               return {color: "#000000", radius:3, fillOpacity: 0, stroke:true, weight: 1, opacity: 1};
          case 'No Building, Near Match':   return {color: "#000000", radius:2, fillOpacity: 0, stroke:true, weight: 1, opacity:1};
          case 'Unmatched':                 return {fillColor: "#828282", radius:2, fillOpacity: 1, stroke: false};
        }
      };
  billboards = L.geoJson(rawBillboard, {
    pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions(feature));}
  }).addTo(map);
  currentLayer = billboards;
};

var changeMap = function(pageSection){
  switch (pageSection) {
    case 'first': locations(); break;
    case 'second': traffic();  break;
    case 'third': buildings(); break;
    case 'fourth': digital();
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
