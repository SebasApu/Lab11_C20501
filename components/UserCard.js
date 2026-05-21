const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="./css/UserCard.css" />

  <div class="card" part="card">
    <div class="avatar" part="avatar"></div>
    <div class="nombre" part="nombre"></div>
    <div class="rol"    part="rol"></div>
    <button part="btn-saludo">Saludar</button>
  </div>
`;

class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ['avatar', 'nombre', 'rol'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot
      .querySelector('button')
      .addEventListener('click', () => this._onSaludar());
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this._render();
  }

  _render() {
    this.shadowRoot.querySelector('.avatar').textContent =
      this.getAttribute('avatar') || '👤';
    this.shadowRoot.querySelector('.nombre').textContent =
      this.getAttribute('nombre') || '';
    this.shadowRoot.querySelector('.rol').textContent =
      this.getAttribute('rol') || '';
  }

  _onSaludar() {
    // bubbles: sube por el DOM, composed: cruza el shadow boundary
    this.dispatchEvent(new CustomEvent('saludo', {
      bubbles: true,
      composed: true,
      detail: { nombre: this.getAttribute('nombre') }
    }));
  }
}

customElements.define('user-card', UserCard);
