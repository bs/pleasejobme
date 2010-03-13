/*jslint white: false  */

var questionSelections = [
  [ 'Which of these sound like awesome things to work on?',
    [ { id: 'sexy',             name: 'Making fast and sexy applications', people: ['Zhanna', 'trammell', 'k', 'bs', 'hoverbird', 'kevinthau']},
      { id: 'realtimepartners', name: 'Partnering with Twitter', people: ['jess', 'elizabeth', 'rsarver']},
      { id: 'scaling',          name: 'Scaling for millions of people', people: ['netik', 'bs', 'hoverbird', 'rsarver'] },
      { id: 'communication',    name: 'Changing the way we communicate', people: ['jennadawn', 'sg', 'bs', 'k', 'rsarver']},
      { id: 'journalism',       name: 'Transforming journalism', people: ['ChloeS', 'robinsloan', 'jennadawn', 'sg']},
      { id: 'usersupport',      name: 'Supporting a global audience', people: ['crystal', 'ed', 'trammell']},
      { id: 'internalops',      name: 'Building tools for Twitter & partners', people: ['pandemona', 'stirman', 'bs', 'rsarver', 'jess', 'netik']},
      { id: 'patterns',         name: 'Seeing patterns in a sea of data', people: ['kevinweil', 'stirman', 'k', 'zhanna']},
      { id: 'predictingcatastrophe',  name: "Predicting catastrophes", people: ['delbius', 'netik', 'bakari']}
    ]
  ]
];

var twitterPeopleMetadata = {
  'hoverbird': {
    role: "Software Engineer, Web Client Team",
    info: 'Our agile development process. Building the most used Twitter client. Frontend engineering positions. Boardgames, not basketball.'
  },

  'bs': {
    role: "Tech Lead, Web Client Team",
    info: "Working at Twitter to create beauty in web applications. How we're innovating Twitter.com. The backend of the frontend; the frontend of the backend. Passion and craftsmanship in software development. Global hacking. My dog. Greg's mom."
  },

  'k': {
    role : "Product Manager, Web Client Team",
    info : 'Product development process at Twitter; Frontend engineering and product manager opportunities; Good spots for BBQ in Austin; How to rock SxSW.'
  },

  'jess': {
     role: "Corporate Development",
     info: "Integrating your business withTwitter."
   },

  'jennadawn': {
    role: "Communications",
    info: "	Embodying the spirit and the voice of Twitter through marketing and comms. SxSW newbie!"
  },

  'stirman': {
    role: "Internal Tools",
    info: "Data visualization, project management, internal tools, code that makes art, University of Texas Football!"
  },

  'ChloeS': {
    role: "Media Partnerships",
    info: "I collaborate with our news, TV, entertainment & sports partners to create captivating interactive media experiences. Talk to me about curation back-end tools, front-end data viz, how to make live events awesomer, & Twitter's power to flock and amplify your audience."
  },

  'elizabeth': {
    role: "Corporate Development",
    info: "Talk to me about your business can integrate with Twitter. Looking to meet awesome companies in the Twittersphere. And, always on the hunt for awesome folks to join our Twitter team."
  },

  'SG': {
    role: "Communications",
    info: "New-ish Twitter communications lead. Let's talk media folks. And, looking to build a remarkable comms team. Likes chilaquiles and Shiner."
  },

  'kevinweil': {
    role: "Analytics",
    info: "Twitter analytics, data visualization, hadoop, engineering process, being multi-disciplinary at Twitter, company culture, hiring great people."
  },

  'trammell': {
    role: "Design research.",
    info: "My eighth-straight SxSW."
  },

  'Zhanna': {
    role: "UX Design, Webclient",
    info: "Design; UX strategy at Twitter."
  },

  'Bakari': {
    role: "Legal",
    info: "Business and legal affairs. Legal jujitsu such as partnerships in the media, music, geo and platform space."
  },

  'netik': {
    role: "Operations",
    info: "How we grow Twitter and its server farm to support millions of users daily, all while avoiding the fail whale. I'm looking for great people to join our Operations team."
  },

  'delbius': {
    role: "Trust and Safety",
    info: "Legalities, policy, abuse, and security. Expecting and planning for the worst. Also, the art of always checking your email."
  },

  'crystal': {
    role: "Support",
    info: 'Building intuitive, scalable self help systems for people using Twitter.'
  },

  'pandemona': {
    role: "Support tools",
    info: 'Engineering at Twitter, internal tools, video games, Canadians!'
  },

  'ev': {
    role: "CEO",
    info: 'Twitter.'
  },

  'kevinthau': {
    role: "Mobile",
    info: 'Twitter on mobile platforms.'
  },

  'rsarver': {
    role: "Platform",
    info: "Community building, integrating Twitter into websites and apps, building tools for developers,	the firehose, the API roadmap, the Chirp conference."
  },

  'robinsloan': {
    role: "Media Partnerships",
    info: "The intersection of Twitter and media. Ideas and tools that help media companies use the power of Twitter to improve and accelerate everything they do. Brunch at Moonshine."
  }
};
