import { Component, OnInit } from '@angular/core';
import {  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent  implements OnInit {

  @Input() question: any; // Recibe la pregunta actual
  @Output() questionChange = new EventEmitter<any>(); // Emite cambios a la pregunta
  constructor() {

  }

  ngOnInit() {}


  onTextChange(event: any) {
      this.question.texto = event.target.value;
      this.questionChange.emit(this.question);
    }
  }

