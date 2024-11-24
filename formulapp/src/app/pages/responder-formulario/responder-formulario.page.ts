import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';
import { Formulario } from '../models/form.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-responder-formulario',
  templateUrl: './responder-formulario.page.html',
  styleUrls: ['./responder-formulario.page.scss'],
})
export class ResponderFormularioPage implements OnInit {

  InformacionForm: any;

  constructor(private formularioService: FormularioService,
    private Router: Router,
    private DinamicRouter: ActivatedRoute,
    private firebaseService: FirebaseService,
    private firestoreService: FirestoreService) {
  }



  ngOnInit() {
    const id = this.DinamicRouter.snapshot.paramMap.get('id');

    this.formularioService.formulario$.pipe().subscribe((formulario)=>{
      if (formulario) {
        this.InformacionForm = formulario;
        console.log('Informacion del formulario:', this.InformacionForm);

      }
    });
  }

  async enviarFormulario() {
    this.firebaseService.getCurrentUser().subscribe(user => {
      if (!user) {
        console.error('Usuario no autenticado.');
        return;
      }

      // Preparar las respuestas
      const respuestas = this.InformacionForm.preguntas.map((pregunta: any) => {
        return {
          pregunta: pregunta.texto,
          respuesta: pregunta.selectedOption || '', // Usar la opción seleccionada o dejar vacío
        };
      });

      // Crear el objeto de respuesta
      const formRespuesta = {
        form_id: this.InformacionForm.id, // ID del formulario
        respuestas, // Respuestas recopiladas
        user_id: user.uid, // ID del usuario actual
      };

      // Guardar en Firestore
      await this.firestoreService.agregarDocumento('form_respuestas', formRespuesta);

      // Confirmar éxito
      console.log('Respuestas enviadas correctamente:', formRespuesta);
    })
     catch (error) {
      console.error('Error al enviar las respuestas:', error);
    }}
}

