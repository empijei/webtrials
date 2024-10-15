import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// Sub-components
import "./mpj-nav.js"
import "./mpj-table.js"


@customElement('mpj-misc-root')
export class MpjMisc extends LitElement {
  static styles = css``;

  render() {
    return html`
    <mpj-nav></mpj-nav>
    `;
  }
}