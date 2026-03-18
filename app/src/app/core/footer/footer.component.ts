import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer id="footer" class="border-t border-slate-800 py-5 shrink-0">
      <div class="max-w-4xl mx-auto px-6 flex items-center justify-between">

        <!-- Esquerda: versão -->
        <span id="footer-version" class="text-xs text-slate-600">GLA Hub — v1.1.0</span>

        <!-- Direita: ícones sociais + crédito + apoiar -->
        <div id="footer-right" class="flex items-center gap-4">

          <!-- Crédito -->
          <span class="text-xs text-slate-600">
            Desenvolvido por <span class="text-slate-400">Guto</span>
          </span>

          <div class="w-px h-4 bg-slate-700 rounded-full"></div>

          <!-- Ícones sociais -->
          <div class="flex items-center gap-4">
            <!-- GitHub -->
            <a
              id="footer-link-github"
              href="https://github.com/augustomarqq"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              class="text-slate-600 hover:text-slate-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <!-- LinkedIn -->
            <a
              id="footer-link-linkedin"
              href="https://linkedin.com/in/augustomarqq"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              class="text-slate-600 hover:text-slate-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <!-- Discord -->
            <div id="footer-discord-wrapper" class="relative group">
              <span class="text-slate-600 hover:text-slate-300 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </span>
              <!-- Tooltip -->
              <div id="footer-discord-tooltip" class="absolute bottom-full right-0 pb-2 hidden group-hover:flex">
                <div class="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 whitespace-nowrap shadow-lg">
                  <span>augusto_allan</span>
                  <button
                    id="footer-discord-copy-btn"
                    (click)="copiarDiscord()"
                    class="text-slate-500 hover:text-yellow-300 transition-colors"
                    [title]="discordCopiado() ? 'Copiado!' : 'Copiar'"
                  >
                    @if (discordCopiado()) {
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-emerald-400">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="w-px h-4 bg-slate-700 rounded-full"></div>

          <!-- Apoiar via PIX -->
          <button
            id="footer-pix-btn"
            (click)="pixModalAberto.set(true)"
            title="Apoiar via PIX"
            class="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-400 transition-colors"
          >
            Apoiar
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
          </button>

        </div>

      </div>
    </footer>

    <!-- Modal PIX -->
    @if (pixModalAberto()) {
      <div
        id="footer-pix-modal-overlay"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        (click)="pixModalAberto.set(false)"
      >
        <div
          id="footer-pix-modal"
          class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-80 shadow-2xl flex flex-col items-center gap-4"
          (click)="$event.stopPropagation()"
        >
          <div class="text-center">
            <p class="text-base font-bold text-white">Apoie o GLA Hub ☕</p>
            <p class="text-xs text-slate-400 mt-1">Se a ferramenta te ajudou, considere contribuir com qualquer valor e incentive o dev a continuar desenvolvendo mais ferramentas! :)</p>
          </div>
          <img id="footer-pix-modal-qrcode" [src]="pixQrUrl" alt="QR Code PIX" class="w-48 h-48 rounded-xl" />
          <div class="w-full flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
            <span id="footer-pix-modal-key" class="flex-1 text-xs text-slate-300 truncate font-mono">af4535fc-c12e-47dd...</span>
            <button
              id="footer-pix-modal-copy-btn"
              (click)="copiarPix()"
              class="shrink-0 text-slate-500 hover:text-yellow-300 transition-colors"
              [title]="pixCopiado() ? 'Copiado!' : 'Copiar chave PIX'"
            >
              @if (pixCopiado()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-emerald-400">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              }
            </button>
          </div>
          <button
            id="footer-pix-modal-close-btn"
            (click)="pixModalAberto.set(false)"
            class="text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >Fechar</button>
        </div>
      </div>
    }
  `,
})
export class FooterComponent {
  discordCopiado = signal(false);
  pixModalAberto = signal(false);
  pixCopiado = signal(false);

  private readonly PIX_CHAVE = 'af4535fc-c12e-47dd-80a3-7f13bc6a0d6c';
  private readonly PIX_PAYLOAD =
    '00020126580014BR.GOV.BCB.PIX0136af4535fc-c12e-47dd-80a3-7f13bc6a0d6c5204000053039865802BR5925Augusto Allan Marques Per6009SAO PAULO62140510ADqnqFnLmF6304AE14';

  copiarDiscord(): void {
    navigator.clipboard.writeText('augusto_allan').then(() => {
      this.discordCopiado.set(true);
      setTimeout(() => this.discordCopiado.set(false), 2000);
    });
  }

  copiarPix(): void {
    navigator.clipboard.writeText(this.PIX_CHAVE).then(() => {
      this.pixCopiado.set(true);
      setTimeout(() => this.pixCopiado.set(false), 2000);
    });
  }

  get pixQrUrl(): string {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(this.PIX_PAYLOAD)}&bgcolor=0f172a&color=ffffff&margin=16`;
  }
}
