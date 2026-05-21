const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="./css/UserDashboard.css" />

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
`;

class UserDashboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // Referencia guardada para poder removerla en disconnectedCallback
    this._handleSaludo = (e) => this._onSaludo(e);
  }

  connectedCallback() {
    this.addEventListener('saludo', this._handleSaludo);
  }

  disconnectedCallback() {
    this.removeEventListener('saludo', this._handleSaludo);
  }

  _onSaludo(e) {
    console.log(`[user-dashboard] saludo recibido de: ${e.detail.nombre}`);

    const badge = this.querySelector('warning-badge');
    if (!badge) return;

    // Alterna el atributo pulsing — warning-badge reacciona en attributeChangedCallback
    if (badge.hasAttribute('pulsing')) {
      badge.removeAttribute('pulsing');
    } else {
      badge.setAttribute('pulsing', '');
    }
  }
}

customElements.define('user-dashboard', UserDashboard);
