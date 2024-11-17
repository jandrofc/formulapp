import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from '../models/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage   {

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  });
  // VARIABLES PARA QUE SE PUEDA VER O NO VER A CONTRAsena
  isPassword!: boolean;
  hide: boolean = true;

  firebase = inject(FirebaseService)



  submit(){
    if(this.form.valid){
      this.firebase.login(this.form.value as User).then(res =>{

        console.log(res)
       });
    }
  }

}
