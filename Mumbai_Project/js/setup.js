var dataset = "https://raw.githubusercontent.com/stevetotheizz0/stevetotheizz0.github.io/master/Mumbai_Project/Mumba_Study_Area.json";

var map = L.map('map', {
  center: [18.950638, 72.837817],
  zoom: 12
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles: <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      parsedData = JSON.parse(data);
      myFeatureGroup = L.geoJson(parsedData).addTo(map);
    });
  });
