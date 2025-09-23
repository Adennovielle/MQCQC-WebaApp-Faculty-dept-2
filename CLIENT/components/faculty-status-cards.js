class StatusCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="faculty-status-card-box">
        <ul>
          <li>
            <i class="fa-solid fa-user"></i>
            <h6>TOTAL STUDENT</h6>
            <h2>27</h2>
          </li>
          <li>
            <i class="fa-solid fa-graduation-cap"></i>
            <h6>TOTAL CLASS</h6>
            <h2>3</h2>
          </li>
          <li>
            <i class="fa-solid fa-book"></i>
            <h6>TOTAL SUBJECT</h6>
            <h2>6</h2>
          </li>
          <li>
            <i class="fa-solid fa-bell"></i>
            <h6>TOTAL NOTICE BOARD</h6>
            <h2>2</h2>
          </li>
        </ul>
      </div>
        `;
  }
}
customElements.define("faculty-status-cards", StatusCard);
