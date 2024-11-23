import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/services/formularios.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-preparador-forms',
  templateUrl: './preparador-forms.page.html',
  styleUrls: ['./preparador-forms.page.scss'],
})
export class PreparadorFormsPage implements OnInit {
  formularios: Array<any> = [];
  cargando = true;

  constructor(
    private formularioService: FormularioService,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    // Obtener el usuario actual
    this.firebaseService.authState$.subscribe(async (user) => {
      if (user) {
        console.log('UID del usuario autenticado:', user.uid);
        try {
          // Obtener los formularios creados por el usuario
          this.formularios = await this.formularioService.obtenerFormulariosPorUsuario(user.uid);
          console.log('Formularios obtenidos:', this.formularios);
        } catch (error) {
          console.error('Error al cargar los formularios:', error);
        } finally {
          this.cargando = false;
        }
      } else {
        console.error('Usuario no autenticado');
        this.cargando = false;
      }
    });
  }

  // Método para eliminar un formulario
  async eliminarFormulario(id: string) {
    try {
      await this.formularioService.eliminarFormulario(id);
      this.formularios = this.formularios.filter((form) => form.id !== id);
    } catch (error) {
      console.error('Error al eliminar el formulario:', error);
    }
  }
}
