import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

import "./playlist-slide.js";
import "./playlist-arrow.js";
import "./playlist-indicator.js";

export class PlaylistProject1 extends DDDSuper(I18NMixin(LitElement)) {

  static properties = {
    index: { type: Number }
  };

  constructor() {
    super();
    this.index = 0;
  }

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
        background: var(--ddd-theme-default-slateMaxLight);
        padding: var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-lg);
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-3);
      }

      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ddd-spacing-4);
      }

      .slides {
        flex: 1;
        min-height: 300px;
      }

      @media (max-width: 600px) {
        .container {
          flex-direction: column;
        }
      }
    `
  ];

  firstUpdated() {
    this._updateSlides();
  }

  updated(changedProperties) {
    if (changedProperties.has("index")) {
      this._updateSlides();
    }
  }

  _slides() {
    return this.querySelectorAll("playlist-slide");
  }

  _updateSlides() {
    const slides = this._slides();
    slides.forEach((slide, i) => {
      slide.active = i === this.index;
    });
  }

  _handleArrow(e) {
    const slides = this._slides();
    if (e.detail.direction === "next" && this.index < slides.length - 1) {
      this.index++;
    }
    if (e.detail.direction === "prev" && this.index > 0) {
      this.index--;
    }
  }

  _handleIndicator(e) {
    this.index = e.detail.index;
  }

  render() {
    const slides = this._slides();

    return html`
      <div class="wrapper">
        <div class="container">

          <playlist-arrow
            direction="prev"
            @arrow-click=${this._handleArrow}>
          </playlist-arrow>

          <div class="slides">
            <slot></slot>
          </div>

          <playlist-arrow
            direction="next"
            @arrow-click=${this._handleArrow}>
          </playlist-arrow>

        </div>

        <playlist-indicator
          .count=${slides.length}
          .index=${this.index}
          @indicator-click=${this._handleIndicator}>
        </playlist-indicator>
      </div>
    `;
  }
}

customElements.define("playlist-project1", PlaylistProject1);