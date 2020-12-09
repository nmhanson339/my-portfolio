window.addEventListener("DOMContentLoaded", function () {
  // - - - - -HTML ELEMENTS - - - - -
  let header = document.querySelector(".page-header");
  let headerNav = document.querySelector(".header-nav");
  let headerNavBtn = document.querySelector(".header-nav-btn");
  let contactForm = document.getElementById("portfolio-contact");
  let contactFormBtn = document.getElementById("GET-submission");
  let contactFormStatus = document.getElementById("contact-form-status");

  // - - - - - EVENT LISTENERS - - - - -
  headerNavBtn.addEventListener(
    "click",
    toggleAccordionMenu.bind(headerNavBtn, headerNav, header)
  );

  headerNavBtn.addEventListener("click", toggleMenuIcon.bind(headerNavBtn));

  // Handle the form submission event
  contactForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(contactForm);
    ajax(contactForm.method, contactForm.action, data, success, error);
  });

  // - - - - - FUNCTIONS - - - - -
  function toggleMenuIcon() {
    this.classList.toggle("toggleMenuIcon");
  }

  function toggleAccordionMenu(menu, menuParent) {
    const menuItems = menu.children[0].children.length; // Represents list items in unordered list element
    const parentHeight = menuParent.clientHeight;

    if (menu.clientHeight >= parentHeight) {
      menu.style.transform = `translateY( ${parentHeight * menuItems}px)`;
      menuParent.style.height = `${parentHeight * (menuItems + 1)}px`;
      // Vertically transform menu's highest point downward until it no longer overflows its parent.
      menu.style.transition = `transform 1s ease-in-out`;
      // Expand height of menu's parent until menu is fully visible.
      menuParent.style.transition = `height 1s ease-in-out`;
    } else {
      menu.style.transform = `translateY(0px)`;
      menuParent.style.height = `${parentHeight / (menuItems + 1)}px`;
      // Vertically transform menu's lowest point upward until it overflows its parent.
      menu.style.transition = `transform 0.8s ease-in-out`;
      // Shrink height of menu's parent.
      menuParent.style.transition = `height 0.8s ease-in-out`;
    }
  }

  // - - - - - FORM FUNCTIONS - - - - -
  // Courtesy of FormSpree.com

  // Success and Error functions for after the form is submitted
  function success() {
    contactForm.reset();
    contactFormBtn.style = "display: none ";
    contactFormStatus.innerHTML = "Thanks!";
  }

  function error() {
    contactFormStatus.innerHTML = "Oops! There was a problem.";
  }

  // Helper function for sending an AJAX request
  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }
});
