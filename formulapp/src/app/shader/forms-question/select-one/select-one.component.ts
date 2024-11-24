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
  @Output() optionsSaved = new EventEmitter<boolean>(); // Emite si las opciones han

  opcionTemp: string[] = []; // Opciones temporales

  constructor() { }

  ngOnInit() {}

  addOption() {
    this.question.opciones.push('');
    this.opcionTemp.push('');
  }

  removeOption(index: number) {
    this.question.opciones.splice(index, 1);
    this.opcionTemp.splice(index, 1);
  }

  onOptionChange(value: string, index: number) {
    this.question.opciones[index] = value;
  }

  saveOptions() {
    this.optionsSaved.emit(true);
  }
}
