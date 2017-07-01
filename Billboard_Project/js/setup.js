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
  center: [39.92505, -75.121374],
  zoomControl:false,
  scrollWheelZoom: false,
  zoom: 12
});

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
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
