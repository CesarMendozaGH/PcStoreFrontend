import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interfaces'; // Importa la interfaz Producto

@Injectable({
  providedIn: 'root'
})
export class ProductosApiService {
  // ¡MUY IMPORTANTE! Reemplaza esta URL con la URL REAL de tu API de ASP.NET Core.
  // Generalmente es algo como https://localhost:7048 o un puerto similar.
  private apiUrl = 'https://localhost:7199/api/Productos';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista de productos de la API.
   * Permite filtrar por término de búsqueda (nombre/descripción) y por nombre de categoría.
   * @param searchTerm Término para buscar en nombre o descripción del producto.
   * @param categoryName Nombre de la categoría para filtrar. Ahora acepta 'string | null'.
   * @returns Un Observable que emite un array de Productos.
   */
  getProductos(searchTerm?: string, categoryName?: string | null): Observable<Producto[]> {
    let params = new HttpParams();

    // Añade el parámetro 'search' si se proporciona un término de búsqueda
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    // Añade el parámetro 'categoryName' solo si no es null y no es undefined
    // HttpParams.set espera un string, por eso la verificación explícita.
    if (categoryName !== null && categoryName !== undefined) {
      params = params.set('categoryName', categoryName);
    }

    // Realiza la petición GET a la API con los parámetros construidos
    return this.http.get<Producto[]>(this.apiUrl, { params });
  }

  /**
   * Obtiene un solo producto por su ID.
   * @param id El ID del producto a obtener.
   * @returns Un Observable que emite un solo Producto.
   */
  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Si decides crear un CategoriesController en el backend, aquí podrías tener un método para obtener categorías:
  // getCategorias(): Observable<Categoria[]> {
  //   const categoriasApiUrl = 'https://localhost:7048/api/Categorias'; // URL de tu API de Categorías
  //   return this.http.get<Categoria[]>(categoriasApiUrl);
  // }
}

export type { Producto };
