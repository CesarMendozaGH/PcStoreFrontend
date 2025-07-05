// src/app/interfaces/producto.interface.ts
export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion?: string; // Es opcional en tu BD
  precio: number;
  urlImagen?: string; // Es opcional en tu BD
  categoria: string; // Es un string directamente en tu modelo de BD
  fechaCreacion?: string; // Fecha en formato string (ej. ISO 8601)
  // Si incluyes fecha_actualizacion en tu BD, añádela aquí también:
  // fechaActualizacion?: string;
}
