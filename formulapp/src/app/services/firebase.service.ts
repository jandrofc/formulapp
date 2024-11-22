import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { User } from '../pages/models/user.models';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private authStateSubject = new BehaviorSubject<any>(null);
  authState$ = this.authStateSubject.asObservable();
  auth = inject(Auth);

  constructor(private afAuth: Auth, private firestoreService: FirestoreService) {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.afAuth, async (user) => {
      if (user) {
        // Si el usuario está autenticado, obtener datos adicionales desde Firestore
        const userData = await this.firestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          ...userData,  // Combinar los datos de autenticación con los datos adicionales
        };
        this.authStateSubject.next(fullUserData);
      } else {
        // Si no hay usuario autenticado, emitir null
        this.authStateSubject.next(null);
      }
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    return signOut(this.afAuth).then(() => {
      this.authStateSubject.next(null);
    });
  }

  GenerarError(tipo: any){
    let error: string = '';
    // Verificar el código del error para personalizar el mensaje
    switch (tipo.code) {
      case 'auth/email-already-in-use':
        error = 'El correo electrónico ya está en uso';
        break;
      case 'auth/invalid-email':
        error = 'El correo electrónico no es válido';
        break;
      case 'auth/user-not-found':
        error = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        error = 'Contraseña incorrecta';
        break;
      case 'auth/network-request-failed':
        error = 'Error de red. Verifique su conexión a internet';
        break;
      case 'auth/invalid-credential':
        error = 'Credenciales inválidas';
        break;
      default:
        error = 'Error: ' + tipo.message;
    }

    return error;
  }
  resetPass(email: string){
    return sendPasswordResetEmail(this.afAuth, email)
    .then(() => {
      console.log('Corre de recuperacion enviado');
  })
  .catch((error) => {
    throw this.GenerarError(error);
  });
  }

}
