import styles from '../css/WeatherTime.css' with { type: 'css' };

class WeatherTime extends HTMLElement {

  static get observedAttributes() {
    return ['ciudad', 'temperatura', 'condicion'];
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
      <div class="weather" part="weather">
        <div class="ciudad"    part="ciudad">${this.getAttribute('ciudad') ?? ''}</div>
        <div class="temp"      part="temp">${this.getAttribute('temperatura') ?? '--'}°C</div>
        <div class="condicion" part="condicion">${this.getAttribute('condicion') ?? ''}</div>
      </div>
    `);
  }
}

customElements.define('weather-time', WeatherTime);
