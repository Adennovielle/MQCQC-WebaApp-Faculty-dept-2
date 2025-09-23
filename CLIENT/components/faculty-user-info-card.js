class InfoCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="faculty-userinfo-card">
        <div class="card">
          <div class="left-box">
            <div class="img-and-button">
              <img src="/Client/assets/default-user.png" alt="" />
              <button>View ID</button>
            </div>
            <div class="username-and-role">
              <h3>Lola A. Amor</h3>
              <h4>Teacher</h4>
            </div>
          </div>
          <div class="right-box">
            <ul>
              <li>
                <i class="fa-solid fa-user right-box-icon"></i>
                <p>School Gsuite Account</p>
              </li>
              <li>
                <i class="fa-solid fa-envelope right-box-icon"></i>
                <p>fakeemail@email.com</p>
              </li>
              <li>
                <i class="fa-solid fa-phone right-box-icon"></i>
                <p>123456789</p>
              </li>
              <li>
                <i class="fa-solid fa-location-dot right-box-icon"></i>
                <p>123 Fake Street Philcoa Quezon City</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
        `;
  }
}
customElements.define("faculty-user-info-card", InfoCard);
