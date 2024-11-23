import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  rol: string = '';

  constructor(private authService: FirebaseService) {}

  ngOnInit() {
    this.authService.authState$.subscribe((user) => {
      if (user) {
        this.rol = user.rol; // Asegúrate de que el campo 'rol' exista en tu modelo de usuario
      }
    });
  }
}
