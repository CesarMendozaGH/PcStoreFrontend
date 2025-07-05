// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// import { FormsModule } from '@angular/forms'; // Importar FormsModule
// import { Cabecera } from './components/cabecera/cabecera';
// import { Footer } from './components/footer/footer';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './components/cabecera/cabecera';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [

    RouterOutlet,
    // HttpClientModule, 
    // FormsModule,      
    Cabecera, 
    Footer    
  ],
  templateUrl: './app.html', 
  styleUrl: './app.css'      
})


export class App {
  protected title = 'PcStoreFrontend';
}
