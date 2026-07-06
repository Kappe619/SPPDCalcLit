import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CARD_COSTS, RARITY_OPTIONS } from '../data.js';
import type { CardChangeDetail, Rarity } from '../types.js';

@customElement('card-panel')
export class CardPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .panel {
      display: grid;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid #989ca1;
      border-radius: 0.75rem;
      background: #9ca3af;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
    }

    .panel h3 {
      margin: 0;
      font-size: 1rem;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      align-items: center;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.9rem;
      color: #687280;
      flex: 1;
    }

    select,
    input[type='number'] {
      border: 1px solid #949ba4;
      border-radius: 0.5rem;
      padding: 0.45rem 0.6rem;
      font: inherit;
    }

    .cost {
      font-weight: 700;
      color: #0f172a;
      text-align: right;
    }
  `;

  @property() label = 'Card';
  @property() cardId = '';
  @property({ type: String }) rarity: Rarity = 'Common';
  @property({ type: Number }) level = 1;
  @property({ type: Number }) cost = 0;

  protected updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('rarity') || changedProperties.has('level')) {
      debugger;
      this.cost = CARD_COSTS[this.rarity][this.level - 1];
    }
  }

  private handleRarityChange(event: Event) {
    debugger;
    const target = event.target as HTMLSelectElement;
    this.dispatchCardChange(target.value as Rarity, this.level);
  }

  private handleLevelChange(event: Event) {
    debugger;
    const target = event.target as HTMLInputElement;
    const level = Number(target.value);
    this.dispatchCardChange(this.rarity, level);
  }

  private dispatchCardChange(rarity: Rarity, level: number) {
    debugger;
    const detail: CardChangeDetail = {
      cardId: this.cardId,
      rarity,
      level
    };

    this.dispatchEvent(new CustomEvent<CardChangeDetail>('card-change', {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <section class="panel">
        <div class="row">
          <h3>${this.label}</h3>
          <div class="cost">Cost: ${this.cost}</div>
        </div>

        <label>
          Rarity
          <select .value=${this.rarity} @change=${this.handleRarityChange}>
            ${RARITY_OPTIONS.map((option) => html`<option value=${option}>${option}</option>`)}
          </select>
        </label>

        <label>
          Level
          <input
            type="number"
            min="1"
            max="7"
            .value=${String(this.level)}
            @input=${this.handleLevelChange}
          />
        </label>
      </section>
    `;
  }
}
