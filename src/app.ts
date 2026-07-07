import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { CARD_COSTS } from './data.js';
import './components/card-panel.js';
import type { CardChangeDetail, CardConfig, Rarity } from './types.js';

const initialCards: CardConfig[] = Array.from({ length: 12 }, (_, index) => ({
  id: `card-${index + 1}`,
  rarity: 'Common' as Rarity,
  level: 1
}));

debugger;

@customElement('sppd-app')
export class SppdApp extends LitElement {
  static styles = css`
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
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
      padding: 1rem 1.25rem;
      background: #e5e7eb;
      color: #0f172a;
      border: 1px solid #d1d5db;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.95rem;
      color: #475569;
    }

    input[type='number'] {
      border: 1px solid #cbd5e1;
      border-radius: 0.5rem;
      padding: 0.5rem 0.6rem;
      font: inherit;
      min-width: 180px;
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

  @state() private cards: CardConfig[] = initialCards;
  @state() private availableCaps = 0;

  private handleCardChange(event: Event) {
    const customEvent = event as CustomEvent<CardChangeDetail>;
    const { cardId, rarity, level, note } = customEvent.detail;

    this.cards = this.cards.map((card) =>
      card.id === cardId ? { ...card, rarity, level, note: note ?? card.note } : card
    );
  }


  private getTotalCost() {
    return this.cards.reduce((sum, card) => sum + CARD_COSTS[card.rarity][card.level - 1], 0);
  }

  private getBuffer() {
    return this.availableCaps - this.getTotalCost();
  }

  private updateCaps(event: Event) {
    const target = event.target as HTMLInputElement;
    this.availableCaps = Number(target.value || 0);
  }

  render() {
    const totalCost = this.getTotalCost();
    const buffer = this.getBuffer();

    return html`
      <main>
        <section class="hero">
          <div>
            <h1>SPPD Calculator</h1>
            <p>Rebuild of the original deck upgrade cost planner in Lit.</p>
          </div>
          <div class="summary">
            <div>Total cost: <strong>${totalCost}</strong></div>
            <div>Buffer: <strong class=${buffer < 0 ? 'negative' : ''}>${buffer}</strong></div>
          </div>
        </section>

        <section class="controls">
          <label>
            Available caps
            <input type="number" min="0" .value=${String(this.availableCaps)} @input=${this.updateCaps} />
          </label>          
        </section>

        <section class="grid" @card-change=${this.handleCardChange}>
          ${this.cards.map((card, index) => html`
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
}
