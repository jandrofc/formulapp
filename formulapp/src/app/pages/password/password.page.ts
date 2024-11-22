import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage  {

  email: string = '';
  constructor(private firebaseService: FirebaseService) { }



  recuperar(){
  if(this.email){
    this.firebaseService.resetPass(this.email)
    .then(() => {
      alert('Se ha enviado un correo para restablecer la contraseña');
    })
    .catch((error) => {
      alert('Error: ' + error);
    });
  }else{
    alert('Ingrese un correo electrónico');
  }
  }
}
