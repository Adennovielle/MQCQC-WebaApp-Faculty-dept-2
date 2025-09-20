const toggleMenu = document.querySelector(".fa-bars");
const facultySidebar = document.querySelector(".faculty-sidebar");
const toggleSubmenu = document.querySelector(".with-submenu");
const submenu = document.querySelector(".submenu");
const main = document.querySelector("main");

// Toggle sidebar + expand main
toggleMenu.addEventListener("click", () => {
  facultySidebar.classList.toggle("open");

  if (facultySidebar.classList.contains("open")) {
    main.classList.add("expanded");
  } else {
    main.classList.remove("expanded");
  }
});

// Toggle submenu
toggleSubmenu.addEventListener("click", (e) => {
  e.preventDefault(); // stop <a href="#"> from jumping
  toggleSubmenu.classList.toggle("toggle-submenu");
});
