import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const FERRAMENTAS = [
  {
    label: 'Guia de Equipamentos',
    rota: '/guia-equipamentos',
    icone: '/equipamentos/armadura.png',
  },
  {
    label: 'Otimizador de Cristal Divino',
    rota: '/otimizador-cristal-divino',
    icone: '/Divine_Crystal.gif',
  },
  {
    label: 'Calculadora de Boost',
    rota: '/calculadora-boost',
    icone: '/radiant_crystal.gif',
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <!-- Backdrop mobile (apenas quando aberta) -->
    @if (!recolhida()) {
      <div
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
        (click)="recolhida.set(true)"
      ></div>
    }

    <!-- Botão flutuante para abrir (mobile, apenas quando fechada) -->
    @if (recolhida()) {
      <button
        id="sidebar-mobile-open-btn"
        (click)="recolhida.set(false)"
        class="sm:hidden fixed top-3 left-3 z-50 flex items-center justify-center w-9 h-9 bg-slate-900 border border-slate-800 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all shadow-lg"
        title="Abrir menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    }

    <aside
      id="sidebar"
      [class]="asideClass"
    >

      <!-- Brand + toggle -->
      <div id="sidebar-header" class="flex items-center border-b border-slate-800 shrink-0 h-14 px-3 gap-2">
        @if (!recolhida()) {
          <a id="sidebar-brand-link" routerLink="/" class="flex items-center gap-2.5 flex-1 min-w-0 px-1">
            <img src="/favicon.png" alt="GLA Hub" class="w-5 h-5 shrink-0" />
            <span class="text-sm font-bold text-white tracking-wide truncate">GLA Hub</span>
          </a>
        }
        <button
          id="sidebar-toggle-btn"
          (click)="recolhida.set(!recolhida())"
          class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all shrink-0"
          [title]="recolhida() ? 'Expandir menu' : 'Recolher menu'"
        >
          @if (recolhida()) {
            <!-- Hamburger -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          } @else {
            <!-- Chevron left / X no mobile -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          }
        </button>
      </div>

      <!-- Navegação -->
      <nav id="sidebar-nav" class="flex-1 px-2 py-4 overflow-hidden">

        <!-- Início -->
        <a
          id="sidebar-nav-home"
          routerLink="/home"
          routerLinkActive="bg-slate-700/50 !text-slate-200"
          [title]="recolhida() ? 'Início' : ''"
          (click)="fecharNoMobile()"
          class="flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all mb-3"
          [class.justify-center]="recolhida()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          @if (!recolhida()) {
            <span class="leading-tight truncate">Início</span>
          }
        </a>

        <!-- Ferramentas -->
        @if (!recolhida()) {
          <p id="sidebar-nav-tools-label" class="text-xs text-slate-600 uppercase tracking-widest px-2 mb-2">Ferramentas</p>
        }
        @for (f of ferramentas; track f.rota) {
          <a
            [id]="'sidebar-nav-tool-' + f.rota.slice(1)"
            [routerLink]="f.rota"
            routerLinkActive="bg-yellow-500/10 !text-yellow-300 border-l-2 border-yellow-400"
            [title]="recolhida() ? f.label : ''"
            (click)="fecharNoMobile()"
            class="flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all mb-1"
            [class.justify-center]="recolhida()"
            [class.pl-[10px]]="!recolhida()"
          >
            <img [src]="f.icone" [alt]="f.label" class="w-4 h-4 shrink-0" />
            @if (!recolhida()) {
              <span class="leading-tight truncate">{{ f.label }}</span>
            }
          </a>
        }
      </nav>

    </aside>
  `,
})
export class SidebarComponent {
  readonly ferramentas = FERRAMENTAS;
  recolhida = signal(typeof window !== 'undefined' && window.innerWidth < 640);

  get asideClass(): string {
    const base = 'fixed sm:relative inset-y-0 left-0 z-50 sm:z-auto bg-slate-900 border-r border-slate-800 flex flex-col h-screen sm:h-full shrink-0 transition-all duration-300';
    return this.recolhida()
      ? `${base} -translate-x-full sm:translate-x-0 w-60 sm:w-14`
      : `${base} translate-x-0 w-60`;
  }

  fecharNoMobile(): void {
    if (window.innerWidth < 640) this.recolhida.set(true);
  }
}