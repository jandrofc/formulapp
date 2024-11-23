import { Component, OnInit, inject} from '@angular/core';
import { Formulario,Preguntas } from '../models/form.model';
import { FormularioService } from 'src/app/services/formularios.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-crearforms',
  templateUrl: './crearforms.page.html',
  styleUrls: ['./crearforms.page.scss'],
})
export class CrearformsPage implements OnInit {
  private FirebaseService = inject(FirebaseService);
  constructor(private formularioService: FormularioService) { }


  form: Formulario = {
    form_name: '',
    descripcion: '',
    preguntas: [],
    user_id: '',
    cantitad_respuestas: 0
  };
  Pregunta: Preguntas = {
    texto: '',
    tipo: '',
    opciones: []
  };

  tipo_formularios: any[] = [];

  ngOnInit() {

    this.FirebaseService.authState$.subscribe(user => {
      if (user) {
        this.form.user_id = user.uid;
      }
    });
    try {
      this.formularioService.obtenerTiposDeFormulario().then(tipos => {
        this.tipo_formularios = tipos;
        console.log('Tipos de formulario:', this.tipo_formularios);
      });
    } catch (error) {
      console.error('Error al obtener tipos de formulario:', error);
    }

  }

  async agregarPregunta() {
    const nuevaPregunta = { ...this.Pregunta };
    this.form.preguntas.push(nuevaPregunta);
  }

  async crearFormulario() {
    console.log('Formulario:', this.form);
    this.formularioService.crearFormulario(this.form);
  }





}
