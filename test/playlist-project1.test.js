import { html, fixture, expect } from '@open-wc/testing';
import "../playlist-project1.js";

describe("PlaylistProject1 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <playlist-project1
        title="title"
      ></playlist-project1>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
