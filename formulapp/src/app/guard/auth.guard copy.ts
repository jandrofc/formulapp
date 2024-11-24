import { Injectable } from '@angular/core';
import { CanActivate, Router,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { Observable,from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean>{
    console.log('AUTHGUARD ACTIVADO');
    const requestedUrl = state.url;
    console.log('CURRENTURL',requestedUrl);
    return this.authService.checkUserAuth().then((user) => {
      console.log('AUTHGUARD USER',user);
      console.log('AUTHGUARD LOCALSTORAGE',localStorage.getItem('authtoken'));
      console.log('!user && !localStorage',!user && !localStorage.getItem('authtoken'));
      console.log('--------------------------')
      if (!user && !localStorage.getItem('authtoken')) {
        this.router.navigate(['/login']);
        return false;
      } else {
        this.authService.authState$.subscribe((user)=>{
          console.log("user.rol!='preparador' && currentUrl.startsWith('/preparador')",user.rol!='preparador' && requestedUrl.startsWith('/preparador'))
          console.log("user.rol!='entrenado' && currentUrl.startsWith('/entrenado')",user.rol!='entrenado' && requestedUrl.startsWith('/entrenado'))
          console.log('ROL',user.rol);
          console.log('CURRENTURL',requestedUrl);
          if (user.rol!='preparador' && requestedUrl.startsWith('/preparador')) {
            this.router.navigate(['/',user.rol]);
            return false;
          }
          else if(user.rol!='entrenado' && requestedUrl.startsWith('/entrenado')){
            this.router.navigate(['/',user.rol]);
            return false;
          }
          else{
            console.log('ENTRA EN ELSE de authstate');

            return true;
          }
          });
        }
        console.log('ENTRA EN ELSE de checkUserAuth');
        return true;
      });
      }
}

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuth implements CanActivate {
  constructor(private authService: FirebaseService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.authState$.pipe(
      map(user => {
        if (user) {
          if (user.rol === 'preparador') {
            return true;
          } else if (user.rol === 'entrenado') {
            return true;
          } else {
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
