/* eslint-disable max-classes-per-file */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

enum SortingOrder {
  None,
  Ascending,
  Descending,
}

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
              html`<th @dblclick=${() => this.sortBy(h.id)}>
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
    const h = this.headers.splice(index, 1)[0];
    this.headers.splice(index + moveBy, 0, h);
    this.requestUpdate();
  }

  static orders = ['', '↑', '↓'];

  @property()
  sortingHeader = 0;

  @property()
  sortingOrder = SortingOrder.Ascending;

  sortBy(index: number, order: number) {
    if (index === this.sortingHeader && order === this.sortingOrder) {
      return;
    }

    let i = index;
    // TODO: figure out the order here
    let o = order;
    if (o === SortingOrder.None) {
      o = SortingOrder.Ascending;
      i = 0;
    }
    this.rows.sort((a, b) => {
      if (a[i] === b[i]) {
        return 0;
      }
      return a[i] < b[i] ? -1 : 1;
    });
    this.sortingHeader = i;
    this.sortingOrder = o;
  }

  // TODO ↑↓
}
