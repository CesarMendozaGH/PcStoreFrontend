import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto.interfaces';

@Component({
          selector: 'app-listado-productos',
          standalone: true, // ¡Debe ser true!
          imports: [CommonModule], // Asegúrate de esta importación
          templateUrl: './listado-productos.html', // Verifica el nombre del archivo HTML
          styleUrls: ['./listado-productos.css'] // Verifica el nombre del archivo CSS
        })
export class ListadoProductos {
 @Input() productos: Producto[] = [];

  constructor() { }
}
