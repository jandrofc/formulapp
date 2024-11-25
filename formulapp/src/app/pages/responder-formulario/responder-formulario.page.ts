import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';
import { Formulario } from '../models/form.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Respuestas } from '../models/form.model';
@Component({
  selector: 'app-responder-formulario',
  templateUrl: './responder-formulario.page.html',
  styleUrls: ['./responder-formulario.page.scss'],
})
export class ResponderFormularioPage implements OnInit {

  InformacionForm: any;
  cargando = true;
  Respuestas : Respuestas = {
    form_id: '',
    respuestas: [],
    user_id: '',
    username: '',
  };

  constructor(private formularioService: FormularioService,
    private Router: Router,
    private DinamicRouter: ActivatedRoute,
    private firebaseService: FirebaseService,
    private FormularioService: FormularioService,) {
  }


  ngOnInit() {
    this.formularioService.formulario$.pipe().subscribe((formulario)=>{
      if (formulario) {
        this.InformacionForm = formulario;
        console.log('Informacion del formulario:', this.InformacionForm);

      }
    });

  }

  async enviarFormulario() {
    try {
      // Obtener el usuario actual
    this.firebaseService.getCurrentUser().subscribe(user => {
      if (!user) {
        console.error('Usuario no autenticado.');
        return;
      }
    this.Respuestas.user_id = user.uid;
    this.Respuestas.form_id = this.InformacionForm.id;
    this.Respuestas.username = user.nombre || user.email || 'Usuario';

      // Preparar las respuestas
      this.Respuestas.respuestas = this.InformacionForm.preguntas.map((pregunta: any) => {
        return {
          pregunta: pregunta.texto,
          respuesta: pregunta.selectedOption || '', // Usar la opción seleccionada o dejar vacío
        };
      });


      // Guardar en Firestore
      this.FormularioService.agregarRespuesta(this.Respuestas,);

      // Confirmar éxito
      console.log('Respuestas enviadas correctamente:', this.Respuestas);
      this.Router.navigate(['/entrenado']);
    })}
     catch (error) {
      console.error('Error al enviar las respuestas:', error);
    }}
}

