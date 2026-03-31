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
    label: 'Guia de Equipamentos',
    descricao:
      'Consulte os atributos mínimos de cada equipamento para atingir as raridades Raro, Épico e Lendário.',
    rota: '/guia-equipamentos',
    icone: '/equipamentos/armadura.png',
    disponivel: true,
  },
  {
    label: 'Otimizador de Cristal Divino',
    descricao:
      'Calcule quantos Cristais Divinos são necessários para maximizar cada atributo do seu equipamento.',
    rota: '/otimizador-cristal-divino',
    icone: '/Divine_Crystal.gif',
    disponivel: true,
  },
  {
    label: 'Calculadora de Boost',
    descricao:
      'Estime quantos cristais e berries você vai gastar em média para boostar um equipamento do +0 ao +16.',
    rota: '/calculadora-boost',
    icone: '/radiant_crystal.gif',
    disponivel: true,
  },
  {
    label: 'Foxy Quiz',
    descricao:
      'Pesquisa pelas respostas do Foxy Quiz de maneira rápida e dinâmica para garantir a sua recompensa semanal sem maiores dificuldades.',
    rota: '/foxy-quiz',
    icone: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/%3E%3Ccircle cx='12' cy='17' r='.5' fill='%2394a3b8'/%3E%3C/svg%3E`,
    disponivel: true,
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div id="home-page" class="w-full">

      <main id="home-main" class="flex-1 w-full max-w-4xl mx-auto px-6 pt-16 pb-12">

        <!-- Cabeçalho -->
        <div id="home-header" class="mb-10">
          <h1 id="home-title" class="text-2xl font-bold text-white tracking-tight">Ferramentas</h1>
          <p class="text-sm text-slate-500 mt-1">Selecione uma ferramenta para começar.</p>
        </div>

        <!-- Grid de cards -->
        <div id="home-tools-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          @for (ferramenta of ferramentas; track ferramenta.rota) {
            @if (ferramenta.disponivel) {
              <a
                [id]="'home-tool-card-' + ferramenta.rota.slice(1)"
                [routerLink]="ferramenta.rota"
                class="group relative flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5
                       hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer"
              >
                <span class="absolute top-4 right-4 text-slate-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200">→</span>
                <div class="flex items-center gap-3">
                  <img [src]="ferramenta.icone" [alt]="ferramenta.label" class="w-8 h-8 object-contain" />
                  <span class="text-sm font-semibold text-white leading-tight pr-4">{{ ferramenta.label }}</span>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">{{ ferramenta.descricao }}</p>
              </a>
            } @else {
              <div
                [id]="'home-tool-card-' + ferramenta.rota.slice(1) + '-disabled'"
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


    </div>
  `,
})
export class HomeComponent {
  readonly ferramentas = FERRAMENTAS;
}
