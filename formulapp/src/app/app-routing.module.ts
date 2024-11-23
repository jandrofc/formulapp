import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard,RedirectIfAuth } from './guard/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [RedirectIfAuth],
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'entrenado',
    loadChildren: () => import('./pages/entrenado/entrenado.module').then( m => m.EntrenadoPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'preparador',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/preparador/preparador.module').then(m => m.PreparadorPageModule)
      },
      {
        path: 'misforms',
        loadChildren: () => import('./pages/misforms/misforms.module').then(m => m.MisformsPageModule)
      },
      {
        path: 'crearforms',
        loadChildren: () => import('./pages/crearforms/crearforms.module').then(m => m.CrearformsPageModule)
      },
      {
        path: 'ver-forms/:id',
        loadChildren: () => import('./pages/ver-forms/ver-forms.module').then( m => m.VerFormsPageModule)
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard],
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
