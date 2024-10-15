/* eslint-disable max-classes-per-file */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

@customElement('mpj-table')
export class MpjTable extends LitElement {
  static styles = css`
    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }
  `;

  @property()
  headers = [{ id: 0, name: '' }];

  constructor() {
    super();
    this.headers = [
      '#',
      'Host',
      'Method',
      'Path',
      'Params',
      'Edited',
      'Status',
      'Length',
      'MIME',
    ].map((v, i) => ({ id: i, name: v }));
  }

  @property()
  rows = [
    [0, 'https://foo.baz', 'GET', '/foo', true, false, 200, 42, 'text/html'],
    [
      1,
      'http://cat.lol',
      'GET',
      '/bar',
      false,
      true,
      203,
      17,
      'application/javascript',
    ],
  ];

  render() {
    return html`
      <table>
        <tr>
          ${this.headers.map(
            (h, i) =>
              html`<th>
                <button @click=${() => this.moveHeader(i, -1)}>&lt;</button
                >${h.name}<button @click=${() => this.moveHeader(i, 1)}>
                  &gt;
                </button>
              </th>`,
          )}
        </tr>
        ${repeat(
          this.rows,
          r => r[0],
          r =>
            html`<tr>
              ${this.headers.map(h => h.id).map(id => html`<td>${r[id]}</td>`)}
            </tr>`,
        )}
      </table>
    `;
  }

  moveHeader(index: number, moveBy: number) {
    if (index + moveBy < 0 || index + moveBy > this.headers.length) {
      return;
    }
    console.log(index, moveBy, this.headers);
    const h = this.headers.splice(index, 1)[0];
    this.headers.splice(index + moveBy, 0, h);
    this.requestUpdate();
  }
}
