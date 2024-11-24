import { Injectable } from '@angular/core';
import { User } from '../pages/models/user.models';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  // Método para crear un nuevo usuario en Firestore
  createUser(uid: string, userData: User) {
    // 1. Obtener la referencia al documento en la colección 'users' con el UID del usuario
    const userDocRef = doc(this.firestore, `users/${uid}`);

    // 2. Usar setDoc para almacenar los datos del usuario en el documento
    return setDoc(userDocRef, userData);
  }

  // Método para obtener los datos de un usuario por su UID
  async getUser(uid: string) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  async updateUser(userId: string, data: any): Promise<void> {
    const userRef = doc(this.firestore, 'users', userId);
    await updateDoc(userRef, data);
  }

  async agregarDocumento(coleccion: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, coleccion);
    await setDoc(docRef, data);
  }
}
