import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { User } from '../pages/models/user.models';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private authStateSubject = new BehaviorSubject<any>(null);
  authState$ = this.authStateSubject.asObservable();
  auth = inject(Auth);
  constructor(private afAuth: Auth, private firestoreService: FirestoreService,private Router: Router) {


    /*
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
    });*/

  }

  async checkUserAuth() {

    const user = await this.afAuth.currentUser;
    console.log('CHECK USER USER',user);
    console.log('CHECK USER LOCALSTORAGE',localStorage.getItem('authtoken'));
    console.log('CHECK USER',this.authStateSubject);
    if (user) {
      const userData = await this.firestoreService.getUser(user.uid);
      const fullUserData = {
        uid: user.uid,
        email: user.email,
        ...userData,
      };
      this.authStateSubject.next(fullUserData);
      return true;
    } else {
      const token = localStorage.getItem('authtoken');
      if (token) {
        const user = JSON.parse(token);
        const userData = await this.firestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          rol: user.rol,
          ...userData,
        };
        this.authStateSubject.next(fullUserData);
        return true;
      }
      this.authStateSubject.next(null);
      return false;
      }
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
      localStorage.removeItem('authtoken');
      this.Router.navigate(['/login']);
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
