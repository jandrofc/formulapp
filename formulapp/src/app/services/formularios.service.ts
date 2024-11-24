import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getDoc, getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Formulario } from '../pages/models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private formulariosCollection;
  private tipo_form;
  private form_respuestas;
  private db;

  constructor(private firestore: Firestore) {
    // Apunta a la colección "formularios"
    this.formulariosCollection = collection(this.firestore, 'formularios');
    this.tipo_form = collection(this.firestore, 'tipo_form');
    this.form_respuestas = collection(this.firestore, 'form_respuestas');
    const app = initializeApp(environment.firebaseConfig); // Inicializa Firebase
    this.db = getFirestore(app); // Inicializa Firestore
  }

  // Crear un nuevo formulario

  // Obtener todos los formularios de un usuario
  async obtenerFormulariosPorUsuario(user_id: string): Promise<any[]> {
    try {
      const q = query(this.formulariosCollection, where('user_id', '==', user_id));
      const querySnapshot = await getDocs(q);

      console.log('Documentos encontrados:', querySnapshot.docs.map(doc => doc.data())); // Verifica si hay documentos

      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener formularios:', error);
      throw error;
    }
  }

  async obtenerTiposDeFormulario(): Promise<any[]> {
    try {
      const q = query(this.tipo_form);
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

  // Método para crear un formulario
  async crearFormulario(formulario: Formulario): Promise<string> {
    try {
      const docRef = await addDoc(collection(this.db, 'formularios'), formulario); // Agrega el formulario
      return docRef.id; // Retorna el ID del documento creado
    } catch (error) {
      console.error('Error al crear el formulario:', error);
      throw error;
    }
  }

    // Método para obtener un formulario por su ID
    async obtenerFormularioPorId(id: string): Promise< Formulario | null> {
      try {
        const docRef = doc(this.db, 'formularios', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return docSnap.data() as Formulario; // Retorna los datos del formulario
        } else {
          console.error('No se encontró el formulario con ID:', id);
          return null;
        }
      } catch (error) {
        console.error('Error al obtener el formulario:', error);
        throw error;
      }
    }

    async obtenerFormulariosRespondidos(userId: string): Promise<any[]> {
      try {
        const q = query(this.form_respuestas, where('user_id', '==', userId));
        const querySnapshot = await getDocs(q);

        const formularios: any[] = [];
        for (const doc of querySnapshot.docs) {
          const respuesta = doc.data();
          const formulario = await this.obtenerFormularioPorId(respuesta['form_id']);
          if (formulario) {
            formularios.push({ ...formulario, id: doc.id });
          }
        }
        return formularios;
      } catch (error) {
        console.error('Error al obtener formularios respondidos:', error);
        throw error;
      }
    }

    async compartirFormulario(formId: string, correo: string): Promise<void> {
      try {
        // Referencia al formulario
        const formularioDoc = doc(this.firestore, `formularios/${formId}`);

        // Obtén el formulario actual
        const formularioSnap = await getDoc(formularioDoc);

        if (formularioSnap.exists()) {
          const formularioData = formularioSnap.data();

          // Actualiza el array compartidoCon
          const compartidoCon = formularioData['compartidoCon'] || [];
          if (!compartidoCon.includes(correo)) {
            compartidoCon.push(correo);
            await updateDoc(formularioDoc, { compartidoCon });
            console.log('Formulario actualizado y compartido con:', correo);
          } else {
            console.log('El correo ya tiene acceso al formulario.');
          }
        } else {
          throw new Error('Formulario no encontrado.');
        }
      } catch (error) {
        console.error('Error al compartir el formulario:', error);
        throw error;
      }
    }


    async obtenerFormulariosCompartidos(email: string) {
      const formsRef = collection(this.firestore, 'formularios');
      const q = query(formsRef, where('compartidosCon', 'array-contains', email));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }


}

