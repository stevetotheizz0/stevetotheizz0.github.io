var dataset1 = "https://raw.githubusercontent.com/stevetotheizz0/stevetotheizz0.github.io/master/Mumbai_Project/Mumba_Study_Area.json";
    dataset2 = "https://raw.githubusercontent.com/stevetotheizz0/stevetotheizz0.github.io/master/Mumbai_Project/Mumbai_Station_Buffer1k.json";

var map = L.map('map', {
  center: [18.950638, 72.837817],
  zoomControl:false,
  zoom: 12
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles: <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


$(document).ready(function () {
    var j1 = $.ajax({
        url: dataset1,
        dataType: 'json',
        type: 'GET'
    });

    var j2 = $.ajax({
        url: dataset2,
        dataType: 'json',
        type: 'GET'
    });

    $.when(j1, j2).then(function(data1, data2) {
      myFeatureGroup1 = L.geoJson(data1).addTo(map);
      myFeatureGroup2 = L.geoJson(data2).addTo(map);
    }, function (jqXHR, textStatus, errorThrown) {
        var x1 = j1;
        var x2 = j2;
        if (x1.readyState != 4) {
            x1.abort();
        }
        if (x2.readyState != 4) {
            x2.abort();
        }
       alert('Either j1 or j2 failed!');
    });
});
