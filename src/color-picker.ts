import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("color-picker")
export class ColorPicker extends LitElement {
  @property({ type: String }) labelWidth = "3rem";
  red = 0;
  green = 0;
  blue = 0;

  @query("#swatch") swatch!: HTMLDivElement;

  static styles = css`
    :host {
      display: flex;
      gap: 0.5rem;
    }

    #sliders {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    #swatch {
      background-color: black;
      height: 5rem;
      width: 5rem;
    }
  `;

  get color() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  private handleChange(event: CustomEvent) {
    const { label, value } = event.detail;
    (this as any)[label.toLowerCase()] = value;
    this.swatch.style.backgroundColor = this.color;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.color },
        bubbles: true,
      }),
    );
  }

  render() {
    return html`
      <div id="swatch"></div>
      <div id="sliders">
        <!-- prettier-ignore -->
        ${this.makeSlider("Red")}
        ${this.makeSlider("Green")}
        ${this.makeSlider("Blue")}
      </div>
    `;
  }

  makeSlider(label: string) {
    return html`
      <number-slider
        label=${label}
        labelWidth=${this.labelWidth}
        max="255"
        value=${(this as any)[label.toLowerCase()]}
        @change=${this.handleChange}
      ></number-slider>
    `;
  }
}
