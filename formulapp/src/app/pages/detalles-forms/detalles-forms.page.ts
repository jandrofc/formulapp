import { Respuestas } from './../models/form.model';
import { Component, OnInit } from '@angular/core';
import { Formulario } from '../models/form.model';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-detalles-forms',
  templateUrl: './detalles-forms.page.html',
  styleUrls: ['./detalles-forms.page.scss'],
})
export class DetallesFormsPage implements OnInit {
  formulario: any | null = null;
  cargando = true;

  respuestasVisibles: boolean[] = [];



  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService
  ) {}

  async ngOnInit() {
    // Obtener el ID del formulario desde la URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      try {
        this.formulario = await this.formularioService.obtenerRespuestasDeUsarios(id);
        console.log('Formulario obtenido:', this.formulario);
      } catch (error) {
        console.error('Error al cargar el formulario:', error);
      } finally {
        this.cargando = false;
      }
    }
  }

  toggleRespuestas(index: number): void {
    this.respuestasVisibles[index] = !this.respuestasVisibles[index];
  }



}
