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
      take(1),
      map((user) => {
        if (user && (user.rol === 'entrenado' || user.rol === 'preparador')) {
          return true; // Usuario autenticado con rol válido
        } else {
          this.router.navigate(['/login']); // Redirigir al login si no está autenticado
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
      take(1),
      map((user) => {
        if (user) {
          // Redirigir según el rol del usuario
          if (user.rol === 'entrenado') {
            this.router.navigate(['/entrenado']);
          } else if (user.rol === 'preparador') {
            this.router.navigate(['/preparador']);
          }
          return false; // Bloquear acceso a rutas como login
        }
        return true; // Permitir acceso si no está autenticado
      })
    );
  }
}
