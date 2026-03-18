import { Routes } from '@angular/router';

export const routes: Routes = [
  // Para ativar a homepage: troque a linha abaixo por { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) }
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'otimizador-cristal-divino',
    loadComponent: () =>
      import('./features/otimizador-cristal-divino/otimizador.component').then(
        (m) => m.OtimizadorComponent
      ),
  },
  {
    path: 'guia-equipamentos',
    loadComponent: () =>
      import('./features/guia-equipamentos/guia-equipamentos.component').then(
        (m) => m.TabelaRaridadeComponent
      ),
  },
];
