import { LitElement, html, css } from "lit";

export class PlaylistArrow extends LitElement {

  static properties = {
    direction: { type: String }
  };

  static styles = css`
    button {
      background: var(--ddd-theme-default-pughBlue);
      color: var(--ddd-theme-default-white);
      border: none;
      padding: var(--ddd-spacing-2);
      border-radius: var(--ddd-radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 1.2em;
    }

    button:hover {
      background: var(--ddd-theme-default-nittanyNavy);
      transform: scale(1.1);
    }

    button:active {
      transform: scale(0.95);
    }

    button:disabled {
      background: var(--ddd-theme-default-slateGray);
      cursor: not-allowed;
      transform: scale(1);
    }
  `;

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("arrow-click", {
        bubbles: true,
        composed: true,
        detail: { direction: this.direction }
      })
    );
  }

  render() {
    return html`
      <button @click=${this._handleClick}>
        ${this.direction === "prev" ? "◀" : "▶"}
      </button>
    `;
  }
}

customElements.define("playlist-arrow", PlaylistArrow);