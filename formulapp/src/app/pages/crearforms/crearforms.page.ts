import { Component, OnInit } from '@angular/core';
import { Formulario,Preguntas } from '../models/form.model';
@Component({
  selector: 'app-crearforms',
  templateUrl: './crearforms.page.html',
  styleUrls: ['./crearforms.page.scss'],
})
export class CrearformsPage implements OnInit {

  constructor() { }

  form: Formulario = {
    form_name: '',
    descripcion: '',
    preguntas: [],
    user_id: ''
  };
  Pregunta: Preguntas = {
    texto: '',
    tipo: '',
    opciones: []
  };

  ngOnInit() {
  console.log('Hola');}

}
