class Sidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="faculty-sidebar">
        <i class="fa-solid fa-xmark"></i>
        <div class="sidebar-content">
          <div class="userinfo-box">
            <div class="user-img-box">
              <img src="/Client/assets/oreojpg.jpg" alt="" />
            </div>
            <h4>Lola Amor</h4>
            <i><a href="">fakeemail@email.com</a></i>
          </div>
          <hr class="horizontal-line" />
          <div class="dashboard-tabs">
            <h4>Faculty Department</h4>
            <ul>
              <li>
               <a href="/Client/faculty-index.html">
  <i class="fa-solid fa-grip"></i> Dashboard
</a>
              </li>
              <li>
                <a href="/Client/pages/faculty-student/faculty-student.html">
                  <i class="fa-solid fa-graduation-cap"></i>My Student
                </a>
              </li>
              <li>
                <a href="/Client/pages/faculty-class-and-subject/faculty-class-and-subject.html"><i class="fa-solid fa-users"></i>My Class & Subject</a>
              </li>
              <li>
                <a href="/Client/pages/faculty-exam-timetable/faculty-exam-timetable.html"><i class="fa-solid fa-table-list"></i>My Exam Timetable</a>
              </li>
              <li>
                <a href="/Client/pages/faculty-calendar/faculty-calendar.html"><i class="fa-solid fa-calendar"></i>My Calendar </a>
              </li>
              <li class="with-submenu">
                <a href="#">
                  <i class="fa-solid fa-clipboard-user"></i>Attendance
                  <i class="fa-solid fa-caret-right" style="font-size: 10px"></i>
                </a>
                <ul class="submenu">
                  <li class="nostyle-list">
                    <a href="/Client/pages/faculty-attendance/faculty-attendance.html" class="nostyle-link">Student Attendance</a>
                  </li>
                  <li class="nostyle-list">
                    <a href="/Client/pages/faculty-attendance-report/faculty-attendance-report.html" class="nostyle-link">Attendance Report</a>
                  </li>
                </ul>
              </li>
              <hr class="horizontal-line" />
              <li>
                <a href="#">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    `;

    const toggleSubmenu = this.querySelector(".with-submenu");

    if (toggleSubmenu) {
      toggleSubmenu.addEventListener("click", (e) => {
        toggleSubmenu.classList.toggle("toggle-submenu");
      });
    }
  }
}

customElements.define("faculty-sidebar", Sidebar);
