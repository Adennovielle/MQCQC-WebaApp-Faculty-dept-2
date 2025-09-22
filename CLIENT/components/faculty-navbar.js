class Navbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="faculty-navbar">
        <div class="navbar-box">
          <div class="navbar-content">
            <div class="navbar-logo-box">
              <img src="/Client/assets/mqc-logo.png" alt="logo" />
              <h3>MARY THE QUEEN COLLEGE OF QUEZON CITY</h3>
            </div>
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </section>
    `;

    const toggleMenu = this.querySelector(".fa-bars");

    // Wait until sidebar is upgraded
    customElements.whenDefined("faculty-sidebar").then(() => {
      const facultySidebar = document.querySelector(".faculty-sidebar");
      const main = document.querySelector("main");

      if (!facultySidebar || !main) {
        console.warn("Sidebar or main still missing in DOM");
        return;
      }

      toggleMenu.addEventListener("click", () => {
        facultySidebar.classList.toggle("open");
        main.classList.toggle(
          "expanded",
          facultySidebar.classList.contains("open")
        );
      });
    });
  }
}

customElements.define("faculty-navbar", Navbar);
