import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { home, flashlightOutline, newspaperOutline, powerOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {addIcons({ home, flashlightOutline, newspaperOutline, powerOutline });}

}
