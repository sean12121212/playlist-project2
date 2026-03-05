import { LitElement, html, css } from "lit";

export class PlaylistSlide extends LitElement {

  static properties = {
    topHeading: { type: String, attribute: "top-heading" },
    secondHeading: { type: String, attribute: "second-heading" },
    active: { type: Boolean, reflect: true }
  };

  static styles = css`
    :host {
      display: none;
    }

    :host([active]) {
      display: block;
    }

    .slide {
      background: var(--ddd-theme-default-white);
      padding: var(--ddd-spacing-4);
      border-radius: var(--ddd-radius-md);
    }

    .headings {
      padding-bottom: var(--ddd-spacing-2);
      margin-bottom: var(--ddd-spacing-3);
    }

    .underline {
      width: 60px;
      border-bottom: 2px solid var(--ddd-theme-default-pughBlue);
      padding-bottom: var(--ddd-spacing-1);
      margin-bottom: var(--ddd-spacing-2);
    }

    .top {
      font-size: var(--ddd-font-size-s);
      color: var(--ddd-theme-default-pughBlue);
      font-weight: 600;
      margin-bottom: var(--ddd-spacing-1);
    }

    .second {
      font-size: var(--ddd-font-size-xl);
      font-weight: bold;
      color: var(--ddd-theme-default-nittanyNavy);
    }

    .content {
      max-height: 200px;
      overflow-y: auto;
      font-size: var(--ddd-font-size-s);
      color: var(--ddd-theme-default-slateGray);
    }
  `;

  render() {
    return html`
      <div class="slide">
        <div class="headings">
          <div class="top">${this.topHeading}</div>
          <div class="second">${this.secondHeading}</div>
        </div>
        <div class="underline"></div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("playlist-slide", PlaylistSlide);