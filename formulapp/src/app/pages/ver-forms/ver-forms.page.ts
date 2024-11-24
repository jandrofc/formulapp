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
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID del formulario de la URL
    const user = await this.firebaseService.getCurrentUser(); // Asume que tienes un servicio para obtener el usuario autenticado

    if (id) {
      try {
        this.formulario = await this.formularioService.obtenerFormularioPorId(id); // Carga el formulario
        this.cargando = false;
      } catch (error) {
        console.error('Error al cargar el formulario:', error);
        this.cargando = false;
      }
    }

    this.firebaseService.getCurrentUser().subscribe(user => {
      if (user) {
        this.formularioService.obtenerFormulariosCompartidos(user.email).then(formularios => {
          this.formulariosCompartidos = formularios;
          console.log('Formularios compartidos:', this.formulariosCompartidos);
        });
      }
    });
  }
}
