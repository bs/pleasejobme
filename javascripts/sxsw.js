function initialize() {
    var latlng = new google.maps.LatLng(37, -122);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function getStuffFromLists() {
  $.ajax({
    url: "http://api.twitter.com/1/twitter/lists/team/statuses.json?per_page=200",
    dataType: 'jsonp',
    success: function(results) {
      plotTweets(results);
    }
  });
}

function plotTweets(results) {
  $.each(results, function() { 
    if (this.geo != null) {
      var latlng = new google.maps.LatLng(this.geo.coordinates[0], this.geo.coordinates[1]);
      
      var marker = new google.maps.Marker({
            position: latlng, 
            map: map, 
            title:"Hello World!"
      });
      console.log(this.geo);
    }
  });
}