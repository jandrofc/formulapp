import { FirestoreService } from './../../services/firestore.service';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any = null;
  nombre: string = '';
  email: string = '';
  rol: string = '';

  constructor(
    private FirebaseService: FirebaseService,
    private FirestoreService: FirestoreService,
    private alertController: AlertController) { }

  ngOnInit() {
    // Obtener el usuario autenticado
    this.FirebaseService.authState$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.nombre = user.nombre; // Establece el nombre actual en el campo de edición
        this.email = user.email;
        this.rol = user.rol;
      }
    });
  }

  async guardarCambios() {
    if (this.user) {
      try {
        // Actualizar el nombre en Firestore
        await this.FirestoreService.updateUser(this.user.uid, { nombre: this.nombre });
        this.user.nombre = this.nombre; // Actualizar localmente
        console.log('Nombre actualizado correctamente.');
        this.presentAlert('Nombre actualizado', 'El nombre se ha actualizado correctamente.');
      } catch (error) {
        console.error('Error al actualizar el nombre:', error);
        this.presentAlert('Error al actualizar el nombre', 'Ha ocurrido un error al actualizar el nombre.');
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
