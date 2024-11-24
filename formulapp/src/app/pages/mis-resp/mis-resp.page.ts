import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormularioService } from 'src/app/services/formularios.service';


@Component({
  selector: 'app-mis-resp',
  templateUrl: './mis-resp.page.html',
  styleUrls: ['./mis-resp.page.scss'],
})
export class MisRespPage implements OnInit {
  formularios: any[] = [];
  cargando = true;

  constructor(
    private formularioService: FormularioService,
    private authService: FirebaseService
  ) {}

  async ngOnInit() {
    try {
      const user = await this.authService.authState$.toPromise(); // Obtén el usuario autenticado
      if (user) {
        const userId = user.uid;
        this.formularios = await this.formularioService.obtenerFormulariosRespondidos(userId);
      }
    } catch (error) {
      console.error('Error al cargar los formularios respondidos:', error);
    } finally {
      this.cargando = false;
    }
  }
}
