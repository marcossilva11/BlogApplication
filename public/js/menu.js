function showMenu() {
  let menuMobile = document.querySelector(".mobile-menu");
  const icon = document.getElementById('icon-menu');

  if (menuMobile.classList.contains('open')){
    menuMobile.classList.remove('open');
    icon.classList.remove("bi-x");
    icon.classList.add("bi-list");
  } else {
    menuMobile.classList.add('open');
    icon.classList.remove("bi-list");
    icon.classList.add("bi-x");
  }
}
