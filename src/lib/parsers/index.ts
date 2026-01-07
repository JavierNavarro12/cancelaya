import * as XLSX from 'xlsx';

export async function parsearArchivo(
  buffer: Buffer,
  nombreArchivo: string
): Promise<string> {
  const extension = nombreArchivo.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return parsearPDF(buffer);
    case 'csv':
      return parsearCSV(buffer);
    case 'xlsx':
    case 'xls':
      return parsearExcel(buffer);
    default:
      throw new Error(`Formato no soportado: ${extension}`);
  }
}

async function parsearPDF(buffer: Buffer): Promise<string> {
  try {
    const { extractText } = await import('unpdf');
    const uint8Array = new Uint8Array(buffer);
    const result = await extractText(uint8Array);
    // Asegurar que devolvemos un string
    if (typeof result.text === 'string') {
      return result.text;
    }
    // Si es un array, unirlo
    if (Array.isArray(result.text)) {
      return result.text.join('\n');
    }
    return String(result.text || '');
  } catch (error) {
    console.error('Error parseando PDF:', error);
    throw new Error('No se pudo leer el archivo PDF. Asegúrate de que no está protegido.');
  }
}

function parsearCSV(buffer: Buffer): string {
  try {
    const texto = buffer.toString('utf-8');
    // Devolvemos el CSV como texto, OpenAI puede interpretarlo
    return texto;
  } catch (error) {
    console.error('Error parseando CSV:', error);
    throw new Error('No se pudo leer el archivo CSV.');
  }
}

function parsearExcel(buffer: Buffer): string {
  try {
    const contenido = buffer.toString('utf-8');
    
    // Detectar si es HTML disfrazado de Excel (común en bancos españoles como Openbank)
    if (contenido.includes('<!DOCTYPE') || contenido.includes('<html') || contenido.includes('<table')) {
      return parsearHTMLComoExcel(contenido);
    }
    
    // Excel real
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const resultado: string[] = [];

    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      resultado.push(`--- Hoja: ${sheetName} ---\n${csv}`);
    }

    return resultado.join('\n\n');
  } catch (error) {
    console.error('Error parseando Excel:', error);
    throw new Error('No se pudo leer el archivo Excel.');
  }
}

function parsearHTMLComoExcel(html: string): string {
  // Extraer contenido de tablas HTML (formato común de bancos españoles)
  const filas: string[] = [];
  
  // Buscar todas las filas de tabla
  const rowMatches = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
  
  if (!rowMatches) {
    throw new Error('No se encontraron datos en el archivo.');
  }
  
  for (const row of rowMatches) {
    // Extraer celdas (td o th)
    const cellMatches = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi);
    
    if (cellMatches) {
      const celdas = cellMatches.map(cell => {
        // Limpiar HTML y quedarse solo con texto
        return cell
          .replace(/<[^>]+>/g, ' ')  // Quitar tags HTML
          .replace(/&nbsp;/g, ' ')    // Espacios HTML
          .replace(/&euro;/g, '€')    // Símbolo euro
          .replace(/&amp;/g, '&')     // Ampersand
          .replace(/\s+/g, ' ')       // Múltiples espacios
          .trim();
      });
      
      // Solo añadir filas que tengan contenido
      const filaTexto = celdas.filter(c => c.length > 0).join(' | ');
      if (filaTexto.length > 0) {
        filas.push(filaTexto);
      }
    }
  }
  
  return filas.join('\n');
}

// Función para detectar el banco basándose en el contenido
export function detectarBanco(contenido: string): string | undefined {
  const contenidoLower = contenido.toLowerCase();

  const patrones: Record<string, RegExp> = {
    'Openbank': /openbank/i,
    'BBVA': /bbva|banco bilbao/i,
    'Santander': /santander/i,
    'CaixaBank': /caixabank|la caixa/i,
    'ING': /ing direct|ing bank/i,
    'Sabadell': /sabadell/i,
    'Bankinter': /bankinter/i,
    'Unicaja': /unicaja/i,
    'Abanca': /abanca/i,
    'Kutxabank': /kutxabank/i,
    'Revolut': /revolut/i,
    'N26': /n26/i,
  };

  for (const [banco, patron] of Object.entries(patrones)) {
    if (patron.test(contenidoLower)) {
      return banco;
    }
  }

  return undefined;
}
