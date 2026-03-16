import { Component, signal } from '@angular/core';

interface Atributo {
  nome: string;
  min: number;
  max: number;
  incremento: number;
}

interface Equipamento {
  id: string;
  nome: string;
  imagem: string;
  atributos: Atributo[];
}

const EQUIPAMENTOS: Equipamento[] = [
  {
    id: 'capacete',
    nome: 'Capacete',
    imagem: '/equipamentos/capacete.png',
    atributos: [
      { nome: 'Vitalidade', min: 44, max: 59, incremento: 1 },
      { nome: 'Defesa', min: 390, max: 499, incremento: 15 },
    ],
  },
  {
    id: 'armadura',
    nome: 'Armadura',
    imagem: '/equipamentos/armadura.png',
    atributos: [
      { nome: 'Vitalidade', min: 56, max: 73, incremento: 1 },
      { nome: 'Defesa', min: 1900, max: 2460, incremento: 40 },
    ],
  },
  {
    id: 'calca',
    nome: 'Calça',
    imagem: '/equipamentos/calca.png',
    atributos: [
      { nome: 'Vitalidade', min: 10, max: 14, incremento: 1 },
      { nome: 'Defesa', min: 1560, max: 1996, incremento: 30 },
    ],
  },
  {
    id: 'emblema',
    nome: 'Emblema',
    imagem: '/equipamentos/emblema.png',
    atributos: [{ nome: 'Penetração', min: 2390, max: 2755, incremento: 35 }],
  },
  {
    id: 'arma',
    nome: 'Arma',
    imagem: '/equipamentos/sabre.png',
    atributos: [{ nome: 'Ataque', min: 7380, max: 8600, incremento: 80 }],
  },
  {
    id: 'colar',
    nome: 'Colar',
    imagem: '/equipamentos/colar.png',
    atributos: [{ nome: 'Ataque', min: 4690, max: 5400, incremento: 30 }],
  },
  {
    id: 'anel',
    nome: 'Anel',
    imagem: '/equipamentos/anel.png',
    atributos: [{ nome: 'Crítico', min: 125, max: 135, incremento: 1 }],
  },
];

@Component({
  selector: 'app-otimizador',
  standalone: true,
  templateUrl: './otimizador.component.html',
})
export class OtimizadorComponent {
  readonly equipamentos = EQUIPAMENTOS;

  equipamentoSelecionado = signal<Equipamento | null>(null);
  valoresAtuais = signal<Record<string, number | null>>({});
  private readonly valoresPorEquipamento: Record<string, Record<string, number | null>> = {};

  selecionarEquipamento(eq: Equipamento): void {
    this.equipamentoSelecionado.set(eq);
    if (!this.valoresPorEquipamento[eq.id]) {
      const vals: Record<string, number | null> = {};
      eq.atributos.forEach((a) => (vals[a.nome] = null));
      this.valoresPorEquipamento[eq.id] = vals;
    }
    this.valoresAtuais.set({ ...this.valoresPorEquipamento[eq.id] });
  }

  atualizarValor(atributo: Atributo, valor: string): void {
    const num = valor === '' ? null : Number(valor);
    const v = isNaN(num as number) ? null : num;
    this.valoresAtuais.update((vals) => ({ ...vals, [atributo.nome]: v }));
    this.persistirValores();
  }

  adicionarCristal(atributo: Atributo): void {
    const atual = this.valoresAtuais()[atributo.nome] ?? atributo.min;
    const novo = Math.min(atributo.max, atual + atributo.incremento);
    this.valoresAtuais.update((v) => ({ ...v, [atributo.nome]: novo }));
    this.persistirValores();
  }

  subtrairCristal(atributo: Atributo): void {
    const atual = this.valoresAtuais()[atributo.nome] ?? atributo.min;
    const novo = Math.max(atributo.min, atual - atributo.incremento);
    this.valoresAtuais.update((v) => ({ ...v, [atributo.nome]: novo }));
    this.persistirValores();
  }

  private persistirValores(): void {
    const eq = this.equipamentoSelecionado();
    if (eq) {
      this.valoresPorEquipamento[eq.id] = { ...this.valoresAtuais() };
    }
  }

  cristaisNecessarios(atributo: Atributo): number {
    const atual = this.valoresAtuais()[atributo.nome] ?? atributo.min;
    if (atual >= atributo.max) return 0;
    return Math.ceil((atributo.max - atual) / atributo.incremento);
  }

  maxCristais(atributo: Atributo): number {
    return Math.ceil((atributo.max - atributo.min) / atributo.incremento);
  }

  cristaisArray(atributo: Atributo): boolean[] {
    const needed = this.cristaisNecessarios(atributo);
    const total = this.maxCristais(atributo);
    return Array.from({ length: total }, (_, i) => i < needed);
  }

  attrSlug(nome: string): string {
    return nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  }

  buttonClass(id: string): string {
    const base =
      'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 cursor-pointer';
    return this.equipamentoSelecionado()?.id === id
      ? `${base} bg-yellow-500/10 border-yellow-400 text-yellow-300`
      : `${base} bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700`;
  }
}
