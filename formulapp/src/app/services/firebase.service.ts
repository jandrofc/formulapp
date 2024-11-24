import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, user } from '@angular/fire/auth';
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
    this.iniciarSesion();
  }


  iniciarSesion() {
    onAuthStateChanged(this.afAuth, async (user) => {
      if (user) {
        // Si el usuario está autenticado, obtener datos adicionales desde Firestore
        const userData = await this.firestoreService.getUser(user.uid);
        const fullUserData = {
          uid: user.uid,
          email: user.email,
          ...userData,  // Combinar los datos de autenticación con los datos adicionales
        };
        this.authStateSubject.next(fullUserData);  // Emitir todos los datos
      } else {
        // Si no hay usuario autenticado, emitir null
        this.authStateSubject.next(null);
      }
    });
  }
  /*
    pipe encadena funciones que tratan los valores emitidos por un Observable.
    pipe encadena funciones las cuales tratan el ultimo valor emitido por el observable

      const subject = new BehaviorSubject<number>(1); // El valor inicial es 1

      subject.pipe(
        map(value => value * 2),           // Multiplica el valor por 2
        filter(value => value > 5)         // Filtra los valores mayores que 5
      ).subscribe(
        value => console.log(value)        // Muestra el valor si pasa el filtro
      );

      // Emite valores en el Subject
      subject.next(3);  // 3 * 2 = 6, pasa el filtro, muestra 6
      subject.next(2);  // 2 * 2 = 4, no pasa el filtro, no muestra nada
      subject.next(4);  // 4 * 2 = 8, pasa el filtro, muestra 8



    */



    /* map toma que condicion de existencia tiene un valor para usarlo en el condicionador !!user
    user: Es simplemente el valor tal como está. Si user es un objeto, un número, una cadena o cualquier otro tipo de valor, user lo devolverá tal cual.
    !user: Si user es un valor "falsy" (por ejemplo, null, undefined, 0, '' (cadena vacía), false), !user devolverá true.

    !!user:El primer ! convierte el valor a su forma booleana invertida, y el segundo ! lo invierte de nuevo.
    El resultado es que devuelve el valor booleano real de user.

    Si user es un valor "truthy" (por ejemplo, un objeto, cadena no vacía, número distinto de cero, etc.), !!user devolverá true.
    Si user es un valor "falsy" (como null, undefined, false, etc.), !!user devolverá false.

    !user = el usuario no existe? true si no existe, false si existe

    !!user = Si el usuario se comprobo que no existe (condicion !user =true) entonces es falso que el usuario exista !!user(false)
          Si el usuario se comprobo que existe (condicion !user =false) entonces es verdadero que el usuario existe !!user(true)

    */

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  logout() {
    signOut(this.afAuth).then(() => {
      this.authStateSubject.next(null);
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

  getCurrentUser() {
    return this.authState$.pipe(map(user => user));
  }

}
