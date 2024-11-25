import { Formulario } from './../models/form.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-ver-forms',
  templateUrl: './ver-forms.page.html',
  styleUrls: ['./ver-forms.page.scss'],
})
export class VerFormsPage implements OnInit {
  cargando = true;
  respuestas: any[] = [];
  formulariosCompartidos: Array<any> = [];
  isLoading: boolean = true;


  constructor(
    private route: Router,
    private formularioService: FormularioService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    //const id = this.route.snapshot.paramMap.get('id');

    // Primero, suscríbete al Observable para obtener el usuario
    this.firebaseService.authState$.pipe().subscribe((user)=>{
      if (user) {
        // Ahora puedes acceder al correo del usuario
        const email = user.email;
        console.log('Email del usuario:', email);
        this.formularioService.obtenerFormulariosCompartidos(email).then((formularios) => {
        this.formulariosCompartidos = formularios;
        this.formularioService.obtenerFormulariosRespondidos(user.uid,formularios).then((respuestas) => {
          this.respuestas = respuestas;
          console.log('Formularios respondidos:', this.respuestas);
          console.log('Formularios compartidos:', this.formulariosCompartidos);
          this.cargando = false;
        });
        }).catch((error) => {
          console.error('Error al cargar el formulario:', error);
        });
      }
    });
  }

  responderFormulario(formulario: any) {
    this.formularioService.CargarFormulario(formulario);
    this.route.navigate(['/entrenado/responder-formulario', formulario.id]);
  }









}
