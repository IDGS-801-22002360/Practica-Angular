import { RouterOutlet } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  title = 'conexion con Nestjs y Angular';
  datosNest: any = null;
  errorConection: string | null = null;

  //  Primero, se inyecta el ApiService en el constructor
  constructor(private apiService: ApiService) { }

  //	Despues se llama al metodo al inicialr el componente
  ngOnInit(): void {
    this.obtenerDatosDeApi();
  }

  obtenerDatosDeApi(): void {
    console.log('Conectando con NestJs');

    this.apiService.getDatos().subscribe({
      next: (response) => {
        this.datosNest = response;
        console.log('Datos recibidos de la API:', this.datosNest);
      },
      error: (error) => {
        console.error('Error al conectar con la API:', error);
        this.errorConection = 'No se pudo conectar con la API.';
      }
    });
  }
}
