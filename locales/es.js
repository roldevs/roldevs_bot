'use strict';

const Locales = {
  commands: {
    description: {
      aoa: 'Oráculo (Pregunta de acción)',
      aoas: 'Escena Alterada',
      aod: 'Oráculo (Pregunta de Descripción)',
      aoe: 'Evento Aleatorio',
      aohm: 'Movimiento Duro',
      aonm: 'Movimiento de PNJ o Enemigo',
      aopm: 'Movimiento de Estimulación',
      aoq: 'Oráculo (Pregunta Sí/No)',
      aosc: 'Complicación de Escena',
      aosm: 'Movimiento Suave',
    },
    usage: {
      aoq: 'Seguramente: 0, Normalmente: 1, Improbable: 2',
    },
  },
  no: 'No',
  yes: 'Si',
  yesAnd: 'Si, y...',
  yesBut: 'Si, pero...',
  event: [
    [
      'Acción de un aliado',
      'Descubrimiento',
      'Acción de un enemigo',
      'Expectadores',
      'Trama actual',
      'Nuevo enemigo',
      'Trama paralela',
      'Nuevo aliado',
      'Entorno',
      'Nuevo peligro',
      'Objeto',
      'Evento extraño',
      'Evento remoto'
    ], [
      'activo, agresivo, negativo',
      'transformador, esperado',
      'misterioso, inesperado',
      'pasivo, dócil, positivo'
    ]
  ],
  action: [
    [
      'Buscar',
      'Fallar',
      'Oponer',
      'Coger',
      'Comunicar',
      'Abandonar',
      'Mover',
      'Asistir',
      'Dañar',
      'Cambiar',
      'Crear',
      'Egañar',
      'Plan',
    ], [
      'físico, duro, construído',
      'mental, tramando, técnico',
      'mágico, intuitivo, extraño',
      'personal, social, emocional',
    ]
  ],
  description: [
    [
      'Pequeño',
      'Desagradable',
      'Grande',
      'Especializado',
      'Viejo',
      'Inesperado',
      'Nuevo',
      'Exótico',
      'Mundano',
      'Dignificado',
      'Simple',
      'Unico',
      'Complejo',
    ], [
      'aspecto, diseño',
      'calidad, opeación',
      'propósito, función',
      'significado, significación',
    ]
  ],
  scene_complication: [
    'Conflict - fuerzas hostiles se oponen',
    'Obstaculo - algo te esta bloqueando el camino',
    'Complicación - ahí hay algo que apesta',
    'Comportamiento - un NPC actúa derrepente',
    'Misterio - no todo es lo que parece',
    'Ninguna - todo marcha según lo previsto'
  ],
  altered_scene: [
    'Un detalle importante de la escena es resaltado o va a peor.',
    'El entorno es diferente.',
    'Hay PNJs inesperados en la escena.',
    'Añadir una COMPLICACIÓN DE ESCENA.',
    'Añadir un EVENTO ALEATORIO.',
    'Añadir un MOVIMIENTO DE ESTIMULACIÓN.',
  ],
  pacing_move: [
    'Muestra señales de una amenaza inminente',
    'Revelar un nuevo detalle',
    'Un PNJ hace algo',
    'Hacer avanzar una amenaza',
    'Hacer avanzar una trama',
    'Añadir un EVENTO ALEATORIA a la escena',
  ],
  soft_move: [
    'Muestra señales de una amenaza inminente',
    'Poner a alguien en el punto de mira',
    'Ofrece una oportunidad, con o sin coste.',
    'Hacer avanzar una amenaza',
    'Revela una verdad incómoda',
    'Imponer un coste',
  ],
  hard_move: [
    'Hacer daño',
    'Hacer daño',
    'Romper algo',
    'Gastar recursos',
    'El movimiento fracasa',
    'Una amenaza tiene éxito',
  ],
  npc_move: [
    'Obvio, pasivo',
    'Obvio, activo',
    'Usar una abilidad especial',
    'Buscar una ventaja',
    'Actuar sobre un rasgo de personalidad',
    'Inesperado o perspicaz',
  ]
};

module.exports = Locales;
