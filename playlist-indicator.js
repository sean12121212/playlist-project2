import { LitElement, html, css } from "lit";

export class PlaylistIndicator extends LitElement {

  static properties = {
    count: { type: Number },
    index: { type: Number }
  };

  static styles = css`
    .dots {
      display: flex;
      justify-content: center;
      margin-top: var(--ddd-spacing-3);
      gap: var(--ddd-spacing-2);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--ddd-theme-default-slateGray);
      cursor: pointer;
    }

    .dot.active {
      background: var(--ddd-theme-default-nittanyNavy);
    }
  `;

  _goTo(i) {
    this.dispatchEvent(
      new CustomEvent("indicator-click", {
        bubbles: true,
        composed: true,
        detail: { index: i }
      })
    );
  }

  render() {
    return html`
      <div class="dots">
        ${Array.from({ length: this.count }).map(
          (_, i) => html`
            <div
              class="dot ${this.index === i ? "active" : ""}"
              @click=${() => this._goTo(i)}>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("playlist-indicator", PlaylistIndicator);
