const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="./css/WarningBadge.css" />

  <div class="badge" part="badge">
    <slot></slot>
  </div>
`;

class WarningBadge extends HTMLElement {
  static get observedAttributes() {
    return ['pulsing'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // El CSS reacciona solo via :host([pulsing]), pero aqui se puede
  // agregar logica JS adicional si fuera necesario
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'pulsing') {
      console.log(`[warning-badge] pulsing: ${newVal !== null}`);
    }
  }
}

customElements.define('warning-badge', WarningBadge);
