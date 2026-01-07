import { NextRequest, NextResponse } from 'next/server';
import { parsearArchivo, detectarBanco } from '@/lib/parsers';
import { analizarTransacciones } from '@/lib/ai/analizar-suscripciones';

export const maxDuration = 60; // Timeout de 60 segundos para Vercel

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const archivos = formData.getAll('archivos') as File[];

    if (!archivos || archivos.length === 0) {
      return NextResponse.json(
        { error: 'No se han proporcionado archivos' },
        { status: 400 }
      );
    }

    // Verificar que tenemos la API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'API de OpenAI no configurada. Añade OPENAI_API_KEY a tu .env.local' },
        { status: 500 }
      );
    }

    // Procesar todos los archivos
    const contenidosParseados: string[] = [];
    let bancoDetectado: string | undefined;

    for (const archivo of archivos) {
      // Validar tamaño (máximo 10MB por archivo)
      if (archivo.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: `El archivo ${archivo.name} es demasiado grande (máximo 10MB)` },
          { status: 400 }
        );
      }

      // Validar tipo de archivo
      const extension = archivo.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'csv', 'xlsx', 'xls'].includes(extension || '')) {
        return NextResponse.json(
          { error: `Formato no soportado: ${extension}. Usa PDF, CSV o Excel.` },
          { status: 400 }
        );
      }

      // Convertir a Buffer y parsear
      const buffer = Buffer.from(await archivo.arrayBuffer());
      const contenido = await parsearArchivo(buffer, archivo.name);

      contenidosParseados.push(`\n--- Archivo: ${archivo.name} ---\n${contenido}`);

      // Intentar detectar el banco
      if (!bancoDetectado) {
        bancoDetectado = detectarBanco(contenido);
      }
    }

    // Unir todo el contenido
    const contenidoTotal = contenidosParseados.join('\n\n');

    // Limitar el contenido para no exceder tokens de OpenAI
    const contenidoLimitado = contenidoTotal.slice(0, 50000);

    // Analizar con OpenAI
    const resultado = await analizarTransacciones(contenidoLimitado);

    // Añadir banco detectado
    resultado.bancoDetectado = bancoDetectado;

    return NextResponse.json(resultado);
  } catch (error) {
    console.error('Error en API de análisis:', error);

    const mensaje = error instanceof Error ? error.message : 'Error desconocido';

    return NextResponse.json(
      { error: mensaje },
      { status: 500 }
    );
  }
}
