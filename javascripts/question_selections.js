var questionSelections = [
  [ 'Which of these sound like awesome things to work on?',
    [ { id: 'scaling',      name: 'Scaling for millions of people', people: ['bs'] },
      { id: 'visualizing',  name: 'Visualizing a ton of data', people: ['k', 'hoverbird']},
      { id: 'partners',     name: 'Helping major companies use Twitter', people: []} ]
  ],

  [ 'What are you interested in?',
    [ { id: 'bizdev',       name: 'Business development', people: ['bs', 'hoverbird'] },
      { id: 'engineering',  name: 'Engineering', people: ['k'] },
      { id: 'product',      name: 'Product Management', people: [] },
      { id: 'research',     name: 'Research', people: []} ]
  ],

  [ 'Where do you live?',
    [ { id: 'doesntmatter', name: "It doesn't matter to us", people: [] } ]
  ]
];

var twitterPeople = {
 'hoverbird' : {
   info: 'Software Engineer on the webclient team.',
   avatar_src : 'http://a3.twimg.com/profile_images/468646545/cropped_bigger.jpg',
   requestedInterests: []
 },

 'bs' : {
   info : 'Tech lead on the webclient team',
   avatar_src : 'http://a3.twimg.com/profile_images/680920979/3832491393_5edffb69e7_bigger.jpg',
   requestedInterests: []
 },

 'k' : {
   info : 'Product Manager of the webclient team',
   avatar_src : 'http://a3.twimg.com/profile_images/562626215/plain_bigger.jpeg',
   requestedInterests: []
 }
};
