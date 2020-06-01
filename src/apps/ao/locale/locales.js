'use strict';

const Locales = {
  description: {
    aoa: 'Oracle (Action Question)',
    aoae: 'Altered Scene',
    aod: 'Oracle (Description Question)',
    aoe: 'Random Event',
    aohm: 'Hard Move',
    aonm: 'NPC and Enemy Move',
    aopm: 'Pacing Move',
    aoq: 'Oracle (Yes/No Question)',
    aosc: 'Scene Complications',
    aosm: 'Soft Moves',
  },
  usage: {
    aoq: 'Likely: 0, Normal: 1, Unlikely: 2',
  },
  no: 'No',
  yes: 'Yes',
  yesAnd: 'Yes, and...',
  yesBut: 'Yes, but...',
  event: [
    [
      'Ally Action',
      'Discovery',
      'Enemy Action',
      'Bystanders',
      'Current Plot',
      'New Enemy',
      'Side Plot',
      'New Ally',
      'Environment',
      'New Hazard',
      'Object',
      'Weird Event',
      'Remote Event'
    ], [
      'active, aggressive, negative',
      'transformative, expected',
      'mysterious, unexpected',
      'passive, docile, positive'
    ]
  ],
  action: [
    [
      'Seek',
      'Fail',
      'Oppose',
      'Take',
      'Communicate',
      'Abandon',
      'Move',
      'Assist',
      'Harm',
      'Change',
      'Create',
      'Deceive',
      'Plan',
    ], [
      'physical, strong, constructed',
      'mental, plotting, technical',
      'magical, intuitive, strange',
      'personal, social, emotional',
    ]
  ],
  description: [
    [
      'Small',
      'Unsavory',
      'Large',
      'Specialized',
      'Old',
      'Unexpected',
      'New',
      'Exotic',
      'Mundane',
      'Dignified',
      'Simple',
      'Unique',
      'Complex',
    ], [
      'looks, design',
      'quality, operation',
      'purpose, function',
      'meaning, significance',
    ]
  ],
  scene_complication: [
    'Conflict – hostile forces oppose you',
    'Obstacle – something blocks the way',
    'Complication – wouldn’t it suck if…',
    'Behavior – an NPC acts suddenly',
    'Mystery – all is not as it seems',
    'None – things actually go as planned    '
  ],
  altered_scene: [
    'A major detail of the scene is enhanced or somehow worse.',
    'The environment is different.',
    'Unexpected NPCs are present.',
    'Add a SCENE COMPLICATION.',
    'Add a RANDOM EVENT.',
    'Add a PACING MOVE.  ',
  ],
  pacing_move: [
    'Foreshadow Trouble',
    'Reveal a New Detail',
    'An NPC Takes Action',
    'Advance a Threat',
    'Advance a Plot',
    'Add a RANDOM EVENT to the scene',
  ],
  soft_move: [
    'Foreshadow Trouble',
    'Put Someone in a Spot',
    'Offer a Choice',
    'Advance a Threat',
    'Reveal an Unwelcome Truth',
    'Impose a Cost',
  ],
  hard_move: [
    'Cause Harm',
    'Cause Harm',
    'Break Something',
    'Use Up Resources',
    'The Move Backfires',
    'A Threat Succeeds',
  ],
  npc_move: [
    'Obvious, passive',
    'Obvious, active',
    'Use a special ability',
    'Seek an advantage',
    'Act on a personality trait',
    'Unexpected or insightful  ',
  ]
};

module.exports = Locales;
