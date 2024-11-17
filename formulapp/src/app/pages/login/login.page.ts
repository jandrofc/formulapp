import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  });
  // VARIABLES PARA QUE SE PUEDA VER O NO VER A CONTRAsena
  isPassword!: boolean;
  hide: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
