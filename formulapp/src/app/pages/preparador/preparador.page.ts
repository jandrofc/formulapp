import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, flashlightOutline, newspaperOutline, logOut } from 'ionicons/icons';

@Component({
  selector: 'app-preparador',
  templateUrl: './preparador.page.html',
  styleUrls: ['./preparador.page.scss'],
})
export class PreparadorPage implements OnInit {

  constructor() { }

  ngOnInit() {addIcons({ home, flashlightOutline, newspaperOutline, logOut });}

}
