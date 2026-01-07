interface InfoSuscripcion {
  nombre: string;
  url: string;
  patron: RegExp;
  categoria: 'streaming' | 'gimnasio' | 'software' | 'telefonia' | 'seguros' | 'banca' | 'otros';
}

export const suscripcionesConocidas: Record<string, InfoSuscripcion> = {
  // Streaming
  netflix: {
    nombre: 'Netflix',
    url: 'https://www.netflix.com/cancelar',
    patron: /netflix/i,
    categoria: 'streaming',
  },
  hbo: {
    nombre: 'HBO Max',
    url: 'https://www.max.com/es/es/account',
    patron: /hbo|max\.com/i,
    categoria: 'streaming',
  },
  disney: {
    nombre: 'Disney+',
    url: 'https://www.disneyplus.com/es-es/account',
    patron: /disney/i,
    categoria: 'streaming',
  },
  prime: {
    nombre: 'Amazon Prime',
    url: 'https://www.amazon.es/gp/primecentral',
    patron: /amazon.*prime|prime.*video|amzn/i,
    categoria: 'streaming',
  },
  spotify: {
    nombre: 'Spotify',
    url: 'https://www.spotify.com/es/account/subscription/',
    patron: /spotify/i,
    categoria: 'streaming',
  },
  apple: {
    nombre: 'Apple Services',
    url: 'https://support.apple.com/es-es/HT202039',
    patron: /apple\.com|itunes|apple music|apple tv|apple one/i,
    categoria: 'software',
  },
  youtube: {
    nombre: 'YouTube Premium',
    url: 'https://www.youtube.com/paid_memberships',
    patron: /youtube|google.*youtube/i,
    categoria: 'streaming',
  },
  filmin: {
    nombre: 'Filmin',
    url: 'https://www.filmin.es/usuario/suscripcion',
    patron: /filmin/i,
    categoria: 'streaming',
  },
  dazn: {
    nombre: 'DAZN',
    url: 'https://www.dazn.com/es-ES/account/subscription',
    patron: /dazn/i,
    categoria: 'streaming',
  },
  movistarplus: {
    nombre: 'Movistar Plus+',
    url: 'https://www.movistarplus.es/cuenta',
    patron: /movistar.*plus/i,
    categoria: 'streaming',
  },

  // Gimnasios España
  basicfit: {
    nombre: 'Basic-Fit',
    url: 'https://www.basic-fit.com/es-es/my-basic-fit/membership',
    patron: /basic.?fit/i,
    categoria: 'gimnasio',
  },
  mcfit: {
    nombre: 'McFit / RSG Group',
    url: 'https://www.mcfit.com/es/contacto/',
    patron: /mcfit|rsg.*group/i,
    categoria: 'gimnasio',
  },
  altafit: {
    nombre: 'Altafit',
    url: 'https://altafitgymclub.com/contacto/',
    patron: /altafit/i,
    categoria: 'gimnasio',
  },
  viva: {
    nombre: 'VivaGym',
    url: 'https://vivagym.es/contacto/',
    patron: /viva.*gym/i,
    categoria: 'gimnasio',
  },
  dir: {
    nombre: 'DiR',
    url: 'https://www.dir.cat/contacto',
    patron: /dir.*fitness|dir.*gym/i,
    categoria: 'gimnasio',
  },
  anytime: {
    nombre: 'Anytime Fitness',
    url: 'https://www.anytimefitness.es/',
    patron: /anytime.*fitness/i,
    categoria: 'gimnasio',
  },
  // Telefonía España
  movistar: {
    nombre: 'Movistar',
    url: 'https://www.movistar.es/particulares/centro-de-ayuda/',
    patron: /movistar|telefonica/i,
    categoria: 'telefonia',
  },
  vodafone: {
    nombre: 'Vodafone',
    url: 'https://www.vodafone.es/c/particulares/es/mi-vodafone/',
    patron: /vodafone/i,
    categoria: 'telefonia',
  },
  orange: {
    nombre: 'Orange',
    url: 'https://www.orange.es/area-cliente/',
    patron: /orange/i,
    categoria: 'telefonia',
  },
  masmovil: {
    nombre: 'MásMóvil',
    url: 'https://www.masmovil.es/area-cliente/',
    patron: /masmovil|mas.*movil/i,
    categoria: 'telefonia',
  },
  yoigo: {
    nombre: 'Yoigo',
    url: 'https://www.yoigo.com/mi-yoigo/',
    patron: /yoigo/i,
    categoria: 'telefonia',
  },
  pepephone: {
    nombre: 'Pepephone',
    url: 'https://www.pepephone.com/mi-cuenta/',
    patron: /pepephone/i,
    categoria: 'telefonia',
  },
  lowi: {
    nombre: 'Lowi',
    url: 'https://www.lowi.es/area-cliente/',
    patron: /lowi/i,
    categoria: 'telefonia',
  },

  // Software / Apps
  chatgpt: {
    nombre: 'ChatGPT Plus',
    url: 'https://chat.openai.com/settings/subscription',
    patron: /openai|chatgpt/i,
    categoria: 'software',
  },
  claude: {
    nombre: 'Claude Pro',
    url: 'https://claude.ai/settings/billing',
    patron: /anthropic|claude/i,
    categoria: 'software',
  },
  notion: {
    nombre: 'Notion',
    url: 'https://www.notion.so/my-account/plans',
    patron: /notion/i,
    categoria: 'software',
  },
  canva: {
    nombre: 'Canva Pro',
    url: 'https://www.canva.com/settings/billing',
    patron: /canva/i,
    categoria: 'software',
  },
  adobe: {
    nombre: 'Adobe Creative Cloud',
    url: 'https://account.adobe.com/plans',
    patron: /adobe/i,
    categoria: 'software',
  },
  microsoft: {
    nombre: 'Microsoft 365',
    url: 'https://account.microsoft.com/services/',
    patron: /microsoft|office.*365|ms.*365/i,
    categoria: 'software',
  },
  dropbox: {
    nombre: 'Dropbox',
    url: 'https://www.dropbox.com/account/plan',
    patron: /dropbox/i,
    categoria: 'software',
  },
  google: {
    nombre: 'Google One',
    url: 'https://one.google.com/settings',
    patron: /google.*one|google.*storage/i,
    categoria: 'software',
  },
  icloud: {
    nombre: 'iCloud+',
    url: 'https://support.apple.com/es-es/HT201318',
    patron: /icloud/i,
    categoria: 'software',
  },
  github: {
    nombre: 'GitHub',
    url: 'https://github.com/settings/billing/plans',
    patron: /github/i,
    categoria: 'software',
  },
  cursor: {
    nombre: 'Cursor',
    url: 'https://cursor.com/settings',
    patron: /cursor/i,
    categoria: 'software',
  },
  ionos: {
    nombre: 'IONOS',
    url: 'https://my.ionos.es/contracts',
    patron: /ionos/i,
    categoria: 'software',
  },

  // Seguros
  mapfre: {
    nombre: 'Mapfre',
    url: 'https://www.mapfre.es/particulares/',
    patron: /mapfre/i,
    categoria: 'seguros',
  },
  axa: {
    nombre: 'AXA',
    url: 'https://www.axa.es/area-cliente',
    patron: /axa/i,
    categoria: 'seguros',
  },
  allianz: {
    nombre: 'Allianz',
    url: 'https://www.allianz.es/area-cliente/',
    patron: /allianz/i,
    categoria: 'seguros',
  },
  sanitas: {
    nombre: 'Sanitas',
    url: 'https://www.sanitas.es/area-cliente/',
    patron: /sanitas/i,
    categoria: 'seguros',
  },
  dkv: {
    nombre: 'DKV',
    url: 'https://www.dkvseguros.com/area-cliente',
    patron: /dkv/i,
    categoria: 'seguros',
  },
  asisa: {
    nombre: 'Asisa',
    url: 'https://www.asisa.es/area-cliente/',
    patron: /asisa/i,
    categoria: 'seguros',
  },

  // Otros
  glovo: {
    nombre: 'Glovo Prime',
    url: 'https://glovoapp.com/es/profile/prime',
    patron: /glovo/i,
    categoria: 'otros',
  },
  uber: {
    nombre: 'Uber One',
    url: 'https://www.uber.com/es/es/u/uber-one/',
    patron: /uber.*one|uber.*pass/i,
    categoria: 'otros',
  },
  audible: {
    nombre: 'Audible',
    url: 'https://www.audible.es/account/overview',
    patron: /audible/i,
    categoria: 'otros',
  },
  kindle: {
    nombre: 'Kindle Unlimited',
    url: 'https://www.amazon.es/kindle-dbs/hz/subscribe/ku',
    patron: /kindle.*unlimited/i,
    categoria: 'otros',
  },
};

export function buscarSuscripcion(concepto: string): InfoSuscripcion | null {
  const conceptoLower = concepto.toLowerCase();

  for (const [, info] of Object.entries(suscripcionesConocidas)) {
    if (info.patron.test(conceptoLower)) {
      return info;
    }
  }

  return null;
}

export function obtenerUrlCancelacion(nombreSuscripcion: string): string | undefined {
  const info = buscarSuscripcion(nombreSuscripcion);
  return info?.url;
}
