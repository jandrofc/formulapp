import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formularios.service';
import { Formulario } from '../models/form.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-responder-formulario',
  templateUrl: './responder-formulario.page.html',
  styleUrls: ['./responder-formulario.page.scss'],
})
export class ResponderFormularioPage implements OnInit {

  InformacionForm: any;

  constructor(private formularioService: FormularioService,
    private Router: Router,
    private DinamicRouter: ActivatedRoute) {
  }



  ngOnInit() {
    const id = this.DinamicRouter.snapshot.paramMap.get('id');

    this.formularioService.formulario$.pipe().subscribe((formulario)=>{
      if (formulario) {
        this.InformacionForm = formulario;
        console.log('Informacion del formulario:', this.InformacionForm);
      }
    })




  };


  enviarFormulario() {
    console.log('Formulario enviado');
  }


}
