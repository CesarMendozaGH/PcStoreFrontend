

import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { ProductosComponent } from './pages/productos/productos';



export const routes: Routes = [
  { path: '', component: Inicio }, 
  { path: 'productos', component: ProductosComponent }, 
  { path: '**', redirectTo: '' }
];

