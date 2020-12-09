// HTML ELEMENTS
let header = document.querySelector(".page-header");
let headerNav = document.querySelector(".header-nav");
let headerNavBtn = document.querySelector(".header-nav-btn");
let contactForm = document.getElementById("portfolio-contact");
let contactFormBtn = document.getElementById("GET-submission");
let contactFormStatus = document.getElementById("contact-form-status");

// EVENT LISTENERS
headerNavBtn.addEventListener(
  "click",
  toggleAccordionMenu.bind(headerNavBtn, headerNav, header)
);

headerNavBtn.addEventListener("click", toggleMenuIcon.bind(headerNavBtn));

// handle the form submission event
contactForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  var data = new FormData(contactForm);
  ajax(contactForm.method, contactForm.action, data, success, error);
});

// FUNCTIONS
function toggleMenuIcon() {
  this.classList.toggle("toggleMenuIcon");
}

function toggleAccordionMenu(menu, menuParent) {
  const menuItems = menu.children[0].children.length; // Represents list items in unordered list element
  const parentHeight = menuParent.clientHeight;
  console.log("menuItems, parentHeight:", menuItems, parentHeight);

  if (menu.clientHeight >= parentHeight) {
    // Vertically transform menu from hidden overflow position. Expand height of menu's parent.
    menu.style.transform = `translateY( ${parentHeight * menuItems}px)`;
    menuParent.style.height = `${parentHeight * (menuItems + 1)}px`;
    menu.style.transition = `transform 1s ease-in-out`;
    menuParent.style.transition = `height 1s ease-in-out`;
    menu.classList.add("menuOpened");
  } else {
    // Vertically transform menu to hidden overflow position. Shrink height of menu's parent.
    menu.style.transform = `translateY(0px)`;
    menuParent.style.height = `${parentHeight / (menuItems + 1)}px`;
    menu.style.transition = `transform 0.8s ease-in-out`;
    menuParent.style.transition = `height 0.8s ease-in-out`;
  }
}

// - - - - - FORM FUNCTIONS - - - - -
// Courtesy of FormSpree.com

// Success and Error functions for after the form is submitted
function success() {
  contactForm.reset();
  contactFormBtn.style = "display: none "; //!!!!!!!!Change to visibility: hidden
  contactFormStatus.innerHTML = "Thanks!";
}

function error() {
  contactFormStatus.innerHTML = "Oops! There was a problem.";
}

// helper function for sending an AJAX request

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
