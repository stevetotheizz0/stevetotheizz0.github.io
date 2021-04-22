var map = L.map('map', {
  center: [40.715150, -73.987961],
  zoom: 13,
  zoomControl:false,
  scrollWheelZoom: false,
});

var Stamen_TonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png',
}).addTo(map);


// The viz.json output by publishing on cartodb
var layerUrl = 'https://stephenjskilton.cartodb.com/api/v2/viz/c948b850-ef27-11e5-a54c-0e5db1731f59/viz.json';



cartodb.createLayer(map, layerUrl,  { legends: false, cartodb_logo: false,}).addTo(map);
