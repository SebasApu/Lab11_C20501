import styles from '../css/WarningBadge.css' with { type: 'css' };

class WarningBadge extends HTMLElement {

  static get observedAttributes() {
    return ['pulsing'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [styles];
  }

  connectedCallback() {
    this.render();
  }

  // El CSS reacciona automaticamente via :host([pulsing])
  // attributeChangedCallback permite logica JS adicional si se necesita
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'pulsing') {
      console.log(`[warning-badge] pulsing → ${newVal !== null}`);
    }
  }

  render() {
    this.shadowRoot.setHTMLUnsafe(/* html */`
      <div class="badge" part="badge">
        <slot></slot>
      </div>
    `);
  }
}

customElements.define('warning-badge', WarningBadge);
