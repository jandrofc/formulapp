import { Injectable } from '@angular/core';
import { CanActivate, Router,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { Observable,from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { user } from '@angular/fire/auth';
import { ExceptionCode } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requestedUrl = state.url;
    return this.authService.authState$.pipe(
      map(user => {
        if (user) {
          if (user.rol === 'preparador') {
            if (requestedUrl.startsWith('/preparador')) {
              return true;
            } else {
              this.router.navigate(['/preparador']);
              return false;
            }
          } else if (user.rol === 'entrenado') {
            if (requestedUrl.startsWith('/entrenado')) {
              return true;
            } else {
              this.router.navigate(['/entrenado']);
              return false;
            }
          } else {
            console.log('Desconectando usuario');
            this.authService.logout();
            return false;
          }
        } else {
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

  canActivate(){;

    this.authService.authState$.pipe().subscribe((user)=>{
    if (user)  {
      if(user.rol=='preparador'){
          this.router.navigate(['/preparador']);
          return false;
        }
        else if(user.rol=='entrenado'){
          this.router.navigate(['/entrenado']);
          return false;
        }
        else{
          if(user.rol!='preparador' && user.rol!='entrenado'){
            this.authService.logout();
            return true;
          }
        }
    }
    return true;
  });
  return true;
  }
}

