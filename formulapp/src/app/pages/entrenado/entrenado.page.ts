import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, flashlightOutline, newspaperOutline, logOut } from 'ionicons/icons';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-entrenado',
  templateUrl: './entrenado.page.html',
  styleUrls: ['./entrenado.page.scss'],
})
export class EntrenadoPage implements OnInit {

  user: any = null;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {addIcons({ home, flashlightOutline, newspaperOutline, logOut });
  this.firebaseService.authState$.subscribe((userData) => {
    this.user = userData;
    console.log('Datos completos del usuario:', this.user);
  });
  }
}
