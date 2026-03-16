import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Ferramenta {
  label: string;
  descricao: string;
  rota: string;
  icone: string;
  disponivel: boolean;
}

const FERRAMENTAS: Ferramenta[] = [
  {
    label: 'Otimizador de Cristal Divino',
    descricao:
      'Calcule quantos Cristais Divinos são necessários para maximizar cada atributo do seu equipamento.',
    rota: '/otimizador-cristal-divino',
    icone: '/Divine_Crystal.gif',
    disponivel: true,
  },
  // Adicione novas ferramentas aqui. Exemplo:
  // {
  //   label: 'Calculadora de Refino',
  //   descricao: 'Estime o custo de refino de equipamentos.',
  //   rota: '/calculadora-refino',
  //   icone: '/equipamentos/sabre.png',
  //   disponivel: false,
  // },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex flex-col">

      <main class="flex-1 w-full max-w-4xl mx-auto px-6 pt-16 pb-12">

        <!-- Cabeçalho -->
        <div class="mb-10">
          <h1 class="text-2xl font-bold text-white tracking-tight">Ferramentas</h1>
          <p class="text-sm text-slate-500 mt-1">Selecione uma ferramenta para começar.</p>
        </div>

        <!-- Grid de cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (ferramenta of ferramentas; track ferramenta.rota) {
            @if (ferramenta.disponivel) {
              <a
                [routerLink]="ferramenta.rota"
                class="group flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5
                       hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer"
              >
                <div class="flex items-center gap-3">
                  <img [src]="ferramenta.icone" [alt]="ferramenta.label" class="w-8 h-8 object-contain" />
                  <span class="text-sm font-semibold text-white leading-tight">{{ ferramenta.label }}</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed flex-1">{{ ferramenta.descricao }}</p>
                <span class="text-xs font-medium text-emerald-500 group-hover:text-emerald-400 transition-colors">
                  Abrir ferramenta →
                </span>
              </a>
            } @else {
              <div
                class="flex flex-col gap-4 bg-slate-900/50 border border-slate-800/50 rounded-xl p-5
                       opacity-50 cursor-not-allowed"
              >
                <div class="flex items-center gap-3">
                  <img [src]="ferramenta.icone" [alt]="ferramenta.label" class="w-8 h-8 object-contain grayscale" />
                  <span class="text-sm font-semibold text-slate-400 leading-tight">{{ ferramenta.label }}</span>
                </div>
                <p class="text-xs text-slate-500 leading-relaxed flex-1">{{ ferramenta.descricao }}</p>
                <span class="text-xs text-slate-600">Em breve</span>
              </div>
            }
          }
        </div>

      </main>

      <!-- Footer -->
      <footer class="border-t border-slate-800/60 py-4 px-6">
        <div class="max-w-4xl mx-auto flex items-center justify-between">
          <span class="text-xs text-slate-700">GLA Hub • Feito por Augusto</span>
        </div>
      </footer>

    </div>
  `,
})
export class HomeComponent {
  readonly ferramentas = FERRAMENTAS;
}
