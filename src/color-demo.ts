import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("color-demo")
export class ColorDemo extends LitElement {
  @property({ type: String }) color = "black";
  @property({ type: Number }) size = 18;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }
    p {
      color: this.color;
      font-size: this.size + "px";
    }
  `;

  private colorChange(event: CustomEvent) {
    this.color = event.detail.value;
    const p = this.renderRoot.querySelector("p") as HTMLElement;
    p.style.color = this.color;
  }

  private sizeChange(event: CustomEvent) {
    this.size = event.detail.value;
    const p = this.renderRoot.querySelector("p") as HTMLElement;
    p.style.fontSize = this.size + "px";
  }

  render() {
    return html`
      <color-picker
        color="this.color"
        @change=${this.colorChange}
      ></color-picker>
      <number-slider
        label="Size"
        max="48"
        min="12"
        name="size"
        .value=${this.size}
        @change=${this.sizeChange}
      ></number-slider>
      <p>This is a test.</p>
    `;
  }
}
