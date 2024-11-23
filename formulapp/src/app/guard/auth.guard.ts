import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService); // Obtener el servicio de autenticación
  const router = inject(Router);  // Obtener el router

  return firebaseService.getAuthState().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true; // Permitir acceso si está autenticado
      } else {
        router.navigate(['/login']); // Redirigir al login si no está autenticado
        return false; // Denegar acceso si no está autenticado
      }
    })
  );
};
