/*jslint white: false, browser: true,  */
/*global google, map, Mustache, $ */

var twitterPersonTemplate =
  '<div id="person_{{id}}" class="twitter-person" style="display: none;" data="requestedInterests : []">' +
    '<img alt="" border="0" height="73" id="profile-image" src="{{avatar_src}}" valign="middle" width="73">' +
    '<span>{{info}}</span>' +
  '</div>';

var questionnaireSelectTemplate =
  '<li id="{{id}}">{{name}}' +
    '<input type="checkbox" id="select_{{id}}" name="questionnaire[{{id}}]" value="" style="display:none;"/>' +
  '</li>';

function addPerson(id, skill) {
  var personElement = $('#person_' + id );
  var person = twitterPeople[id];
  if (person === null) {
    console.log("Couldn't find a twitterPerson with ID " + id);
  } else {
    person.requestedInterests.push(skill);
    personElement.show();
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
  $.each(people, function(id, personObject) {
    var twitterPersonObject = $.extend(personObject, {'id' : id});
    var personElement = $(Mustache.to_html(twitterPersonTemplate, twitterPersonObject));
    $('body').append(personElement);
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

  drawPeople(twitterPeople);
}
