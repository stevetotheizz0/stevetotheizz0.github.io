var dataset1 = "http://data.phl.opendata.arcgis.com/datasets/405ec3da942d4e20869d4e1449a2be48_0.geojson";
var dataset ="https://raw.githubusercontent.com/stevetotheizz0/stevetotheizz0.github.io/master/Billboard_Project/json/Billboards_WGS1984.geojson";
var parks = "Billboard_Project/json/PhiladelphiaParks.geojson";
var boundaryStyle = {
    "color": "#252525",
    "weight": 3,
    "stroke": true,
    "fill": false,
    "opacity": 1.0,
};




var map = L.map('map', {
  center: [39.99305, -75.121374],
  zoomControl:false,
  zoom: 11
});

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    myFeatureGroup = L.geoJson(data).addTo(map);
  });
});
