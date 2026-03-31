import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QUIZ_DATA, QuizEntry } from './quiz-data';

const STORAGE_KEY = 'foxy-quiz-weekly';

/** Função pura de normalização reutilizada em compile-time e runtime. */
function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/** Índice pré-computado uma única vez no carregamento do módulo. */
const QUIZ_INDEX: { entry: QuizEntry; normalized: string }[] = QUIZ_DATA.map(e => ({
  entry: e,
  normalized: normalize(e.texto),
}));

@Component({
  selector: 'app-quiz-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="w-full max-w-4xl mx-auto px-6 pt-16 pb-12">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white tracking-tight">Foxy Quiz</h1>
        <p class="text-sm text-slate-500 mt-1">Pesquise uma afirmação para ver se ela é verdadeira ou falsa.</p>
        <p class="text-xs text-slate-600 mt-2">
          As respostas foram obtidas da
          <a href="https://wiki.gla.com.br/index.php/Resposta_Foxy_Quizz" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors">Wiki oficial do GLA</a>.
          Todo o crédito ao conteúdo é dos colaboradores da Wiki.
        </p>
      </div>

      <!-- Weekly check -->
      <label
        class="flex items-center gap-3 mb-6 cursor-pointer select-none w-fit group"
        (click)="toggleFeito()"
      >
        <span
          class="flex items-center justify-center w-5 h-5 rounded border-2 shrink-0 transition-all duration-150"
          [class]="feito()
            ? 'bg-emerald-500 border-emerald-500'
            : 'bg-transparent border-slate-600 group-hover:border-slate-400'"
        >
          @if (feito()) {
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          }
        </span>
        <span class="text-sm transition-colors duration-150" [class]="feito() ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'">
          {{ feito() ? 'Foxy Quiz concluído pela última vez em ' + feitoEm() : 'Já recebi a recompensa do Foxy Quiz nesta semana!' }}
        </span>
      </label>

      <!-- Search bar -->
      <div class="relative mb-6">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          [(ngModel)]="query"
          placeholder="Digite palavras-chave para pesquisar..."
          class="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white
                 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors duration-200"
        />
        @if (query()) {
          <button
            (click)="query.set('')"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-150"
            aria-label="Limpar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        }
      </div>

      <!-- Stats -->
      @if (query().trim().length >= 2) {
        <p class="text-xs text-slate-500 mb-4">
          {{ results().length }} resultado(s) encontrado(s)
          <span class="ml-2 text-emerald-500">{{ trueCount() }} verdadeiro(s)</span>
          <span class="mx-1 text-slate-600">·</span>
          <span class="text-red-400">{{ falseCount() }} falso(s)</span>
        </p>
      }

      <!-- Results -->
      @if (query().trim().length < 2) {
        <div class="text-sm text-slate-600 text-center py-16">
          Digite ao menos 2 caracteres para pesquisar.
        </div>
      } @else if (results().length === 0) {
        <div class="text-sm text-slate-600 text-center py-16">
          Nenhuma afirmação encontrada.
        </div>
      } @else {
        <ul class="flex flex-col gap-3">
          @for (item of results(); track item.texto) {
            <li
              class="flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed transition-colors duration-150"
              [class]="item.correto
                ? 'bg-emerald-900/70 border-emerald-600 text-emerald-100'
                : 'bg-red-900/70 border-red-600 text-red-100'"
            >
              <!-- Icon -->
              <span
                class="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs"
                [class]="item.correto ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'"
              >
                {{ item.correto ? '✓' : '✗' }}
              </span>

              <!-- Text with highlights -->
              <span [innerHTML]="highlight(item.texto)"></span>
            </li>
          }
        </ul>
      }

    </div>
  `,
})
export class QuizSearchComponent {
  readonly query = signal('');
  readonly feito = signal(false);
  readonly feitoEm = signal<string | null>(null);

  constructor() {
    const saved = this.loadSaved();
    this.feito.set(saved.checked);
    this.feitoEm.set(saved.date ?? null);
  }

  /** Retorna a chave da semana atual: a data da sexta-feira mais recente (YYYY-MM-DD). */
  private currentWeekKey(): string {
    const now = new Date();
    const day = now.getDay(); // 0=Dom … 5=Sex … 6=Sáb
    const daysToLastFriday = (day - 5 + 7) % 7;
    const friday = new Date(now);
    friday.setDate(now.getDate() - daysToLastFriday);
    return friday.toISOString().slice(0, 10);
  }

  private loadSaved(): { checked: boolean; date?: string } {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { checked: false };
      const { weekKey, checked, date } = JSON.parse(raw);
      if (weekKey !== this.currentWeekKey()) return { checked: false };
      return { checked: !!checked, date };
    } catch {
      return { checked: false };
    }
  }

  toggleFeito(): void {
    const next = !this.feito();
    const date = next ? this.formatDate(new Date()) : null;
    this.feito.set(next);
    this.feitoEm.set(date);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ weekKey: this.currentWeekKey(), checked: next, date }));
    } catch { /* ignorar erros de storage */ }
  }

  private formatDate(d: Date): string {
    const date = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const weekday = d.toLocaleDateString('pt-BR', { weekday: 'long' });
    return `${date} (${weekday})`;
  }

  /** Tokens derivados da query: normalizados (sem acento, lowercase), filtrados por length > 0. */
  private readonly queryTokens = computed<string[]>(() => {
    const raw = this.query().trim();
    if (raw.length < 2) return [];
    return raw.split(/\s+/).filter(t => t.length > 0).map(t => normalize(t));
  });

  readonly results = computed<QuizEntry[]>(() => {
    const tokens = this.queryTokens();
    if (tokens.length === 0) return [];
    return QUIZ_INDEX
      .filter(({ normalized }) => tokens.every(t => normalized.includes(t)))
      .map(({ entry }) => entry);
  });

  readonly trueCount  = computed(() => this.results().filter(r => r.correto).length);
  readonly falseCount = computed(() => this.results().filter(r => !r.correto).length);

  private escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  highlight(texto: string): string {
    const tokens = this.queryTokens();
    if (!tokens.length) return this.escapeHtml(texto);

    const normalizedText = normalize(texto);

    // Coleta todos os intervalos [start, end) para cada token
    const ranges: [number, number][] = [];
    for (const token of tokens) {
      let idx = 0;
      while (true) {
        const pos = normalizedText.indexOf(token, idx);
        if (pos === -1) break;
        ranges.push([pos, pos + token.length]);
        idx = pos + 1;
      }
    }

    if (!ranges.length) return this.escapeHtml(texto);

    // Ordena e mescla intervalos sobrepostos
    ranges.sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [];
    for (const r of ranges) {
      const last = merged[merged.length - 1];
      if (last && r[0] <= last[1]) {
        last[1] = Math.max(last[1], r[1]);
      } else {
        merged.push([r[0], r[1]]);
      }
    }

    // Monta o HTML usando os índices na string original (posições coincidem)
    let result = '';
    let cursor = 0;
    for (const [start, end] of merged) {
      result += this.escapeHtml(texto.slice(cursor, start));
      result += `<mark class="bg-yellow-400/30 text-yellow-200 rounded">${this.escapeHtml(texto.slice(start, end))}</mark>`;
      cursor = end;
    }
    result += this.escapeHtml(texto.slice(cursor));
    return result;
  }
}
