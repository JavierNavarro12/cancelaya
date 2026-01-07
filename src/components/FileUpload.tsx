'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import type { ArchivoSubido } from '@/types';

interface FileUploadProps {
  onFilesChange: (files: ArchivoSubido[]) => void;
  isProcessing?: boolean;
}

export default function FileUpload({ onFilesChange, isProcessing = false }: FileUploadProps) {
  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const nuevosArchivos: ArchivoSubido[] = acceptedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      nombre: file.name,
      tipo: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? 'xlsx' : 'csv',
      tamaño: file.size,
      estado: 'pendiente' as const,
      file: file, // Guardar el archivo real
    }));

    const archivosActualizados = [...archivos, ...nuevosArchivos];
    setArchivos(archivosActualizados);
    onFilesChange(archivosActualizados);
  }, [archivos, onFilesChange]);

  const eliminarArchivo = (id: string) => {
    const archivosActualizados = archivos.filter(a => a.id !== id);
    setArchivos(archivosActualizados);
    onFilesChange(archivosActualizados);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    disabled: isProcessing,
    multiple: true,
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getIconoEstado = (estado: ArchivoSubido['estado']) => {
    switch (estado) {
      case 'completado':
        return <CheckCircle className="w-5 h-5 text-[var(--success)]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[var(--accent)]" />;
      case 'procesando':
        return <Loader2 className="w-5 h-5 text-[var(--accent)] animate-spin" />;
      default:
        return <FileText className="w-5 h-5 text-[var(--muted)]" />;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          border-editorial rounded-xl p-12 cursor-pointer
          flex flex-col items-center justify-center gap-4
          transition-all duration-300 ease-out
          min-h-[200px]
          ${isDragActive ? 'active scale-[1.01]' : ''}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isDragActive ? 'bg-[var(--accent)] text-white scale-110' : 'bg-[var(--border)]'}
        `}>
          <Upload className={`w-7 h-7 ${isDragActive ? 'text-white' : 'text-[var(--muted)]'}`} />
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-[var(--foreground)]">
            {isDragActive
              ? 'Suelta los archivos aquí'
              : 'Arrastra tus extractos bancarios'}
          </p>
          <p className="text-[var(--muted)] mt-1">
            PDF, CSV o Excel de los últimos 2-3 meses
          </p>
          <p className="text-sm text-[var(--muted)] mt-3">
            Compatible con <span className="font-medium">Openbank</span>, <span className="font-medium">BBVA</span>, <span className="font-medium">Santander</span>, <span className="font-medium">CaixaBank</span>, <span className="font-medium">ING</span> y más
          </p>
        </div>
      </div>

      {/* Lista de archivos */}
      {archivos.length > 0 && (
        <div className="space-y-2 animate-fade-in">
          {archivos.map((archivo, index) => (
            <div
              key={archivo.id}
              className="flex items-center justify-between p-4 bg-[var(--card)] rounded-lg border border-[var(--border)] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                {getIconoEstado(archivo.estado)}
                <div>
                  <p className="font-medium text-[var(--foreground)] text-sm">
                    {archivo.nombre}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {formatBytes(archivo.tamaño)}
                    {archivo.estado === 'procesando' && ' · Analizando...'}
                    {archivo.estado === 'completado' && ' · Completado'}
                    {archivo.estado === 'error' && ` · ${archivo.error || 'Error'}`}
                  </p>
                </div>
              </div>

              {!isProcessing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarArchivo(archivo.id);
                  }}
                  className="p-2 hover:bg-[var(--border)] rounded-lg transition-colors"
                  aria-label="Eliminar archivo"
                >
                  <X className="w-4 h-4 text-[var(--muted)]" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Nota de privacidad */}
      <p className="text-center text-sm text-[var(--muted)]">
        Tus archivos se analizan y se descartan inmediatamente. No almacenamos nada.
      </p>
    </div>
  );
}
