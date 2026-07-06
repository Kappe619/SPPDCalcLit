var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CARD_COSTS, RARITY_OPTIONS } from '../data.js';
let CardPanel = class CardPanel extends LitElement {
    constructor() {
        super(...arguments);
        this.label = 'Card';
        this.cardId = '';
        this.rarity = 'Common';
        this.level = 1;
        this.cost = 0;
    }
    updated(changedProperties) {
        if (changedProperties.has('rarity') || changedProperties.has('level')) {
            this.cost = CARD_COSTS[this.rarity][this.level - 1];
        }
    }
    handleRarityChange(event) {
        const target = event.target;
        this.dispatchCardChange(target.value, this.level);
    }
    handleLevelChange(event) {
        const target = event.target;
        const level = Number(target.value);
        this.dispatchCardChange(this.rarity, level);
    }
    dispatchCardChange(rarity, level) {
        const detail = {
            cardId: this.cardId,
            rarity,
            level
        };
        this.dispatchEvent(new CustomEvent('card-change', {
            detail,
            bubbles: true,
            composed: true
        }));
    }
    render() {
        return html `
      <section class="panel">
        <div class="row">
          <h3>${this.label}</h3>
          <div class="cost">Cost: ${this.cost}</div>
        </div>

        <label>
          Rarity
          <select .value=${this.rarity} @change=${this.handleRarityChange}>
            ${RARITY_OPTIONS.map((option) => html `<option value=${option}>${option}</option>`)}
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
};
CardPanel.styles = css `
    :host {
      display: block;
    }

    .panel {
      display: grid;
      gap: 0.75rem;
      padding: 1rem;
      border: 1px solid #d5d7db;
      border-radius: 0.75rem;
      background: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
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
      color: #4b5563;
      flex: 1;
    }

    select,
    input[type='number'] {
      border: 1px solid #cbd5e1;
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
__decorate([
    property()
], CardPanel.prototype, "label", void 0);
__decorate([
    property()
], CardPanel.prototype, "cardId", void 0);
__decorate([
    property({ type: String })
], CardPanel.prototype, "rarity", void 0);
__decorate([
    property({ type: Number })
], CardPanel.prototype, "level", void 0);
__decorate([
    property({ type: Number })
], CardPanel.prototype, "cost", void 0);
CardPanel = __decorate([
    customElement('card-panel')
], CardPanel);
export { CardPanel };
