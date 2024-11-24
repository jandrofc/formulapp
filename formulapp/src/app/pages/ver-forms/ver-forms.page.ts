import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';
import { Formulario } from '../models/form.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-ver-forms',
  templateUrl: './ver-forms.page.html',
  styleUrls: ['./ver-forms.page.scss'],
})
export class VerFormsPage implements OnInit {
  formulario: Formulario | null = null;
  cargando = true;
  respuestas = [];
  formulariosCompartidos: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // Primero, suscríbete al Observable para obtener el usuario
    this.firebaseService.getCurrentUser().subscribe(user => {
      if (user) {
        // Ahora puedes acceder al correo del usuario
        const email = user.email;

        if (id) {
          this.formularioService.obtenerFormularioPorId(id).then((formulario) => {
            this.formulario = formulario;
          }).catch((error) => {
            console.error('Error al cargar el formulario:', error);
          }).finally(() => {
            this.cargando = false;
          });
        }

        // Luego, obtienes los formularios compartidos con este usuario
        this.formularioService.obtenerFormulariosCompartidos(email).then((formularios) => {
          this.formulariosCompartidos = formularios;
          console.log('Formularios compartidos:', this.formulariosCompartidos);
        }).catch((error) => {
          console.error('Error al obtener formularios compartidos:', error);
        });

      }
    });
  }
}
