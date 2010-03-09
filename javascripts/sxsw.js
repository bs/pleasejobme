function initialize() {
  var latlng = new google.maps.LatLng(37, -122);
  var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  getStuffFromLists()
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

var tweetUserTemplate = 
  '<div class="tweetUserPopup"><a href="http://twitter.com/{{screen_name}}">@{{screen_name}}</a>' +
    '{{text}}' +
  '</div>'
  
function tweetViewFor(tweet) {
  return {
    screen_name : tweet.user.screen_name,
    text : tweet.text
  }
}

function plotTweets(results) {
  $.each(results, function() { 
    if (this.geo != null) {
      var view = tweetViewFor(this);
      var tweetUserPopup = Mustache.to_html(tweetUserTemplate, view);
      
      var infowindow = new google.maps.InfoWindow({ content: tweetUserPopup });
      var latlng = new google.maps.LatLng(this.geo.coordinates[0], this.geo.coordinates[1]);
      var marker = new google.maps.Marker({
        title: view.screen_name,
        position: latlng, 
        map: map
      });
      
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
     
    }
  });
}
