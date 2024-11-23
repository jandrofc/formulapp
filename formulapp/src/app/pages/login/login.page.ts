import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../models/user.models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit {

  email: string = '';
  password: string = '';

  error: string = '';
  // VARIABLES PARA QUE SE PUEDA VER O NO VER A CONTRAsena
  isPassword!: boolean;
  hide: boolean = true;

  firebase = inject(FirebaseService)
  firestore = inject(FirestoreService)
  router = inject(Router)

  ngOnInit(): void {
    console.log('LOGIN');
  }

  async loginUser() {
    try {
      // Iniciar sesión
      const userCredential = await this.firebase.login(this.email, this.password);

      // Obtener el UID del usuario autenticado
      const uid = userCredential.user?.uid;

      // Obtener el rol del usuario desde Firestore
      const userData = await this.firestore.getUser(uid);
      const rol = userData ? userData['rol'] : null;

      // Redirigir según el rol
      if (rol === 'preparador') {
        this.router.navigate(['/preparador']);
      } else if (rol === 'entrenado') {
        this.router.navigate(['/entrenado']);
      } else {
        console.error('Rol desconocido:', rol);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.error = this.firebase.GenerarError(error);
    }
   }
   }
