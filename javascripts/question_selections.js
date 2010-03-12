/*jslint white: false  */
// stirman, zhanna, kevinweil, sean, jenna, kevinthau, crystal, ed, chloe, sarah, eweil, rsarver, stirman

var questionSelections = [
  [ 'Which of these sound like awesome things to work on?',
    [ { id: 'scaling',          name: 'Scaling for millions of people', people: ['jna', 'bs', 'hoverbird'] },
      { id: 'visualizing',      name: 'Visualizing a ton of data', people: ['k', 'zhanna', 'stirman']},
      { id: 'patterns',         name: 'Seeing patterns in a sea of data', people: ['kevinweil']},
      { id: 'communication',    name: 'Changing the way we communicate', people: ['jenna', 'sean']},
      { id: 'opensource',       name: 'Large-scale open source projects', people: ['hoverbird']},
      { id: 'partners',         name: 'Making fast and sexy web applications', people: ['zhanna', 'k', 'bs', 'hoverbird']},
      { id: 'sexy_ux',          name: 'Designing innovative and intuitive UIs', people: ['trammell', 'zhanna']},
      { id: 'mobile',           name: 'Creating an international mobile platform', people: ['kevinthau']},
      { id: 'mediacompanies',   name: 'Helping media companies tell stories with tweets', people: ['chloe', 'robin']},
      { id: 'journalism',       name: 'Transforming journalism', people: ['chloe', 'robin']},
      { id: 'usersupport',      name: 'Helping users who are having trouble', people: ['crystal', 'ed']},
      { id: 'internalops',      name: 'Building tools to scale internal operations', people: ['sarah', 'jna']},
      { id: 'realtimepartners', name: 'Partnering with twitter to deliver real-time solutions', people: ['rsarver', 'jess', 'eweil']},
      { id: 'predictingcatastrophe',  name: "Figuring out what's going to go horribly wrong before it does", people: ['delbius', 'jna']},
      { id: 'spam',                   name: "Preventing spam and abuse from overtaking an open system", people: ['delbius']},
      { id: 'internaltools',          name: 'Designing, building and deploying killer internal tools', people: ['bs', 'stirman']}
    ]
  ],

  [ 'Where do you live?',
    [ { id: 'doesntmatter', name: "It doesn't matter to us", people: [] } ]
  ]
];

var twitterPeopleMetadata = {
  'hoverbird': {
    info: 'Our agile development process. Building the most used Twitter client. Frontend engineering positions. Boardgames, not basketball.'
  },

  'bs': {
    info: "Working at Twitter to create beauty in web applications. How we're innovating Twitter.com. The backend of the frontend; the frontend of the backend. Passion and craftsmanship in software development. Global hacking. My dog. Greg's mom."
  },

  'k': {
   info : 'Product development process at Twitter; Frontend engineering and product manager opportunities; Good spots for BBQ in Austin; How to rock SxSW.'
  },

  'jennadawn': {
    info: "	Embodying the spirit and the voice of Twitter through marketing and comms. SxSW newbie!"
  },

  'stirman': {
    info: "Data visualization, project management, internal tools, code that makes art, University of Texas Football!"
  },

  'chloes': {
    info: "Media partnerships at Twitter. I collaborate with our news, TV, entertainment & sports partners to create captivating interactive media experiences. Talk to me about curation back-end tools, front-end data viz, how to make live events awesomer, & Twitter's power to flock and amplify your audience."
  },

  'eweil': {
    info: "Corporate Development and Business Development at Twitter. Talk to me about @anywhere and how you can integrate Twitter. Looking to meet awesome companies in the Twittersphere. And, always on the hunt for awesome folks to join our Twitter team."
  },

  'sg': {
    info: "New-ish Twitter communications lead. Let's talk media folks. And, looking to build a remarkable comms team. Likes chilaquiles and Shiner."
  },

  'kweil': {
    info: "Twitter analytics, data visualization, hadoop, engineering process, being multi-disciplinary at Twitter, company culture, hiring great people."
  },

  'trammell': {
    info: "Design research. Eighth-straight SxSW."
  },

  'zhanna': {
    info: "Design; UX strategy at Twitter."
  },

  'bakari': {
    info: "Business and legal affairs. Legal jujitsu such as partnerships in the media, music, geo and platform space."
  },

  'jna': {
    info: "How we grow Twitter and its server farm to support millions of users daily, all while avoiding the fail whale. I'm looking for great people to join our Operations team."
  },

  'delbius': {
    info: "Trust and Safety at Twitter, legalities, policy, abuse, and security. Expecting and planning for the worst. Also, the art of always checking your email."
  },

  'crystal': {
    info: 'Building intuitive, scalable self help systems for people using Twitter.'
  },

  'sarah': {
    info: 'Engineering at Twitter, internal tools, video games, Canadians!'
  },

  'ev': {
    info: 'Twitter.'
  },

  'kthau': {
    info: 'Twitter on mobile platforms.'
  },

  'rsarver': {
    info: "Community building, integrating Twitter into websites and apps, building tools for developers,	the firehose, the API roadmap, the Chirp conference."
  },

  'robin': {
    info: "The intersection of Twitter and media. Ideas and tools that help media companies use the power of Twitter to improve and accelerate everything they do. Brunch at Moonshine."
  }
};
