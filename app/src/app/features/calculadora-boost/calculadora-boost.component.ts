import { Component, signal, computed } from '@angular/core';

type TipoCristal = 'ceu' | 'sabio' | 'carmesim' | 'radiante';

interface NivelBoost {
  nivel: number;
  chance: number; // decimal (0.35 = 35%)
  pity: number;   // tentativa garantida
  cristal: TipoCristal;
}

const BOOST_LEVELS: NivelBoost[] = [
  { nivel: 1,  chance: 0.35, pity: 3,  cristal: 'ceu' },
  { nivel: 2,  chance: 0.30, pity: 4,  cristal: 'ceu' },
  { nivel: 3,  chance: 0.25, pity: 5,  cristal: 'ceu' },
  { nivel: 4,  chance: 0.20, pity: 6,  cristal: 'ceu' },
  { nivel: 5,  chance: 0.22, pity: 5,  cristal: 'sabio' },
  { nivel: 6,  chance: 0.18, pity: 6,  cristal: 'sabio' },
  { nivel: 7,  chance: 0.14, pity: 8,  cristal: 'sabio' },
  { nivel: 8,  chance: 0.10, pity: 11, cristal: 'sabio' },
  { nivel: 9,  chance: 0.10, pity: 11, cristal: 'carmesim' },
  { nivel: 10, chance: 0.09, pity: 12, cristal: 'carmesim' },
  { nivel: 11, chance: 0.08, pity: 13, cristal: 'carmesim' },
  { nivel: 12, chance: 0.07, pity: 15, cristal: 'carmesim' },
  { nivel: 13, chance: 0.06, pity: 17, cristal: 'radiante' },
  { nivel: 14, chance: 0.05, pity: 21, cristal: 'radiante' },
  { nivel: 15, chance: 0.04, pity: 26, cristal: 'radiante' },
  { nivel: 16, chance: 0.03, pity: 34, cristal: 'radiante' },
];

interface FaixaInfo {
  id: TipoCristal;
  label: string;
  niveis: string;
  icone: string;
  textClass: string;
  borderClass: string;
  bgClass: string;
  dotClass: string;
  inputFocusClass: string;
}

const FAIXAS: FaixaInfo[] = [
  {
    id: 'ceu',
    label: 'Cristal do Céu',
    niveis: '+1 → +4',
    icone: '/sky_crystal.gif',
    textClass: 'text-sky-300',
    borderClass: 'border-sky-500/40',
    bgClass: 'bg-sky-500/10',
    dotClass: 'bg-sky-400',
    inputFocusClass: 'focus:border-sky-400 focus:ring-sky-400/30',
  },
  {
    id: 'sabio',
    label: 'Cristal do Sábio',
    niveis: '+5 → +8',
    icone: '/sage_crystal.gif',
    textClass: 'text-violet-300',
    borderClass: 'border-violet-500/40',
    bgClass: 'bg-violet-500/10',
    dotClass: 'bg-violet-400',
    inputFocusClass: 'focus:border-violet-400 focus:ring-violet-400/30',
  },
  {
    id: 'carmesim',
    label: 'Cristal Carmesim',
    niveis: '+9 → +12',
    icone: '/crimson_crystal.gif',
    textClass: 'text-rose-300',
    borderClass: 'border-rose-500/40',
    bgClass: 'bg-rose-500/10',
    dotClass: 'bg-rose-400',
    inputFocusClass: 'focus:border-rose-400 focus:ring-rose-400/30',
  },
  {
    id: 'radiante',
    label: 'Cristal Radiante',
    niveis: '+13 → +16',
    icone: '/radiant_crystal.gif',
    textClass: 'text-amber-300',
    borderClass: 'border-amber-500/40',
    bgClass: 'bg-amber-500/10',
    dotClass: 'bg-amber-400',
    inputFocusClass: 'focus:border-amber-400 focus:ring-amber-400/30',
  },
];

interface EquipamentoBoost {
  id: string;
  nome: string;
  icone: string;
  cristais: 2 | 4;
}

const EQUIPAMENTOS_BOOST: EquipamentoBoost[] = [
  { id: 'capacete',  nome: 'Capacete',  icone: '/equipamentos/capacete.png', cristais: 2 },
  { id: 'armadura',  nome: 'Armadura',  icone: '/equipamentos/armadura.png', cristais: 4 },
  { id: 'calca',     nome: 'Calça',     icone: '/equipamentos/calca.png',    cristais: 2 },
  { id: 'emblema',   nome: 'Emblema',   icone: '/equipamentos/emblema.png',  cristais: 2 },
  { id: 'arma',      nome: 'Arma',      icone: '/equipamentos/sabre.png',    cristais: 4 },
  { id: 'acessorio', nome: 'Acessório', icone: '/equipamentos/colar.png',    cristais: 4 },
];

/**
 * Calcula o número esperado de tentativas para alcançar um sucesso,
 * considerando o sistema de garantia (pity) que força o sucesso na
 * `pity`-ésima tentativa consecutiva sem sucesso.
 *
 * E = Σ(k=1..g-1) [k · p · (1-p)^(k-1)] + g · (1-p)^(g-1)
 */
function calcTentativasEsperadas(chance: number, pity: number): number {
  const p = chance;
  let e = 0;
  for (let k = 1; k < pity; k++) {
    e += k * p * Math.pow(1 - p, k - 1);
  }
  e += pity * Math.pow(1 - p, pity - 1);
  return e;
}

@Component({
  selector: 'app-calculadora-boost',
  standalone: true,
  templateUrl: './calculadora-boost.component.html',
})
export class CalculadoraBoostComponent {
  readonly faixas = FAIXAS;
  readonly equipamentosBoost = EQUIPAMENTOS_BOOST;

  precoCeu      = signal<number | null>(null);
  precoSabio    = signal<number | null>(null);
  precoCarmesim = signal<number | null>(null);
  precoRadiante = signal<number | null>(null);

  guardadosCeu      = signal<number | null>(null);
  guardadosSabio    = signal<number | null>(null);
  guardadosCarmesim = signal<number | null>(null);
  guardadosRadiante = signal<number | null>(null);

  detalhesAbertos = signal(false);
  equipamentoDetalhesAtivo = signal<string>('capacete');
  equipamentosSelecionados = signal<Set<string>>(new Set());
  armaEspecial = signal(false);
  modoMaximo = signal(false);

  private precoMap = computed(() => ({
    ceu:      this.precoCeu()      ?? 0,
    sabio:    this.precoSabio()    ?? 0,
    carmesim: this.precoCarmesim() ?? 0,
    radiante: this.precoRadiante() ?? 0,
  }));

  private guardadosMap = computed(() => ({
    ceu:      Math.max(0, this.guardadosCeu()      ?? 0),
    sabio:    Math.max(0, this.guardadosSabio()    ?? 0),
    carmesim: Math.max(0, this.guardadosCarmesim() ?? 0),
    radiante: Math.max(0, this.guardadosRadiante() ?? 0),
  }));

  resumoPorEquipamento = computed(() => {
    const precos = this.precoMap();
    const selecionados = this.equipamentosSelecionados();
    const armaEspecial = this.armaEspecial();
    const maximo = this.modoMaximo();
    return EQUIPAMENTOS_BOOST.map((eq) => {
      let totalCristais = 0;
      let totalCristaisFiltrado = 0;
      let totalCusto = 0;
      for (const nivel of BOOST_LEVELS) {
        const chance = (eq.id === 'arma' && armaEspecial) ? 0.20 : nivel.chance;
        const pity   = (eq.id === 'arma' && armaEspecial) ? 6    : nivel.pity;
        const tent = maximo ? pity : calcTentativasEsperadas(chance, pity);
        const cristais = Math.round(tent) * eq.cristais;
        totalCristais += cristais;
        if (precos[nivel.cristal] > 0) totalCristaisFiltrado += cristais;
        totalCusto += cristais * precos[nivel.cristal];
      }
      return { ...eq, totalCristais, totalCristaisFiltrado: totalCristaisFiltrado, totalCusto, selecionado: selecionados.has(eq.id) };
    });
  });

  resumoPorFase = computed(() => {
    const precos = this.precoMap();
    const guardados = this.guardadosMap();
    const selecionados = this.equipamentosSelecionados();
    const armaEspecial = this.armaEspecial();
    const maximo = this.modoMaximo();
    const equipSelecionados = EQUIPAMENTOS_BOOST.filter(e => selecionados.has(e.id));
    return FAIXAS.map((faixa) => {
      const niveisDoFaixa = BOOST_LEVELS.filter(n => n.cristal === faixa.id);
      let totalCristais = 0;
      let totalCustoRaw = 0;
      for (const eq of equipSelecionados) {
        for (const nivel of niveisDoFaixa) {
          const chance = (eq.id === 'arma' && armaEspecial) ? 0.20 : nivel.chance;
          const pity   = (eq.id === 'arma' && armaEspecial) ? 6    : nivel.pity;
          const tent = maximo ? pity : calcTentativasEsperadas(chance, pity);
          const cristais = Math.round(tent) * eq.cristais;
          totalCristais += cristais;
          totalCustoRaw += cristais * precos[faixa.id];
        }
      }
      const totalCusto = Math.max(0, totalCustoRaw - guardados[faixa.id] * precos[faixa.id]);
      return { ...faixa, totalCristais, totalCusto };
    });
  });

  totalSet = computed(() => {
    const precos = this.precoMap();
    const r = this.resumoPorEquipamento().filter(e => e.selecionado);
    const fases = this.resumoPorFase();
    return {
      cristais: fases
        .filter(f => precos[f.id] > 0)
        .reduce((s, f) => s + f.totalCristais, 0),
      custo:    fases.reduce((s, f) => s + f.totalCusto, 0),
      count:    r.length,
    };
  });

  detalhesPorNivel = computed(() => {
    const precos = this.precoMap();
    const maximo = this.modoMaximo();
    const eq = EQUIPAMENTOS_BOOST.find((e) => e.id === this.equipamentoDetalhesAtivo()) ?? EQUIPAMENTOS_BOOST[0];
    const mult = eq.cristais;
    const isArmaEspecial = eq.id === 'arma' && this.armaEspecial();
    return BOOST_LEVELS.map((n) => {
      const faixa = FAIXAS.find((f) => f.id === n.cristal)!;
      const chance = isArmaEspecial ? 0.20 : n.chance;
      const pity   = isArmaEspecial ? 6    : n.pity;
      const tentativasRaw = maximo ? pity : calcTentativasEsperadas(chance, pity);
      const tentativas = Math.round(tentativasRaw);
      const cristais = tentativas * mult;
      const custo = cristais * precos[n.cristal];
      return { ...n, chance, pity, tentativas, cristais, custo, faixa };
    });
  });

  algumPrecoPreenchido = computed(
    () =>
      (this.precoCeu()      ?? 0) > 0 ||
      (this.precoSabio()    ?? 0) > 0 ||
      (this.precoCarmesim() ?? 0) > 0 ||
      (this.precoRadiante() ?? 0) > 0
  );

  todosPrecosPreenchidos = computed(
    () =>
      (this.precoCeu()      ?? 0) > 0 &&
      (this.precoSabio()    ?? 0) > 0 &&
      (this.precoCarmesim() ?? 0) > 0 &&
      (this.precoRadiante() ?? 0) > 0
  );

  atualizarPreco(cristal: TipoCristal, valor: string): void {
    const num = valor === '' ? null : Number(valor);
    const v = num === null || isNaN(num) ? null : Math.max(0, num);
    if (cristal === 'ceu')      this.precoCeu.set(v);
    if (cristal === 'sabio')    this.precoSabio.set(v);
    if (cristal === 'carmesim') this.precoCarmesim.set(v);
    if (cristal === 'radiante') this.precoRadiante.set(v);
  }

  atualizarGuardados(cristal: TipoCristal, valor: string): void {
    const num = valor === '' ? null : Number(valor);
    const v = num === null || isNaN(num) ? null : Math.max(0, Math.floor(num));
    if (cristal === 'ceu')      this.guardadosCeu.set(v);
    if (cristal === 'sabio')    this.guardadosSabio.set(v);
    if (cristal === 'carmesim') this.guardadosCarmesim.set(v);
    if (cristal === 'radiante') this.guardadosRadiante.set(v);
  }

  guardadosAtual(cristal: TipoCristal): number | null {
    if (cristal === 'ceu')      return this.guardadosCeu();
    if (cristal === 'sabio')    return this.guardadosSabio();
    if (cristal === 'carmesim') return this.guardadosCarmesim();
    if (cristal === 'radiante') return this.guardadosRadiante();
    return null;
  }

  precoAtual(cristal: TipoCristal): number | null {
    if (cristal === 'ceu')      return this.precoCeu();
    if (cristal === 'sabio')    return this.precoSabio();
    if (cristal === 'carmesim') return this.precoCarmesim();
    if (cristal === 'radiante') return this.precoRadiante();
    return null;
  }

  toggleArmaEspecial(): void {
    const next = !this.armaEspecial();
    this.armaEspecial.set(next);
    if (next) {
      this.equipamentosSelecionados.update(s => {
        const n = new Set(s);
        n.add('arma');
        return n;
      });
    }
  }

  toggleEquipamento(id: string): void {
    this.equipamentosSelecionados.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  eqCardClass(id: string): string {
    const base = 'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 cursor-pointer';
    const selecionado = this.equipamentosSelecionados().has(id);
    const armaSpecial = id === 'arma' && selecionado && this.armaEspecial();
    if (armaSpecial) return `${base} bg-yellow-400/30 border-yellow-400 text-yellow-100`;
    return selecionado
      ? `${base} bg-yellow-500/10 border-yellow-400 text-yellow-300`
      : `${base} bg-slate-800 border-slate-700 text-slate-500`;
  }

  eqDetalhesButtonClass(id: string): string {
    const base = 'flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer';
    return this.equipamentoDetalhesAtivo() === id
      ? `${base} bg-yellow-500/10 border-yellow-400 text-yellow-300`
      : `${base} bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700`;
  }

  formatarCusto(n: number): string {
    if (n === 0) return '—';
    if (n >= 1_000_000_000) return parseFloat((n / 1_000_000_000).toFixed(2)) + 'B';
    if (n >= 1_000_000)     return parseFloat((n / 1_000_000).toFixed(2)) + 'M';
    if (n >= 1_000)         return parseFloat((n / 1_000).toFixed(1)) + 'K';
    return n.toFixed(0);
  }
}
