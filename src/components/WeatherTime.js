const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="./css/WeatherTime.css" />

  <div class="weather" part="weather">
    <div class="ciudad"    part="ciudad"></div>
    <div class="temp"      part="temp"></div>
    <div class="condicion" part="condicion"></div>
  </div>
`;

class WeatherTime extends HTMLElement {
  static get observedAttributes() {
    return ['ciudad', 'temperatura', 'condicion'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this._render();
  }

  _render() {
    this.shadowRoot.querySelector('.ciudad').textContent =
      this.getAttribute('ciudad') || '';
    this.shadowRoot.querySelector('.temp').textContent =
      `${this.getAttribute('temperatura') || '--'}°C`;
    this.shadowRoot.querySelector('.condicion').textContent =
      this.getAttribute('condicion') || '';
  }
}

customElements.define('weather-time', WeatherTime);
