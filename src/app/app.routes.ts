import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Inicio } from './pages/inicio/inicio';
import { ProductosComponent } from './pages/productos/productos';


const routes: Routes = [
  { path: '', component: Inicio }, // Ruta para la Página Principal (ruta vacía)
  { path: 'productos', component: ProductosComponent }, // Ruta para la Galería de Productos
  { path: '**', redirectTo: '' } // Redirige cualquier ruta no encontrada a la página principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
