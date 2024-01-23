var billboards;
    //philaBounds = "http://data.phl.opendata.arcgis.com/datasets/405ec3da942d4e20869d4e1449a2be48_0.geojson";
    dataset ="https://raw.githubusercontent.com/stevetotheizz0/stevetotheizz0.github.io/master/Billboard_Project/json/billboardData1.json";
    parks = "Billboard_Project/json/PhiladelphiaParks.geojson";
    boundaryStyle = {
    "color": "#252525",
    "weight": 3,
    "stroke": true,
    "fill": false,
    "opacity": 1.0,
};




var map = L.map('map', {
  center: [39.9605, -75.13374],
  zoomControl:false,
  scrollWheelZoom: false,
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  minZoom: 0,
  maxZoom: 24
}).addTo(map);

var rawBillboard;
var currentLayer;

var geojsonMarkerOptions = function(feature) {
      switch (feature.properties.Digital) {
        case 'NO': return {fillColor: "#000000", radius:2, fillOpacity: 1, stroke:false};
        case ' no': return {fillColor: "#000000", radius:2, fillOpacity: 1, stroke:false};
        case 'no': return {fillColor: "#000000", radius:2, fillOpacity: 1, stroke:false};
        case 'yes':   return {fillColor: "#b2182b", radius:4, fillOpacity: 1, stroke:false};
      }
    };


$(document).ready(function() {
  //$.ajax(philaBounds).done(function(data) {
  //  myFeatureGroup = L.geoJson(data, {"style":boundaryStyle}).addTo(map);
  //});
  $.ajax({url: dataset, dataType: 'json'}).done(function(data) {
    rawBillboard = data;
    billboards = L.geoJson(rawBillboard, {
      pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions(feature));}
    }).addTo(map);
    currentLayer = billboards;
  });
});
