import OpenAI from 'openai';
import { buscarSuscripcion } from '../suscripciones/enlaces-cancelacion';
import type { Suscripcion, ResultadoAnalisis } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SuscripcionIA {
  nombre: string;
  cantidad: number;
  frecuencia: 'mensual' | 'anual' | 'semanal' | 'trimestral';
  categoria: 'streaming' | 'gimnasio' | 'software' | 'telefonia' | 'seguros' | 'banca' | 'otros';
  confianza: 'alta' | 'media' | 'baja';
}

export async function analizarTransacciones(transaccionesTexto: string): Promise<ResultadoAnalisis> {
  const prompt = `Analiza este extracto bancario español y detecta suscripciones recurrentes.

REGLA DE DETECCIÓN:
Un comercio es suscripción SI aparece 2+ veces con el MISMO importe exacto.

IMPORTANTE - UN COMERCIO PUEDE TENER VARIAS SUSCRIPCIONES:
Si un comercio aparece con diferentes importes fijos (ej: 9.99€ x5 veces Y 6.99€ x4 veces), 
reporta CADA importe recurrente como suscripción separada.

CASO ESPECIAL - SOFTWARE POR USO:
Si un servicio de software/tecnología aparece 5+ veces con importes variables pero similares,
es suscripción por uso. Calcula el promedio mensual.

EXCLUIR (aunque aparezcan varias veces):
- Comida a domicilio (importes siempre diferentes = pedidos, no suscripción)
- Supermercados y tiendas de alimentación
- Restaurantes, bares, cafeterías
- Compras in-app de juegos móviles
- Gasolineras
- Transferencias, bizums, pagos entre particulares

INCLUIR (si cumplen la regla de 2+ apariciones mismo importe):
- Plataformas de streaming y entretenimiento
- Software y herramientas digitales
- Hosting y servicios web
- Recibos domiciliados (suelen empezar con "RECIBO")
- Gimnasios y centros de formación
- Telefonía e internet
- Seguros

Transacciones:
${transaccionesTexto}

RESPUESTA JSON:
[{
  "nombre": "Nombre del comercio tal como aparece",
  "cantidad": 12.99,
  "frecuencia": "mensual",
  "categoria": "streaming|gimnasio|software|telefonia|seguros|otros",
  "confianza": "alta|media|baja"
}]

Confianza: alta (5+ apariciones), media (3-4), baja (2)
Si no hay suscripciones, devuelve [].`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en análisis de extractos bancarios españoles. Tu trabajo es identificar suscripciones recurrentes. Responde siempre en JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.05,
      max_tokens: 3000,
    });

    const contenido = response.choices[0]?.message?.content?.trim() || '[]';

    // Limpiar posible markdown
    let jsonLimpio = contenido;
    if (jsonLimpio.startsWith('```')) {
      jsonLimpio = jsonLimpio.replace(/```json?\n?/g, '').replace(/```/g, '');
    }

    const suscripcionesIA: SuscripcionIA[] = JSON.parse(jsonLimpio);

    // Deduplicar suscripciones por nombre normalizado y cantidad
    const suscripcionesUnicas = deduplicarSuscripciones(suscripcionesIA);

    // Enriquecer con URLs de cancelación
    const suscripciones: Suscripcion[] = suscripcionesUnicas.map((s, index) => {
      const infoConocida = buscarSuscripcion(s.nombre);

      const gastoAnual = calcularGastoAnual(s.cantidad, s.frecuencia);

      return {
        id: `sub-${index}-${Date.now()}`,
        nombre: infoConocida?.nombre || s.nombre,
        cantidad: s.cantidad,
        frecuencia: s.frecuencia,
        categoria: infoConocida?.categoria || s.categoria,
        confianza: s.confianza,
        urlCancelacion: infoConocida?.url,
        gastoAnual,
      };
    });

    // Calcular totales
    const gastoMensualTotal = suscripciones.reduce((total, s) => {
      return total + calcularGastoMensual(s.cantidad, s.frecuencia);
    }, 0);

    const gastoAnualTotal = suscripciones.reduce((total, s) => total + s.gastoAnual, 0);

    return {
      suscripciones,
      gastoMensualTotal,
      gastoAnualTotal,
      fechaAnalisis: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error al analizar transacciones:', error);
    throw new Error('Error al analizar las transacciones. Por favor, inténtalo de nuevo.');
  }
}

function calcularGastoAnual(cantidad: number, frecuencia: string): number {
  switch (frecuencia) {
    case 'semanal':
      return cantidad * 52;
    case 'mensual':
      return cantidad * 12;
    case 'trimestral':
      return cantidad * 4;
    case 'anual':
      return cantidad;
    default:
      return cantidad * 12;
  }
}

function calcularGastoMensual(cantidad: number, frecuencia: string): number {
  switch (frecuencia) {
    case 'semanal':
      return cantidad * 4.33;
    case 'mensual':
      return cantidad;
    case 'trimestral':
      return cantidad / 3;
    case 'anual':
      return cantidad / 12;
    default:
      return cantidad;
  }
}

function deduplicarSuscripciones(suscripciones: SuscripcionIA[]): SuscripcionIA[] {
  const grupos = new Map<string, SuscripcionIA[]>();

  // Agrupar por nombre normalizado
  for (const sub of suscripciones) {
    const nombreNormalizado = normalizarNombreSuscripcion(sub.nombre);
    
    if (!grupos.has(nombreNormalizado)) {
      grupos.set(nombreNormalizado, []);
    }
    grupos.get(nombreNormalizado)!.push(sub);
  }

  // Para cada grupo, decidir cómo consolidar
  const resultado: SuscripcionIA[] = [];
  
  for (const [, grupo] of grupos) {
    if (grupo.length === 1) {
      // Solo una entrada, usar directamente
      resultado.push(grupo[0]);
    } else {
      // Múltiples entradas del mismo servicio
      // Calcular promedio y usar la de mayor confianza como base
      const prioridadConfianza = { alta: 3, media: 2, baja: 1 };
      const mejorConfianza = grupo.reduce((mejor, actual) => 
        prioridadConfianza[actual.confianza] > prioridadConfianza[mejor.confianza] ? actual : mejor
      );
      
      // Calcular promedio de cantidades
      const promedio = grupo.reduce((sum, s) => sum + s.cantidad, 0) / grupo.length;
      
      resultado.push({
        ...mejorConfianza,
        cantidad: Math.round(promedio * 100) / 100, // Redondear a 2 decimales
      });
    }
  }

  return resultado;
}

function normalizarNombreSuscripcion(nombre: string): string {
  const nombreLower = nombre.toLowerCase().trim();

  // Agrupar variantes conocidas de grandes servicios globales
  // Esto evita duplicados cuando el banco muestra nombres diferentes
  
  // Apple (iCloud, iTunes, Apple Music, Apple TV+, Apple One)
  if (/apple|icloud|itunes/.test(nombreLower)) {
    return 'apple';
  }

  // Streaming principales
  if (/netflix/.test(nombreLower)) return 'netflix';
  if (/spotify/.test(nombreLower)) return 'spotify';
  if (/dazn/.test(nombreLower)) return 'dazn';
  if (/hbo|max/.test(nombreLower)) return 'hbo';
  if (/disney/.test(nombreLower)) return 'disney';
  if (/amazon\s*prime/.test(nombreLower)) return 'amazonprime';
  if (/youtube\s*(premium|music)/.test(nombreLower)) return 'youtube';

  // Para cualquier otro servicio, normalizar quitando caracteres especiales
  // Esto agrupa "CURSOR USAGE MID OCT" y "CURSOR, AI POWERED IDE" como el mismo servicio
  return nombreLower.replace(/[^a-z0-9]/g, '');
}
