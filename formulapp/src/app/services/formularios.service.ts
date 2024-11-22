import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private formulariosCollection;

  constructor(private firestore: Firestore) {
    // Apunta a la colección "formularios"
    this.formulariosCollection = collection(this.firestore, 'formularios');
  }

  // Crear un nuevo formulario
  async crearFormulario(formulario: any): Promise<void> {
    try {
      await addDoc(this.formulariosCollection, formulario);
    } catch (error) {
      console.error('Error al crear el formulario:', error);
      throw error;
    }
  }

  // Obtener todos los formularios de un usuario
  async obtenerFormulariosPorUsuario(userId: string): Promise<any[]> {
    try {
      const q = query(this.formulariosCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener formularios:', error);
      throw error;
    }
  }

  // Actualizar un formulario
  async actualizarFormulario(formularioId: string, data: any): Promise<void> {
    try {
      const formularioDoc = doc(this.formulariosCollection, formularioId);
      await updateDoc(formularioDoc, data);
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
      throw error;
    }
  }

  // Eliminar un formulario
  async eliminarFormulario(formularioId: string): Promise<void> {
    try {
      const formularioDoc = doc(this.formulariosCollection, formularioId);
      await deleteDoc(formularioDoc);
    } catch (error) {
      console.error('Error al eliminar el formulario:', error);
      throw error;
    }
  }
}
