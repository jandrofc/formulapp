import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-select-one',
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.scss'],
})
export class SelectOneComponent  implements OnInit {
  @Input() question: any; // Recibe la pregunta actual
  @Output() questionChange = new EventEmitter<any>(); // Emite cambios a la pregunta
  constructor() { }

  ngOnInit() {}

  addOption() {
    this.question.opciones.push('');
    this.questionChange.emit(this.question);
  }

  removeOption(index: number) {
    this.question.opciones.splice(index, 1);
    this.questionChange.emit(this.question);
  }

  updateOption(index: number, value: string) {
    this.question.opciones[index] = value;
    this.questionChange.emit(this.question);
  }

}
