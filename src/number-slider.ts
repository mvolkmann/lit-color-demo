import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("number-slider")
export class NumberSlider extends LitElement {
  @property({ type: String }) label = "";
  @property({ type: String }) labelWidth = "";
  @property({ type: Number }) max = 100;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) value = 0;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input[type="range"] {
      width: 7rem;
    }

    label {
      font-weight: bold;
      text-align: right;
      width: this.labelWidth;
    }
  `;

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { label: this.label, value: this.value },
        bubbles: true,
      }),
    );
  }

  render() {
    return html`
      <label>${this.label}</label>
      <input
        type="range"
        min=${this.min}
        max=${this.max}
        .value=${this.value}
        @input=${this.handleInput}
      />
      <span>${this.value}</span>
    `;
  }
}
