import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';
import { Formulario } from '../models/form.model';

@Component({
  selector: 'app-ver-forms',
  templateUrl: './ver-forms.page.html',
  styleUrls: ['./ver-forms.page.scss'],
})
export class VerFormsPage implements OnInit {
  formulario: Formulario | null = null;
  cargando = true;
  respuestas = [];

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID del formulario de la URL

    if (id) {
      try {
        this.formulario = await this.formularioService.obtenerFormularioPorId(id); // Carga el formulario
        this.cargando = false;
      } catch (error) {
        console.error('Error al cargar el formulario:', error);
        this.cargando = false;
      }
    }
  }
}
