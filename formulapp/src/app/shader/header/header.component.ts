import { FirebaseService } from './../../services/firebase.service';
import { Component, inject, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    this.firebaseService.authState$.subscribe((userData) => {
      this.user = userData;
      console.log('Datos completos del usuario:', this.user);
    });
  }
  logout() {
    this.firebaseService.logout();
    this.router.navigate(['/login']);
  }

}
