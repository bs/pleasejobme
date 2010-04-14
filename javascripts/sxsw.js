/*jslint white: false, indent: 2, browser: true,  */
/*global window, Mustache, $ */

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
var $questionnaireResults = $('#questionnaireResults');
var questionnaire_complete = false;

var $questionnaire

var tweetUserTemplate =
  '<div class="tweetUserPopup">' +
    '<table><tr><td class="image-td"><a href="http://twitter.com/{{screen_name}}" class="profile-pic"><img src="{{profile_image_url}}"></a></td><td>' +
    '<span class="full-name">{{name}}</span> <a class="screen-name" href="http://twitter.com/{{screen_name}}">@{{screen_name}}</a>' +
    '<div class="tweet-text">{{bio}}</div>' +
  '</td></tr></table></div>';

var twitterPersonTemplate =
  '<div id="person_{{screen_name}}" class="twitter-person" style="display: none;">' +
    '<img class="profile-image" alt="{{screen_name}}" border="0" height="73" id="profile-image" src="{{profile_image_url}}" valign="middle" width="73">' +
    '<a class="person-link" href="http://twitter.com/{{screen_name}}">{{name}}&nbsp;<small>@{{screen_name}}</small></a>' +
    '<div class="role">{{role}}</div>' +
    '{{#askabout}}<div class="meta"><span>Ask about:</span>{{info}}{{/askabout}}' +
    '{{#bio}}<div id="bio" class="meta">{{bio}}</div>{{/bio}}' +
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
  $.each(results, function (screenName, person) {
  });
}

function getTwitterTweets() {
  $.ajax({
    url: "http://api.twitter.com/1/twitter/lists/team/statuses.json?per_page=200",
    dataType: 'jsonp',
    success: function(results) {
      results = uniqueResults(results);
      setTwitterPeople(results);
      // plotTweets(twitterPeople);
      drawPeople(twitterPeople);
      initializeQuestionnaire();
    }
  });
}

function uniqueResults(results) {
  var screenNames = [];
  var tweets = [];

  $.each(results, function(screenName, tweet) {
    var screenName = tweet.user.screen_name;
    var alreadyTweeted = ($.grep(screenNames, function(element, index) {
      return element == screenName;
    }).length > 0)

    if (!alreadyTweeted && tweet.geo != null) {
      screenNames.push(screenName);
      tweets.push(tweet);
    }
  });

  return tweets;
}

function init() {
  var $toMeetLink = $('#tm');

  results = tweeps;
  setTwitterPeople(results);
  // plotTweets(twitterPeople);
  drawPeople(twitterPeople);
  initializeQuestionnaire();
  // getTwitterTweets();

  $toMeetLink.click(function() {
    $twitterPeopleLink.removeClass('current');
    $toMeetLink.addClass('current');
    showQuestionnaire();
  });

  $toMeetLink.trigger('click');
}

// Questionnaire ------------------------------------------------------------------------------------------

function hideQuestionnaire() {
  $('#questionnaire').hide();
  $('#questionnaireResults').hide();
};

function showQuestionnaire() {
  if (questionnaire_complete === true) {
    $('#questionnaireResults').show();
  } else {
    $('#questionnaire').show();
  }
};

function setTwitterPeople(results) {
  $.each(results, function(index, user) {
    if ((user !== undefined) && (twitterPeople[user.screen_name] === undefined)) {
      var screen_name = user.screen_name.toLowerCase();
      twitterPeople[screen_name] = user;

      $.extend(twitterPeople[screen_name], {
        'requestedInterests' : [],
        'text' : this.text,
        'created_at' : timeAgo(this.created_at),
      });
      //
      // if (twitterPeopleMetadata[screen_name] !== undefined) {
      //   $.extend(twitterPeople[screen_name], twitterPeopleMetadata[screen_name]);
      // }
    }
  });
}

function addPerson(screen_name, skill) {
  var personElement = $('#person_' + screen_name );
  var person = twitterPeople[screen_name];
  if (person === undefined) {
    return '';
    // console.log(screen_name + " probably hasn't tweeted recently, and so isn't in twitterPeople.");
  } else {
    person.requestedInterests.push(skill);
    personElement.show();
    $("#donebutton").removeClass('disabled');
  }
}

function removePerson(screen_name, skill) {
  var personElement = $('#person_' + screen_name );
  var person = twitterPeople[screen_name];

  if (!person === undefined) {
    var filteredInterests = $.grep(twitterPeople[screen_name].requestedInterests, function(value, index) {
       return value != skill;
     });
     if (filteredInterests.length <= 0) { personElement.hide(); }
     twitterPeople[screen_name].requestedInterests = filteredInterests;
  }
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
    questionnaire_complete = true;
    hideQuestionnaire();
    $('#questionnaireResults').show();
    $twitterPeopleLink.removeClass('selected');
    $toMeetLink.addClass('selected');
  });
}
