function filterByYear() {
  var sql = "SELECT * FROM nyc_flickr_photos_merge WHERE date >= '"+filterYear+"-01-01 00:00:00' and date < '"+filterYear+"-12-31 00:00:00' ";
  $.ajax('https://stephenjskilton.cartodb.com/api/v2/sql?q=' + sql);
}


$(".dropdown").on("click", "li", function(event){
    filterYear = $(this).text(); // Get the text of the element
    var sql = "SELECT * FROM nyc_flickr_photos_merge WHERE date >= '"+filterYear+"-12-31 00:00:00' and date < '"+filterYear+"-01-01 00:00:00' ";
    var sql2 = "SELECT * FROM nyc_flickr_photos WHERE date >= '"+filterYear+"-01-01 00:00:00' and date < '"+filterYear+"-12-31 00:00:00' ";
    testLayer.getSubLayer(0).setSQL( sql);
    testLayer.getSubLayer(1).setSQL( sql2);
});

function nClosest(point, n) {

  var sql = 'SELECT * FROM nyc_flickr_photos ORDER BY the_geom <-> ST_Point(' + point.lng + ',' + point.lat + ') LIMIT ' + n;
  console.log(sql);
  $.ajax('https://stephenjskilton.cartodb.com/api/v2/sql?q=' + sql).done(function(results) {
    addRecords(results);
  });
}

function pointsWithin(rect) {

  var sw = rect[0];
  var ne = rect[2];
  var sql = 'SELECT * FROM nyc_flickr_photos WHERE the_geom @ ST_MakeEnvelope(' +
    sw.lng + ','+ sw.lat + ',' + ne.lng + ',' + ne.lat + ', 4326)';

  $.ajax('https://stephenjskilton.cartodb.com/api/v2/sql?q=' + sql).done(function(results) {
    addRecords(results);
  });
}

var photoSite = function(user){
  if(user.includes('@')) {return ("https://www.flickr.com/photos/"+user);}
  else {return ("https://picasaweb.google.com/"+user);}
};



function addOneRecord(rec) {
  var link = photoSite(rec.id.substring(1));
  var title = $("<a href='"+ link +" 'target='_blank'><p></p></a>").text("User Name: "+rec.id.substring(1));

  var location = $('<p></p>')
    .text('Date: ' + rec.date.substring(0,10));

  var lending_instrument = $('<p></p>')
    .text('Time: ' + rec.time);


  var recordElement = $('<li></li>')
    .addClass('list-group-item')
    .append(title)
    .append(location)
    .append(lending_instrument);

  $('#project-list').append(recordElement);
}

function addRecords(cartodbResults) {
  $('#project-list').empty();
  _.each(cartodbResults.rows, addOneRecord);
}
