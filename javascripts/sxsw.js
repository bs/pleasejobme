/*jslint white: true, indent: 2, browser: true,  */
/*global google, map, Mustache, $ */
//
// var tweepsToMap = [
//   'pandemona',
//   'hoverbird',
//   'bs',
//   'k',
// ]

/* Degrade gracefully if the browser doesn't support console.log */
if (!window.console) {
   var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
   "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

   window.console = {};
   for (var i = 0; i < names.length; ++i) {
     window.console[names[i]] = function() {}
   }
}

var $twitterPeople = $('#tp');
var $everyone = $('#e');
var $toMeet = $('#tm');

var employeeLocations = [];
var othersLocations = [];
var markers = [];

// This is around Austin.
var sw = new google.maps.LatLng(30.25, -97.76);
var ne = new google.maps.LatLng(30.27, -97.73);
var austinBounds = new google.maps.LatLngBounds(sw, ne);

var tweetUserTemplate =
  '<div class="tweetUserPopup">' +
    '<table><tr><td class="image-td"><a href="http://twitter.com/{{screen_name}}" class="profile-pic"><img src="{{avatar_src}}" width="48" height="48"></a></td><td>' +
    '<span class="full-name">{{full_name}}</span> <a class="screen-name" href="http://twitter.com/{{screen_name}}">@{{screen_name}}</a>' +
    '<div class="tweet-text">{{text}} <span class="created-at">{{created_at}}</span></div>' +
  '</td></tr></table></div>';
  
function timeAgo(dateString) {
  var rightNow = new Date();
  var then = new Date(dateString);

  var diff = rightNow - then;

  var second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;

  if (isNaN(diff) || diff < 0) {
    return ""; // return blank string if unknown
  }

  if (diff < second * 7) {
    // within 7 seconds
    return "right now";
  }

  if (diff < minute) {
    return Math.floor(diff / second) + " seconds ago";
  }

  if (diff < minute * 2) {
    return "about 1 minute ago";
  }

  if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  }

  if (diff < hour * 2) {
    return "about 1 hour ago";
  }

  if (diff < day) {
    return  Math.floor(diff / hour) + " hours ago";
  }

  if (diff > day && diff < day * 2) {
    return "yesterday";
  }

  if (diff < day * 365) {
    return Math.floor(diff / day) + " days ago";
  }

  else {
    return "over a year ago";
  }
}

function tweetViewFor(tweet) {
  var user = tweet.user;
  var view = {
    screen_name : user.screen_name,
    full_name   : user.name,
    avatar_src : user.profile_image_url,
    text : tweet.text,
    created_at : timeAgo(tweet.created_at)
  };
  return view;
}

function plotTweets(results) {
  $.each(results, function () {
    if (this.geo !== null) {
      var infowindow = new google.maps.InfoWindow({
        content: Mustache.to_html(tweetUserTemplate, tweetViewFor(this))
      });
      
      var gLatLng = new google.maps.LatLng(this.geo.coordinates[0], this.geo.coordinates[1]);

      var marker = new google.maps.Marker({
        position: gLatLng,
        title: this.user.screen_name,
        map: map,
        icon: 'images/ic_twgeo.png'
      });
      
      markers.push(marker);

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
      });

    }
  });
  
  // Center and Zoom the Map.
  map.fitBounds(austinBounds);
  
  // Set it around all given coords returned.
  // var latLngBounds = new google.maps.LatLngBounds();
  // for(var i=0; i < locations.length; i++ ) {
  //   latLngBounds.extend(locations[i]);
  // }
}

function clearMarkers() {
  while(markers.length > 0) {
    var marker = markers.pop();
    marker.setMap(null);
  }
}

function getTwitterTweets() {
  $.ajax({
    url: "http://api.twitter.com/1/twitter/lists/sxsw/statuses.json?per_page=200",
    dataType: 'jsonp',
    success: function(results) {
      plotTweets(results);
    }
  });
}

function getEveryoneTweets() {
  clearMarkers();
    
  $.ajax({
    url: "http://api.twitter.com/1/atsxsw/lists/people/statuses.json?per_page=200",
    dataType: 'jsonp',
    success: function(results) {
      plotTweets(results);
    }
  });
}

function addToEveryone(userName) {
  $.ajax({
    url: "http://api.twitter.com/1/atsxsw/people/members.xml",
    dataType: 'jsonp',
    data: {
      'id': userName
    }
    success: function(results) {
      console.log('great success!');
    }
  });
}

function initializeMap() {
  var latlng = new google.maps.LatLng(37, -122);
  var myOptions = {
    zoom: 8,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  getTwitterTweets();
  
  $everyone.click(function() {
    $twitterPeople.removeClass('current');
    $toMeet.removeClass('current');
    
    $everyone.addClass('current');
    getEveryoneTweets();
  });
  
  $twitterPeople.click(function() {
    $everyone.removeClass('current');
    $toMeet.removeClass('current');
    
    $twitterPeople.addClass('current');
    getTwitterTweets();
  });
}
