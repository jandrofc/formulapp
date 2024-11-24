import { FirebaseService } from './../../services/firebase.service';
import { Component, inject, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  user: any = null;

  constructor(
    private MenuCtrl: MenuController,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  onClick()
  {
    this.MenuCtrl.toggle();
  }

  ngOnInit() {
    // Suscribirse a los datos completos del usuario
    this.firebaseService.authState$.pipe(distinctUntilChanged()).subscribe((userData) => {
      this.user = userData;
      console.log('Header Datos completos del usuario:', this.user);
    });
  }
  logout() {
    this.firebaseService.logout();
  }

}
