var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CARD_COSTS } from './data.js';
import './components/card-panel.js';
const initialCards = Array.from({ length: 12 }, (_, index) => ({
    id: `card-${index + 1}`,
    rarity: 'Common',
    level: 1
}));
debugger;
let SppdApp = class SppdApp extends LitElement {
    constructor() {
        super(...arguments);
        this.cards = initialCards;
        this.availableCaps = 0;
    }
    handleCardChange(event) {
        const customEvent = event;
        const { cardId, rarity, level, note } = customEvent.detail;
        this.cards = this.cards.map((card) => card.id === cardId ? { ...card, rarity, level, note: note ?? card.note } : card);
    }
    handleNoteChange(event) {
        const customEvent = event;
        const { cardId, note } = customEvent.detail;
        this.cards = this.cards.map((card) => card.id === cardId ? { ...card, note: note ?? card.note } : card);
    }
    getTotalCost() {
        return this.cards.reduce((sum, card) => sum + CARD_COSTS[card.rarity][card.level - 1], 0);
    }
    getBuffer() {
        return this.availableCaps - this.getTotalCost();
    }
    updateCaps(event) {
        const target = event.target;
        this.availableCaps = Number(target.value || 0);
    }
    render() {
        const totalCost = this.getTotalCost();
        const buffer = this.getBuffer();
        return html `
      <main>
        <section class="hero">
          <div>
            <h1>SPPD Calculator</h1>
            <p>Rebuild of the original deck upgrade cost planner in Lit.</p>
            </div>
          <div class="summary">
          </div>
          </section>
          
          <section class="controls">
          <div class="control-box">
            <div class="control-label">Available caps</div>
            <input
              type="number"
              min="-99999"
              max="99999"
              step="1"
              inputmode="numeric"
              .value=${String(this.availableCaps)}
              @input=${this.updateCaps}
            />
          </div>
          <div class="control-box">
            <div class="control-label">Total cost</div>
            <div class="control-value">${totalCost}</div>
          </div>
          <div class="control-box">
            <div class="control-label">Buffer</div>
            <div class="control-value ${buffer < 0 ? 'negative' : ''}">${buffer}</div>
          </div>
        </section>

        <section class="grid" @card-change=${this.handleCardChange} @card-note-change=${this.handleNoteChange}>
          ${this.cards.map((card, index) => html `
            <card-panel
              style="grid-column: ${index % 4 + 1}; grid-row: ${Math.floor(index / 4) + 1};"
              .cardId=${card.id}
              .note=${card.note || ''}
              .rarity=${card.rarity}
              .level=${card.level}
            ></card-panel>
          `)}
        </section>
      </main>
    `;
    }
};
SppdApp.styles = css `
    :host {
      display: block;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.25rem 3rem;
      display: grid;
      gap: 1.5rem;
    }

    .hero {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
      padding: 1.25rem;
      border-radius: 1rem;
      background: linear-gradient(135deg, #0f172a, #334155);
      color: white;
    }

    .hero h1 {
      margin: 0;
      font-size: 1.75rem;
    }

    .hero p {
      margin: 0.3rem 0 0;
      color: #cbd5e1;
    }

    .summary {
      display: grid;
      gap: 0.75rem;
      min-width: 260px;
      padding: 1rem;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(8px);
    }

    .summary strong {
      font-size: 1.15rem;
    }

    .summary .negative {
      color: #fda4af;
      font-weight: 700;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: #e5e7eb;
      color: #0f172a;
      border: 1px solid #d1d5db;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
      align-items: center;
    }

    .control-box {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.65rem 0.8rem;
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      background: #f9fafb;
      box-sizing: border-box;
      min-height: 2.7rem;
    }

    .control-label {
      font-size: 0.95rem;
      font-weight: 700;
      color: #334155;
      white-space: nowrap;
    }

    .control-label::after {
      content: ':';
    }

    .control-value {
      font-size: 1rem;
      font-weight: 600;
      color: #0f172a;
      white-space: nowrap;
    }

    .control-value.negative {
      color: #dc2626;
    }

    input[type='number'] {
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      padding: 0.5rem 0.6rem;
      font: inherit;
      width: 100%;
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
      text-align: left;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(220px, 1fr));
      grid-template-rows: repeat(3, minmax(180px, auto));
      gap: 1rem;
      align-items: start;
    }

    @media (max-width: 1100px) {
      .grid {
        grid-template-columns: repeat(2, minmax(220px, 1fr));
        grid-template-rows: repeat(6, minmax(180px, auto));
      }
    }

    @media (max-width: 640px) {
      .grid {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(12, minmax(180px, auto));
      }
    }
  `;
__decorate([
    state()
], SppdApp.prototype, "cards", void 0);
__decorate([
    state()
], SppdApp.prototype, "availableCaps", void 0);
SppdApp = __decorate([
    customElement('sppd-app')
], SppdApp);
export { SppdApp };
