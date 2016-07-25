var map = L.map('map', {
  center: [40.72463,	-73.96698],
  zoom: 13,
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// The viz.json output by publishing on cartodb
var layerUrl = 'https://stephenjskilton.cartodb.com/api/v2/viz/c948b850-ef27-11e5-a54c-0e5db1731f59/viz.json';

var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: true,
    rectangle: true,
  }
});

var drawnItems = new L.FeatureGroup();

var drawnLayerID;

map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;

  if (type === 'marker') {
    nClosest(layer._latlng, 5);
  } else if (type === 'rectangle') {
    pointsWithin(layer._latlngs);
  }

  if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }
  map.addLayer(layer);
  drawnLayerID = layer._leaflet_id;
});


cartodb.createLayer(map, layerUrl).addTo(map).on('done', function(layer){
    testLayer = layer;
    map.addControl(drawControl);
    map.addLayer(drawnItems);
});
