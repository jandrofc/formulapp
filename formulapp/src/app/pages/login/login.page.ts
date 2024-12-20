import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../models/user.models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';
import { distinctUntilChanged, timer } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {


  user: any = null;

  email: string = '';
  password: string = '';

  error: string = '';
  isLoading: boolean = true;
  updateCount: number = 0;
  isLogging: boolean = false;

  // VARIABLES PARA QUE SE PUEDA VER O NO VER A CONTRAsena
  isPassword!: boolean;
  hide: boolean = true;

  firebase = inject(FirebaseService)
  firestore = inject(FirestoreService)
  router = inject(Router)

  ngOnInit() {
    // Suscribirse a los datos completos del usuario
    this.firebase.authResponse$.subscribe((response) => {
      if (response) {
        this.firebase.authState$.pipe(distinctUntilChanged()).subscribe((userData) => {
          this.user = userData;
          console.log('login page Datos del usuario:', this.user);
          this.isLoading = false;
        });
      }
    });
  }



  async loginUser() {
    this.isLogging = true;
    try {
      // Iniciar sesión
      if (await this.firebase.login(this.email, this.password)) {
        this.firebase.iniciarSesion();
        await this.firebase.authState$.subscribe(user => {
          if (user.rol=='preparador' || user.rol=='entrenado') {
            this.router.navigate([`/${user.rol}`]);
            this.isLogging = false;
          }
          else{
            this.firebase.logout();
            this.isLogging = false;
            this.error = 'Sus credenciales no son válidas';
            throw new Error('Credenciales no válidas');
          }});
      }
    } catch (error) {
      this.isLogging = false;
      console.error('Error al iniciar sesión:', error);
      this.error = this.firebase.GenerarError(error);
    }
  }
}
