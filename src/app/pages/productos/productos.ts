import { Component, OnInit } from '@angular/core';
import { ProductosApiService, Producto } from '../../services/productos-api.service';
import { CommonModule } from '@angular/common'; 
import { BuscadorComponent } from '../../components/buscador/buscador'; 
import { ListadoProductos } from '../../components/listado-productos/listado-productos';

@Component({
  selector: 'app-productos',
  standalone: true, 
  imports: [CommonModule, BuscadorComponent, ListadoProductos], 
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

  
    //Carga los productos desde la API, aplicando los filtros de búsqueda y categoría actuales

  loadProductos(): void {
    this.productosApi.getProductos(this.currentSearchTerm, this.currentCategoryName)
      .subscribe({
        next: (data) => {
          this.productos = data; // Asigna los datos recibidos a la propiedad productos
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
        }
      });
  }

  onSearchChanged(searchTerm: string): void {
    this.currentSearchTerm = searchTerm;
    this.loadProductos(); 
  }

  
  onCategorySelected(categoryName: string | null): void {
    this.currentCategoryName = categoryName;
    this.loadProductos();
  }
}
