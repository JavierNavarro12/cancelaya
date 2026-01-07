export interface Transaccion {
  fecha: string;
  concepto: string;
  cantidad: number;
  tipo: 'cargo' | 'abono';
}

export interface Suscripcion {
  id: string;
  nombre: string;
  cantidad: number;
  frecuencia: 'mensual' | 'anual' | 'semanal' | 'trimestral';
  categoria: 'streaming' | 'gimnasio' | 'software' | 'telefonia' | 'seguros' | 'banca' | 'otros';
  confianza: 'alta' | 'media' | 'baja';
  urlCancelacion?: string;
  logoUrl?: string;
  gastoAnual: number;
}

export interface ResultadoAnalisis {
  suscripciones: Suscripcion[];
  gastoMensualTotal: number;
  gastoAnualTotal: number;
  bancoDetectado?: string;
  fechaAnalisis: string;
}

export interface ArchivoSubido {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'csv' | 'xlsx';
  tamaño: number;
  contenido?: string;
  estado: 'pendiente' | 'procesando' | 'completado' | 'error';
  error?: string;
  file: File; // El archivo real para enviar al servidor
}

export interface Testimonio {
  id: string;
  usuario: string;
  handle: string;
  avatar: string;
  texto: string;
  ahorro: string;
  fecha: string;
}

export type EstadoApp = 'inicio' | 'subiendo' | 'analizando' | 'resultados' | 'error';
