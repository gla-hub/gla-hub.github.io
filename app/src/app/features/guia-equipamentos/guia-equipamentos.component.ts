import { Component } from '@angular/core';

interface LimiteRaridade {
  normal: number;
  raro: number;
  epico: number;
  lendario: number;
}

interface AtributoTabela {
  nome: string;
  limites: LimiteRaridade;
}

interface EquipamentoTabela {
  id: string;
  nome: string;
  imagem: string;
  atributos: AtributoTabela[];
}

const EQUIPAMENTOS: EquipamentoTabela[] = [
  {
    id: 'capacete',
    nome: 'Capacete',
    imagem: '/equipamentos/capacete.png',
    atributos: [
      { nome: 'Vitalidade', limites: { normal: 44, raro: 53, epico: 58, lendario: 59 } },
      { nome: 'Defesa', limites: { normal: 390, raro: 456, epico: 489, lendario: 499 } },
    ],
  },
  {
    id: 'armadura',
    nome: 'Armadura',
    imagem: '/equipamentos/armadura.png',
    atributos: [
      { nome: 'Vitalidade', limites: { normal: 56, raro: 67, epico: 72, lendario: 73 } },
      { nome: 'Defesa', limites: { normal: 1900, raro: 2236, epico: 2404, lendario: 2460 } },
    ],
  },
  {
    id: 'calca',
    nome: 'Calça',
    imagem: '/equipamentos/calca.png',
    atributos: [
      { nome: 'Vitalidade', limites: { normal: 10, raro: 12, epico: 13, lendario: 14 } },
      { nome: 'Defesa', limites: { normal: 1560, raro: 1822, epico: 1953, lendario: 1996 } },
    ],
  },
  {
    id: 'emblema',
    nome: 'Emblema',
    imagem: '/equipamentos/emblema.png',
    atributos: [
      { nome: 'Penetração', limites: { normal: 2390, raro: 2609, epico: 2719, lendario: 2755 } },
    ],
  },
  {
    id: 'arma',
    nome: 'Arma',
    imagem: '/equipamentos/sabre.png',
    atributos: [
      { nome: 'Ataque', limites: { normal: 7380, raro: 8112, epico: 8478, lendario: 8600 } },
    ],
  },
  {
    id: 'colar',
    nome: 'Colar',
    imagem: '/equipamentos/colar.png',
    atributos: [
      { nome: 'Ataque', limites: { normal: 4690, raro: 5116, epico: 5329, lendario: 5400 } },
    ],
  },
  {
    id: 'anel',
    nome: 'Anel',
    imagem: '/equipamentos/anel.png',
    atributos: [
      { nome: 'Crítico', limites: { normal: 125, raro: 131, epico: 134, lendario: 135 } },
      { nome: 'Ataque', limites: { normal: 1500, raro: 1590, epico: 1635, lendario: 1650 } },
    ],
  },
];

@Component({
  selector: 'app-guia-equipamentos',
  standalone: true,
  templateUrl: './guia-equipamentos.component.html',
})
export class TabelaRaridadeComponent {
  readonly equipamentos = EQUIPAMENTOS;
}
