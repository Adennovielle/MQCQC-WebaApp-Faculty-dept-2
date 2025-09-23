import "./faculty-user-and-notification.js";
import "./faculty-user-info-card.js";
import "./faculty-status-cards.js";
class Main extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <main>
      <faculty-user-and-notification></faculty-user-and-notification>
      <faculty-user-info-card></faculty-user-info-card>
      <faculty-status-cards></faculty-status-cards>
       </main> `;
  }
}
customElements.define("faculty-main-content", Main);
