/*jslint white: true, indent: 2, browser: true,  */
/*global google, map, Mustache, $ */

var questionnaireSelectTemplate =
  '<li id="{{id}}">{{name}}' +
    '<input type="checkbox" id="select_{{id}}" name="questionnaire[{{id}}]" value="" style="display:none;"/>' +
  '</li>';

var questionSelections = [
  { id: 'scaling',      name: 'Scaling for millions of people' },
  { id: 'visualizing',  name: 'Visualizing a ton of data' },
  { id: 'partners',     name: 'Helping major companies use Twitter'}
];

function elementSelected(listElement) {
  listElement.find('input[type="checkbox"]').attr("value", "checked");
  listElement.addClass('selected');
  listElement.click(function () {
    elementUnselected(listElement);
  });
}

function elementUnselected(listElement) {
   listElement.find('input[type="checkbox"]').attr("value", "");
   listElement.removeClass('selected');
   listElement.click(function () {
     elementSelected(listElement);
   });
}

function initializeQuestionnaire () {
  var formSelections = $("form#questionnaire ul");

  $.each(questionSelections, function () {
    var listElement = $(Mustache.to_html(questionnaireSelectTemplate, this));
    listElement.click(function () {
      elementSelected(listElement)
    });
    formSelections.append(listElement);
  });
}
