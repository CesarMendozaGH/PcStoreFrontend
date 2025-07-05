import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/producto.interfaces';

@Component({
          selector: 'app-listado-productos',
          standalone: true, 
          imports: [CommonModule],
          templateUrl: './listado-productos.html', 
          styleUrls: ['./listado-productos.css'] 
        })
export class ListadoProductos {
 @Input() productos: Producto[] = [];

  constructor() { }
}
