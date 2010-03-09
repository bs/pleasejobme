/*jslint white: true, indent: 2, browser: true,  */
/*global google, map, Mustache, $ */
//
// var tweepsToMap = [
//   'pandemona',
//   'hoverbird',
//   'bs',
//   'k',
// ]

var tweetUserTemplate =
  '<div class="tweetUserPopup">' +
    '<a href="http://twitter.com/{{screen_name}}" class="profile-pic"><img src="{{avatar_src}}" width="48" height="48"></a>&nbsp;' +
    '<a href="http://twitter.com/{{screen_name}}">@{{screen_name}}&#8212; <small>{{full_name}}</small></a>' +
    '<span class="tweet-text">{{text}}</span>' +
  '</div>';

function tweetViewFor(tweet) {
  var user = tweet.user;
  var view = {
    screen_name : user.screen_name,
    full_name   : user.name,
    avatar_src : user.profile_image_url,
    text : tweet.text
  };
  return view;
}

function plotTweets(results) {
  $.each(results, function () {
    if (this.geo !== null) {
      var infowindow = new google.maps.InfoWindow({
        content: Mustache.to_html(tweetUserTemplate, tweetViewFor(this))
      });

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.geo.coordinates[0], this.geo.coordinates[1]),
        title: this.user.screen_name,
        map: map
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });

    }
  });
}

function getTweetsFromLists() {
  $.ajax({
    url: "http://api.twitter.com/1/twitter/lists/team/statuses.json?per_page=200",
    dataType: 'jsonp',
    success: function(results) {
      plotTweets(results);
    }
  });
}

function initialize() {
  var latlng = new google.maps.LatLng(37, -122);
  var myOptions = {
    zoom: 8,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  getTweetsFromLists();
}
