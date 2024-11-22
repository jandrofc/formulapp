import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/pages/models/user.models';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  userData: User = {
    nombre: '',
    email: '',
    rol: ''
  };

  error: string = ''

  password: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService,
    private router: Router  // Para la redirección
   ) {this.error = '';}

   ngOnInit(): void {
    console.log('register');
  }

  async registerUser() {
    try {
      // 1. Registrar el usuario en Firebase Authentication usando email y password
      const userCredential = await this.firebaseService.register(this.userData.email, this.password);

      // 2. Obtener el UID del usuario registrado
      const uid = userCredential.user?.uid;

      // 3. Almacenar los datos adicionales en Firestore bajo el UID del usuario
      if (uid) {
        // Crear un nuevo objeto que excluya el campo 'password'
        const { nombre, email, rol } = this.userData;

        // Guardar en Firestore sin la contraseña
        await this.firestoreService.createUser(uid, { nombre, email, rol });

        // 4. Redirigir al usuario a la página de inicio o a otra página
        this.router.navigate(['/login']);  // Redirige a home
      }
    } catch (error) {
      console.error('Error registrando al usuario:', error);
      this.error = this.firebaseService.GenerarError(error);
    }
  }


  }
