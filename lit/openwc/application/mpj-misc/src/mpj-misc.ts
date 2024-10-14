import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

@customElement('mpj-misc')
export class MpjMisc extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = css``;

  render() {
    return html`
    Trial app
    `;
  }
}
