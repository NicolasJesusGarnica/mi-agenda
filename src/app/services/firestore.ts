import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore'; // Importamos addDoc
import { Observable } from 'rxjs';

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private usuariosCollection = collection(this.firestore, 'usuarios');

  getUsuarios(): Observable<Usuario[]> {
    return collectionData(this.usuariosCollection, { idField: 'id' }) as Observable<Usuario[]>;
  }

  // Función para subir datos a Firebase
  agregarUsuario(usuario: Usuario) {
    return addDoc(this.usuariosCollection, usuario);
  }
}