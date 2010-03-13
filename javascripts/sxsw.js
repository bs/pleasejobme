/*jslint white: false, indent: 2, browser: true,  */
/*global window, google, map, Mustache, $ */

/* Degrade gracefully if the browser doesn't support console.log */
if (!window.console) {
   var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
   "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

   window.console = {};
   for (var i = 0; i < names.length; ++i) {
     window.console[names[i]] = function() {}
   }
}

var twitterPeople = {};
var $twitterPeopleLink = $('#tp');
var $toMeetLink = $('#tm');

var $map_canvas = $('#map_canvas');
var $questionnaire = $('form#questionnaire');
var $questionnaireResults = $('#questionnaireResults');

var employeeLocations = [];
var othersLocations = [];
var markers = [];
var infoWindows = [];
var autoInterval = null;
var infoIncrement = 0;

// This is around Austin.
var sw = new google.maps.LatLng(30.25, -97.76);
var ne = new google.maps.LatLng(30.27, -97.73);
var austinBounds = new google.maps.LatLngBounds(sw, ne);

var tweetUserTemplate =
  '<div class="tweetUserPopup">' +
    '<table><tr><td class="image-td"><a href="http://twitter.com/{{screen_name}}" class="profile-pic"><img src="{{profile_image_url}}"></a></td><td>' +
    '<span class="full-name">{{name}}</span> <a class="screen-name" href="http://twitter.com/{{screen_name}}">@{{screen_name}}</a>' +
    '<div class="tweet-text">{{text}} <span class="created-at">{{created_at}}</span></div>' +
  '</td></tr></table></div>';

var twitterPersonTemplate =
  '<div id="person_{{screen_name}}" class="twitter-person" style="display: none;">' +
    '<img class="profile-image" alt="{{screen_name}}" border="0" height="73" id="profile-image" src="{{profile_image_url}}" valign="middle" width="73">' +
    '<a href="http://twitter.com/{{screen_name}}">{{name}}&nbsp;<small>@{{screen_name}}</small></a>' +
    '<div class="role">{{role}}</div>' +
    '<div class="meta"><span>Ask about:</span>{{info}}' +
    '<div class="meta"><span>Last seen:</span>{{lastseen}}' +
  '</div>';

var questionnaireSelectTemplate =
  '<li id="{{id}}">{{name}}' +
    '<input type="checkbox" id="select_{{id}}" name="questionnaire[{{id}}]" value="" style="display:none;"/>' +
  '</li>';

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

function plotTweets(results) {
  $.each(results, function () {
    if (this.geo !== null) {
      var infowindow = new google.maps.InfoWindow({
        content: Mustache.to_html(tweetUserTemplate, this.user)
      });

      infoWindows.push(infowindow);
      var gLatLng = new google.maps.LatLng(this.geo.coordinates[0], this.geo.coordinates[1]);

      var marker = new google.maps.Marker({
        position: gLatLng,
        title: this.user.screen_name,
        map: map,
        icon: 'images/ic_twgeo.png'
      });

      markers.push(marker);

      google.maps.event.addListener(marker, 'click', function () {
        stopAutoPop();
        clearInfoWindows();
        infowindow.open(map, marker);
        startAutoPop(30000);
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

function clearInfoWindows() {
 $.each(infoWindows, function() {
    this.close();
  });
}

function getTwitterTweets() {
  $.ajax({
    url: "http://api.twitter.com/1/twitter/lists/sxsw/statuses.json?per_page=200",
    dataType: 'jsonp',
    success: function(results) {
      setTwitterPeople(results);
      plotTweets(results);
      drawPeople(twitterPeople);
      initializeQuestionnaire();
    }
  });
}

function autoPop() {
  clearInfoWindows();

  if (markers[infoIncrement] === 'undefined') {
    return false;
  }

  google.maps.event.trigger(markers[infoIncrement], 'click');

  if (infoIncrement == markers.length) {
    infoIncrement = 0;
  } else {
    infoIncrement += 1;
  }
}

function startAutoPop(autoPopInterval) {
  if (autoPopInterval !== undefined) {
    autoPopInterval = 10000;
  }

  autoInterval = window.setInterval(autoPop, autoPopInterval);
}

function stopAutoPop() {
  window.clearInterval(autoInterval);
}

function blinkTag(element, speed) {
  window.setInterval(function() {
    if (element.css('visibility') === 'visible') {
      element.css('visibility', 'hidden');
    } else {
      element.css('visibility', 'visible');
    }
  }, speed);
}

function init() {
  var latlng = new google.maps.LatLng(37, -122);
  var myOptions = {
    zoom: 8,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  if ($.cookie('taken_quiz') == null) {
    $('#meet-box').show();
  }

  getTwitterTweets();

  $twitterPeopleLink.click(function() {
    $toMeetLink.removeClass('current');
    $twitterPeopleLink.addClass('current');
    $map_canvas.show();
    $questionnaire.hide();
  });

  $toMeetLink.click(function() {
    $map_canvas.hide();
    $questionnaire.show();
  });

  $('#meet-box, #meet-box a').click(function(e) {
    e.preventDefault();
    $.cookie('taken_quiz', 'true');
    $('#meet-box').hide();
    $map_canvas.hide();
    $questionnaire.show();
  });

  // startAutoPop();
  // blinkTag($('#tap'), 600);
  $('#meet-box').click();
}

// Questionnaire ------------------------------------------------------------------------------------------

function setTwitterPeople(results) {
  $.each(results, function(index, tweet) {
    if ((tweet.user !== undefined) && (twitterPeople[tweet.user.screen_name] === undefined)) {
      var screen_name = tweet.user.screen_name;
      twitterPeople[screen_name] = tweet.user;

      $.extend(twitterPeople[screen_name], {
        'requestedInterests' : [],
        'text' : this.text,
        'created_at' : this.created_at,
        'geo' : this.geo
      );
      if (twitterPeopleMetadata[screen_name] !== undefined) {
        $.extend(twitterPeople[screen_name], twitterPeopleMetadata[screen_name]);
      }
    }
  });
}

function addPerson(screen_name, skill) {
  var personElement = $('#person_' + screen_name );
  var person = twitterPeople[screen_name];
  if (person === undefined) {
    console.log("Couldn't find a twitterPerson with ID " + screen_name);
  } else {
    person.requestedInterests.push(skill);
    personElement.show();
    $("#donebutton").show();
  }
}

function removePerson(id, skill) {
  var personElement = $('#person_' + id );
  var filteredInterests = $.grep(twitterPeople[id].requestedInterests, function(value, index) {
    return value != skill;
  });
  if (filteredInterests.length <= 0) {
    personElement.hide();
  }
  twitterPeople[id].requestedInterests = filteredInterests;
}

function elementUnselected(listElement) {
  $.each(listElement.data('people'), function () {
   removePerson(this, listElement.attr('id'));
  });
  listElement.find('input[type="checkbox"]').attr("value", "");
  listElement.removeClass('selected');
  listElement.one('click', function () {
    elementSelected(listElement);
  });
}

function elementSelected(listElement) {
  listElement.find('input[type="checkbox"]').attr("value", "checked");
  listElement.addClass('selected');
  $.each(listElement.data('people'), function () {
    addPerson(this, listElement.attr('id'));
  });

  listElement.one('click', function () {
    elementUnselected(listElement);
  });
}

function drawPeople(people) {
  $.each(people, function(screenName, person) {
    var personElement = $(Mustache.to_html(twitterPersonTemplate, person));
    $('#questionnaireResults').append(personElement);
  });
}

function initializeQuestionnaire () {
  var formSelections = $("form#questionnaire ul");

  $.each(questionSelections, function () {
    formSelections.append($("<h3>" + this[0] + "</h3>"));
    $.each(this[1], function () {
      var listElement = $(Mustache.to_html(questionnaireSelectTemplate, this));
      listElement.data('people', this.people);
      listElement.one('click', function () {
        elementSelected(listElement);
      });
      formSelections.append(listElement);
    });
  });

  $("#donebutton").click(function() {
    $questionnaire.hide();
    $questionnaireResults.show();
    $twitterPeopleLink.removeClass('selected');
    $toMeetLink.addClass('selected');
  });
}
