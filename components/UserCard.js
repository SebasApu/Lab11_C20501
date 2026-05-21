import styles from '../css/UserCard.css' with { type: 'css' };

class UserCard extends HTMLElement {

  static get observedAttributes() {
    return ['avatar', 'nombre', 'rol'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="card" part="card">
        <div class="avatar" part="avatar">${this.getAttribute('avatar') ?? '👤'}</div>
        <div class="nombre" part="nombre">${this.getAttribute('nombre') ?? ''}</div>
        <div class="rol"    part="rol">${this.getAttribute('rol') ?? ''}</div>
        <button part="btn-saludo">Saludar</button>
      </div>
    `);

    this.shadowRoot
      .querySelector('button')
      .addEventListener('click', () => this.#onSaludar());
  }

  #onSaludar() {
    // bubbles: sube por el DOM  |  composed: cruza el shadow boundary
    this.dispatchEvent(new CustomEvent('saludo', {
      bubbles: true,
      composed: true,
      detail: { nombre: this.getAttribute('nombre') }
    }));
  }
}

customElements.define('user-card', UserCard);
