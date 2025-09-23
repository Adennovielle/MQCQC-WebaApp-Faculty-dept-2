import "./faculty-main-content.js";

class MainBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <main>
     
       </main> 
        `;
  }
}
customElements.define("faculty-main-box", MainBox);
