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
    user_id: ''
  };
  Pregunta: Preguntas = {
    texto: '',
    tipo: '',
    opciones: []
  };

  tipo_formularios: any[] = [];

  async ngOnInit() {

    this.FirebaseService.authState$.subscribe(user => {
      if (user) {
        this.form.user_id = user.uid;
      }
    });


    try {
      this.tipo_formularios = await this.formularioService.obtenerTiposDeFormulario();
      console.log('Tipos de formulario:', this.tipo_formularios);
    } catch (error) {
      console.error('Error al obtener tipos de formulario:', error);
    }

  }

  async agregarPregunta() {
    if (this.Pregunta.texto.trim() !== '') {
      this.form.preguntas.push({ ...this.Pregunta }); // Agrega la pregunta al formulario
      this.Pregunta = { texto: '', tipo: '', opciones: [] }; // Limpia el objeto de pregunta
    }
  }

  async crearFormulario() {
    try {
      const id = await this.formularioService.crearFormulario(this.form); // Crear formulario y obtener el ID
      if (id) {
        const link = `${window.location.origin}/ver-forms/${id}`; // Generar el link dinámicamente con el ID
        console.log('Link del formulario:', link);

        // Muestra el link al usuario
        alert(`Formulario creado. Comparte este link: ${link}`);
      } else {
        throw new Error('No se pudo obtener el ID del formulario');
      }
    } catch (error) {
      console.error('Error al crear el formulario:', error);
      alert('Hubo un error al crear el formulario. Inténtalo de nuevo.');
    }
  }
}

