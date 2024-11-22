import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, flashlightOutline, newspaperOutline, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-entrenado',
  templateUrl: './entrenado.page.html',
  styleUrls: ['./entrenado.page.scss'],
})
export class EntrenadoPage implements OnInit {

  constructor() { }

  ngOnInit() {addIcons({ home, flashlightOutline, newspaperOutline, logOut });}

}
