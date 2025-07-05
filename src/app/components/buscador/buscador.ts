import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductosApiService } from '../../services/productos-api.service'; // Para obtener categorías únicas
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]

@Component({
  selector: 'app-buscador',
  standalone: true, // Este componente es standalone
  imports: [CommonModule, FormsModule], // Importa los módulos necesarios
  templateUrl: './buscador.html',
  styleUrls: ['./buscador.css']
})
export class BuscadorComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string | null = null;
  availableCategories: string[] = []; // Para almacenar las categorías únicas extraídas de los productos
  private searchInputSubject = new Subject<string>(); // Subject para el debounce de la búsqueda

  @Output() searchChanged = new EventEmitter<string>(); // Emite el término de búsqueda
  @Output() categorySelected = new EventEmitter<string | null>(); // Emite el nombre de la categoría seleccionada

  constructor(private productosApi: ProductosApiService) { }

  ngOnInit(): void {
    // Configura el debounce para el input de búsqueda
    this.searchInputSubject.pipe(
      debounceTime(300), // Espera 300ms después de la última pulsación de tecla
      distinctUntilChanged() // Solo emite si el valor actual es diferente al último
    ).subscribe(term => {
      this.searchChanged.emit(term); // Emite el término de búsqueda al componente padre
    });

    this.loadUniqueCategories(); // Carga las categorías únicas al iniciar el componente
  }

  /**
   * Emite el término de búsqueda al componente padre después de un debounce.
   * Se llama cada vez que el usuario escribe en el input.
   */
  onSearchInputChange(): void {
    this.searchInputSubject.next(this.searchTerm);
  }

  /**
   * Emite la categoría seleccionada al componente padre.
   * Se llama cuando el usuario hace clic en un botón de categoría.
   * @param category El nombre de la categoría seleccionada (o null para "Todas").
   */
  selectCategory(category: string | null): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category); // Emite el nombre de la categoría
  }

  /**
   * Carga las categorías únicas de los productos existentes en la API.
   * Esto es necesario porque no tenemos una tabla de categorías separada en la BD.
   * Se hace una llamada a la API para obtener todos los productos y extraer las categorías.
   */
  loadUniqueCategories(): void {
    this.productosApi.getProductos().subscribe({
      next: (products) => {
        const categoriesSet = new Set<string>();
        products.forEach(p => {
          if (p.categoria) {
            categoriesSet.add(p.categoria); // Añade la categoría al Set para asegurar unicidad
          }
        });
        this.availableCategories = Array.from(categoriesSet); // Convierte el Set a un array
      },
      error: (err) => {
        console.error('Error al cargar categorías únicas:', err);
        // Puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }
}
