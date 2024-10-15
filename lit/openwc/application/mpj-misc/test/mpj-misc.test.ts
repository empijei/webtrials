import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { MpjMisc } from '../src/mpj-misc-root.js';
import '../src/mpj-misc-root.js';

describe('MpjMisc', () => {
  let element: MpjMisc;
  beforeEach(async () => {
    element = await fixture(html`<mpj-misc></mpj-misc>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
