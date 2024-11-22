import { Component, OnInit } from '@angular/core';
import { Formulario,Preguntas } from '../models/form.model';
import { FormularioService } from 'src/app/services/formularios.service';
@Component({
  selector: 'app-crearforms',
  templateUrl: './crearforms.page.html',
  styleUrls: ['./crearforms.page.scss'],
})
export class CrearformsPage implements OnInit {

  constructor(private formularioService: FormularioService) { }

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

  tipo_formularios: any[] = [];



  async ngOnInit() {
    try {
      this.tipo_formularios = await this.formularioService.obtenerTiposDeFormulario();
      console.log('Tipos de formulario:', this.tipo_formularios);
    } catch (error) {
      console.error('Error al obtener tipos de formulario:', error);
    }
  }

  async crearFormulario() {






  }





}
