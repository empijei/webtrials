import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mpj-nav')
export class MpjNav extends LitElement {
  static styles = css`
    html,
    body {
      font-family: sans-serif;
      margin: 0;
      height: 100%;
    }

    .content {
      margin-block-start: 0;
      text-indent: 1rem;
      margin: 0.5rem;
    }

    #root {
      display: flex;
      height: 100%;
    }

    #main-page {
      flex-grow: 1;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      padding: 1rem;

      border-right: 1px solid lightgray;
    }

    .sidebar > a {
      margin: 0.5rem 0;
    }
  `;

  routes = new Map([
    ['/', { name: 'Home', cmp: () => html`home` }],
    [
      '/table',
      {
        name: 'Table with sorting headers',
        cmp: () => html`<mpj-table></mpj-table>`,
      },
    ],
  ]);

  @property()
  renderPath = '/';

  constructor() {
    super();
    this.renderPath = window.location.pathname || '/';
  }

  render() {
    return html`
      <div id="root">
        <nav
          id="main-nav"
          class="sidebar"
          @click=${this.route}
          @keyup=${this.onKeyup}
          @load=${this.navigate}
        >
          ${Array.from(this.routes).map(
            ([key, value]) => html`<a href="${key}">${value.name}</a>`,
          )}
        </nav>
        <div class="content">${this.renderElement()}</div>
      </div>
    `;
  }

  renderElement() {
    const r = this.routes.get(this.renderPath);
    if (r === undefined) {
      return html`Not found!`;
    }
    return r.cmp();
  }

  route(e: Event) {
    const p = (e.target as Element).getAttribute('href');
    e.preventDefault();
    window.history.pushState({}, '', p);
    this.renderPath = p || '/';
  }

  onKeyup() {
    console.log(this);
  }

  navigate() {
    this.renderPath = window.location.pathname || '/';
  }
}

// TODO: https://github.com/mitchwadair/vanilla-spa-router/blob/main/index.html
