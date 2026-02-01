import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";

@customElement("color-demo")
export class ColorDemo extends LitElement {
  @query("p") p!: HTMLParagraphElement;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-family: sans-serif;
    }
    p {
      font-size: 18px;
    }
  `;

  private colorChange(event: CustomEvent) {
    const p = this.renderRoot.querySelector("p") as HTMLElement;
    p.style.color = event.detail.value;
  }

  private sizeChange(event: CustomEvent) {
    this.p.style.fontSize = event.detail.value + "px";
  }

  render() {
    return html`
      <color-picker @change=${this.colorChange}></color-picker>
      <number-slider
        label="Size"
        max="48"
        min="12"
        name="size"
        value="18"
        @change=${this.sizeChange}
      ></number-slider>
      <p>This is a test.</p>
    `;
  }
}
