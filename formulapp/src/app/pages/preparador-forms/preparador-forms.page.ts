import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/services/formularios.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Formulario } from 'src/app/pages/models/form.model';

@Component({
  selector: 'app-preparador-forms',
  templateUrl: './preparador-forms.page.html',
  styleUrls: ['./preparador-forms.page.scss'],
})
export class PreparadorFormsPage implements OnInit {
  formularios: Formulario[] = [];
  cargando: boolean = true;

  constructor(
    private formularioService: FormularioService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.firebaseService.authState$.subscribe(user => {
      if (user && user.uid) {
        console.log('Usuario autenticado:', user.uid); // Verifica que el UID es correcto
        this.cargarFormularios(user.uid);
      } else {
        console.error('Usuario no autenticado');
        this.cargando = false;
      }
    });
  }

  async cargarFormularios(userId: string) {
    try {
      console.log('Cargando formularios para el usuario:', userId); // Verifica que el ID es correcto
      this.formularios = await this.formularioService.obtenerFormulariosPorUsuario(userId);

      // Verifica si se encontraron formularios
      if (this.formularios.length === 0) {
        console.log('No se encontraron formularios para este usuario.');
      } else {
        console.log('Formularios cargados:', this.formularios);
      }
    } catch (error) {
      console.error('Error al cargar los formularios:', error);
    } finally {
      this.cargando = false;
    }
  }
}
