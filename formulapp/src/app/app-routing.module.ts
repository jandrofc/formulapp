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
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/entrenado/entrenado.module').then(m => m.EntrenadoPageModule)
      },
      {
        path: 'ver-forms',
        loadChildren: () => import('./pages/ver-forms/ver-forms.module').then( m => m.VerFormsPageModule)
      },
      {
        path: 'misforms',
        loadChildren: () => import('./pages/misforms/misforms.module').then(m => m.MisformsPageModule)
      },

    ],
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
        path: 'crearforms',
        loadChildren: () => import('./pages/crearforms/crearforms.module').then(m => m.CrearformsPageModule)
      },
      {
        path: 'preparador-forms',
        loadChildren: () => import('./pages/preparador-forms/preparador-forms.module').then(m => m.PreparadorFormsPageModule)
      },
      {
        path: 'detalles-forms/:id',
        loadChildren: () => import('./pages/detalles-forms/detalles-forms.module').then( m => m.DetallesFormsPageModule)
      },
      {
        path: 'compartir-forms/:id',
        loadChildren: () => import('./pages/compartir-forms/compartir-forms.module').then( m => m.CompartirFormsPageModule)
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'mis-resp',
    loadChildren: () => import('./pages/mis-resp/mis-resp.module').then( m => m.MisRespPageModule)
  },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
