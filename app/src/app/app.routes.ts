import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'otimizador-cristal-divino', pathMatch: 'full' },
  {
    path: 'otimizador-cristal-divino',
    loadComponent: () =>
      import('./features/otimizador-cristal-divino/otimizador.component').then(
        (m) => m.OtimizadorComponent
      ),
  },
];
