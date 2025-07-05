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
  private searchInputSubject = new Subject<string>();

  // Emitters para comunicar cambios al componente padre
  // Estos eventos se emitirán cuando el usuario cambie el término de búsqueda o seleccione
  @Output() searchChanged = new EventEmitter<string>(); 
  @Output() categorySelected = new EventEmitter<string | null>(); 

  constructor(private productosApi: ProductosApiService) { }

  ngOnInit(): void {
    this.searchInputSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() // Solo emite si el valor actual es diferente al último
    ).subscribe(term => {
      this.searchChanged.emit(term); 
    });

    this.loadUniqueCategories(); 
  }

  //Se llama cada vez que el usuario escribe en el input.
   
  onSearchInputChange(): void {
    this.searchInputSubject.next(this.searchTerm);
  }

  /**
   * Emite la categoría seleccionada al componente padre.
   * @param category El nombre de la categoría seleccionada 
   */
  selectCategory(category: string | null): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category); // Emite el nombre de la categoría
  }

  
    //Carga las categorías únicas de los productos existentes en la API.
   
  loadUniqueCategories(): void {
    this.productosApi.getProductos().subscribe({
      next: (products) => {
        const categoriesSet = new Set<string>();
        products.forEach(p => {
          if (p.categoria) {
            categoriesSet.add(p.categoria); 
          }
        });
        this.availableCategories = Array.from(categoriesSet); // Convierte el Set a un arreglo
      },
      error: (err) => {
        console.error('Error al cargar categorías únicas:', err);
      }
    });
  }
}
