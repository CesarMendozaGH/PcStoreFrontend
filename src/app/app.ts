import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { Cabecera } from './components/cabecera/cabecera';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, // Asegura que este componente es standalone
  imports: [

    RouterOutlet,
    HttpClientModule, // Añadir HttpClientModule aquí
    FormsModule,      // Añadir FormsModule aquí
    Cabecera, // Añadir tus componentes de layout aquí
    Footer    // Añadir tus componentes de layout aquí
  ],
  templateUrl: './app.html', // O './app.component.html' si lo renombraste
  styleUrl: './app.css'      // O './app.component.css' si lo renombraste
})


export class App {
  protected title = 'PcStoreFrontend';
}
