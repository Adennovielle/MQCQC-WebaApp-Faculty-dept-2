class userNotification extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            
      <div class="faculty-user-and-notification">
        <div class="faculty-user">
          <h4><span></span>FACULTY</h4>
          <p><span class="pipeline">|</span>Teacher</p>
        </div>
        <div class="notification-bell">
          <i class="fa-solid fa-bell"></i>
        </div>
      </div>
    
        `;
  }
}
customElements.define("faculty-user-and-notification", userNotification);
