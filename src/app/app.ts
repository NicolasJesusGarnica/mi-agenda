import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// Asegúrate de que esta ruta coincida con tu archivo (sin .service si no lo tiene)
import { FirestoreService, Usuario } from './services/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private firestoreService = inject(FirestoreService);
  usuarios: Usuario[] = [];

  // Los 9 usuarios que queremos asegurar que estén en la base de datos
  private datosFaltantes: Usuario[] = [
    { nombre: 'Carlos Mendoza', email: 'carlos.m@empresa.com', telefono: '+591 710-2030', ciudad: 'La Paz' },
    { nombre: 'Ana Lucía Torres', email: 'ana.torres@web.net', telefono: '(555) 987-6543', ciudad: 'Bogotá' },
    { nombre: 'Jorge Ramírez', email: 'jorge.dev@code.io', telefono: '099-123-4567', ciudad: 'Lima' },
    { nombre: 'Sofía Fernández', email: 'sofia.f@design.org', telefono: '+34 600 555 111', ciudad: 'Madrid' },
    { nombre: 'Miguel Ángel Ruiz', email: 'migue.ruiz@live.tv', telefono: '1-800-555-0199', ciudad: 'Ciudad de México' },
    { nombre: 'Laura Vargas', email: 'laura.v@marketing.biz', telefono: '(011) 4567-8900', ciudad: 'Buenos Aires' },
    { nombre: 'Diego Silva', email: 'dsilva@startup.co', telefono: '+56 9 8765 4321', ciudad: 'Santiago' },
    { nombre: 'Valentina Castro', email: 'v.castro@escuela.edu', telefono: '300-111-2233', ciudad: 'Medellín' },
    { nombre: 'Roberto Gómez', email: 'roberto.g@tienda.com', telefono: '+58 414-123-4567', ciudad: 'Caracas' }
  ];

  ngOnInit() {
    this.firestoreService.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;

      // Lógica automática: Si solo hay 1 usuario (o 0), subimos el resto automáticamente
      if (this.usuarios.length <= 1) {
        console.log("Detecté que faltan datos. Subiéndolos automáticamente...");
        this.subirRestoDeDatos();
      }
    });
  }

  // Esta función ya no necesita botón, se llama sola
  subirRestoDeDatos() {
    this.datosFaltantes.forEach(u => {
      this.firestoreService.agregarUsuario(u);
    });
  }
}