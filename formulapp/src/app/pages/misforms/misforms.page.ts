import { Component, OnInit, inject} from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Formulario,Preguntas,Respuestas } from '../models/form.model';
import { FormularioService } from 'src/app/services/formularios.service';
@Component({
  selector: 'app-misforms',
  templateUrl: './misforms.page.html',
  styleUrls: ['./misforms.page.scss'],
})
export class MisformsPage implements OnInit {

  private FirebaseService = inject(FirebaseService);
  private formularioService = inject(FormularioService);
  constructor() { }

  formularios: any[] = [];



  async ngOnInit() {
    this.FirebaseService.authState$.subscribe(user => {
      if (user) {
        this.formularioService.obtenerFormulariosPorUsuario(user.uid).then(formularios => {
        this.formularios = formularios;
        console.log('Formularios:', this.formularios);
        });
      }
    });

  }

  async eliminarFormulario(formularioId: string) {
    await this.formularioService.eliminarFormulario(formularioId);
    this.formularios = this.formularios.filter(form => form.id !== formularioId);
    console.log('Formulario eliminado:', formularioId);

  }

  async Estadisticas(formularioId: string) {
    console.log('Estadisticas:', formularioId);
  }


}
