import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState$.pipe(
      take(1), // Tomar solo el primer valor emitido
      map(user => {
        if (user && user.rol === 'entrenado') { // Verificar el rol del usuario
          return true;
        }
        else if (user && user.rol === 'preparador') { // Verificar el rol del usuario
          return true;
        }
        else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuth implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState$.pipe(
      take(1), // Tomar solo el primer valor emitido
      map(user => {
        try{
        if (user.rol === 'entrenado') { // Verificar el rol del usuario
          this.router.navigate(['/entrenado']);
          return false;
        }
        else if (user.rol === 'preparador') { // Verificar el rol del usuario
          this.router.navigate(['/preparador']);
          return false;
        }else {
          return true;
        }
      }catch{
        return true;
      }})
    );
  }
}
