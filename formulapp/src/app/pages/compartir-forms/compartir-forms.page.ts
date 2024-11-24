import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';

@Component({
  selector: 'app-compartir-forms',
  templateUrl: './compartir-forms.page.html',
  styleUrls: ['./compartir-forms.page.scss'],
})
export class CompartirFormsPage implements OnInit {

  correo: string = '';
  formId: string = '';

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del formulario de la URL
    this.formId = this.route.snapshot.paramMap.get('id') || '';
  }

  async compartirFormulario() {
    if (!this.correo) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }
    try {
      if(!await this.formularioService.verificarCorreoExistente(this.correo)){
        alert('El correo ingresado no existe.');
        return;
      }
      else{
        await this.formularioService.compartirFormulario(this.formId, this.correo);
      this.router.navigate(['/preparador/preparador-forms']); // Redirige a la lista de formularios
      }
    }
    catch (error) {
        console.error('Error al compartir el formulario:', error);
        alert('Hubo un problema al compartir el formulario.');
    }
  }
}
