class Main extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <main>
      <div class="faculty-user-and-notification">
        <div class="faculty-user">
          <h4><span></span>FACULTY</h4>
          <p><span class="pipeline">|</span>Teacher</p>
        </div>
        <div class="notification-bell">
          <i class="fa-solid fa-bell"></i>
        </div>
      </div>

      <!------------FACULTY USER INFO CARD------------>
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

      <!------------FACULTY STATUS CARDS------------>
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
    </main>
        `;
  }
}
customElements.define("faculty-main-content", Main);
