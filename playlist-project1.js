/**
 * Copyright 2026 Sean Frey
 * @license Apache-2.0
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

//Slide component
class PlayListSlide extends LitElement {

  static get properties() {
    return {
      topHeading: { type: String, attribute: "top-heading" },
      secondHeading: { type: String, attribute: "second-heading" },
      active: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return css`
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

      .top {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-default-slateGray);
      }

      .second {
        font-size: var(--ddd-font-size-l);
        font-weight: bold;
        color: var(--ddd-theme-default-nittanyNavy);
        margin-bottom: var(--ddd-spacing-3);
      }

      .content {
        max-height: 200px;
        overflow-y: auto;
        font-size: var(--ddd-font-size-s);
      }
    `;
  }

  render() {
    return html`
      <div class="slide">
        <div class="top">${this.topHeading}</div>
        <div class="second">${this.secondHeading}</div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("play-list-slide", PlayListSlide);


// Wrapper 
export class PlaylistProject1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-project1";
  }

  static get properties() {
    return {
      index: { type: Number }
    };
  }

  constructor() {
    super();
    this.index = 0;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background: var(--ddd-theme-default-slateMaxLight);
          padding: var(--ddd-spacing-4);
          border-radius: var(--ddd-radius-lg);
        }

        .container {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
        }

        button {
          background: var(--ddd-theme-default-pughBlue);
          color: var(--ddd-theme-default-white);
          border: none;
          padding: var(--ddd-spacing-2);
          border-radius: var(--ddd-radius-sm);
          cursor: pointer;
        }

        button:disabled {
          background: var(--ddd-theme-default-slateGray);
          cursor: not-allowed;
        }

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

        @media (max-width: 600px) {
          .container {
            flex-direction: column;
          }
        }
      `
    ];
  }

  firstUpdated() {
    this._updateSlides();
  }

  _slides() {
    return this.querySelectorAll("play-list-slide");
  }

  _updateSlides() {
    const slides = this._slides();
    slides.forEach((slide, i) => {
      slide.active = i === this.index;
    });
    this.requestUpdate();
  }

  next() {
    const slides = this._slides();
    if (this.index < slides.length - 1) {
      this.index++;
      this._updateSlides();
    }
  }

  prev() {
    if (this.index > 0) {
      this.index--;
      this._updateSlides();
    }
  }

  goTo(i) {
    this.index = i;
    this._updateSlides();
  }

  render() {
    const slides = this._slides();

    return html`
      <div class="container">
        <button @click=${this.prev} ?disabled=${this.index === 0}>
          ◀
        </button>

        <div style="flex:1;">
          <slot></slot>
        </div>

        <button
          @click=${this.next}
          ?disabled=${this.index === slides.length - 1}>
          ▶
        </button>
      </div>

      <div class="dots">
        ${Array.from({ length: slides.length }).map(
          (_, i) => html`
            <div
              class="dot ${this.index === i ? "active" : ""}"
              @click=${() => this.goTo(i)}>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define(PlaylistProject1.tag, PlaylistProject1);
