import { Component, OnInit } from '@angular/core';
import { ProductosApiService, Producto } from '../../services/productos-api.service';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf, *ngFor
import { BuscadorComponent } from '../../components/buscador/buscador'; // Importar BuscadorComponent
import { ListadoProductos } from '../../components/listado-productos/listado-productos'; // Importar ListadoProductosComponent

@Component({
  selector: 'app-productos',
  standalone: true, // Este componente es standalone
  imports: [CommonModule, BuscadorComponent, ListadoProductos], // Importa los módulos y componentes necesarios
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = []; // Array para almacenar los productos
  currentSearchTerm: string = ''; // Término de búsqueda actual
  currentCategoryName: string | null = null; // Nombre de categoría actual para filtrar

  constructor(private productosApi: ProductosApiService) { }

  ngOnInit(): void {
    this.loadProductos(); // Carga inicial de productos al iniciar el componente
  }

  /**
   * Carga los productos desde la API, aplicando los filtros de búsqueda y categoría actuales.
   */
  loadProductos(): void {
    this.productosApi.getProductos(this.currentSearchTerm, this.currentCategoryName)
      .subscribe({
        next: (data) => {
          this.productos = data; // Asigna los datos recibidos a la propiedad productos
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
          // Aquí puedes mostrar un mensaje de error al usuario, por ejemplo:
          // this.errorMessage = 'No se pudieron cargar los productos. Inténtelo de nuevo más tarde.';
        }
      });
  }

  /**
   * Maneja el evento cuando el término de búsqueda cambia en el buscador.
   * @param searchTerm El nuevo término de búsqueda.
   */
  onSearchChanged(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    this.loadProductos(); // Recarga los productos con el nuevo término
  }

  /**
   * Maneja el evento cuando una categoría es seleccionada en el buscador.
   * @param categoryName El nombre de la categoría seleccionada (o null para "Todas").
   */
  onCategorySelected(categoryName: string | null): void {
    this.currentCategoryName = categoryName;
    this.loadProductos(); // Recarga los productos con el nuevo filtro de categoría
  }
}
