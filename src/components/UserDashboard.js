import styles from '../css/UserDashboard.css' with { type: 'css' };

class UserDashboard extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styles];
    this.#handleSaludo = (e) => this.#onSaludo(e);
  }

  #handleSaludo;

  connectedCallback() {
    this.render();
    this.addEventListener('saludo', this.#handleSaludo);
  }

  disconnectedCallback() {
    this.removeEventListener('saludo', this.#handleSaludo);
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="dashboard" part="dashboard">
        <div class="slot-card">
          <slot name="card"></slot>
        </div>
        <div class="slot-weather">
          <slot name="weather"></slot>
        </div>
        <div class="slot-warning">
          <slot name="warning"></slot>
        </div>
      </div>
    `);
  }

  #onSaludo(e) {
    console.log(`[user-dashboard] saludo recibido de: ${e.detail.nombre}`);

    const badge = this.querySelector('warning-badge');
    if (!badge) return;

    // Envia el cambio a warning-badge alternando su atributo reactivo
    if (badge.hasAttribute('pulsing')) {
      badge.removeAttribute('pulsing');
    } else {
      badge.setAttribute('pulsing', '');
    }
  }
}

customElements.define('user-dashboard', UserDashboard);
