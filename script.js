const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const yearNode = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

window.addEventListener("DOMContentLoaded", () => {
  body.classList.add("loaded");

  const pageName = body.dataset.page || "";
  navAnchors.forEach((link) => {
    const navId = link.dataset.nav;
    link.classList.toggle("active", navId === pageName);
  });
});

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("show");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.querySelectorAll("a[href]").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || anchor.target === "_blank") {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) {
      return;
    }

    if (!url.pathname.endsWith(".html") && !url.pathname.endsWith("/")) {
      return;
    }

    event.preventDefault();
    body.classList.add("fade-out");
    window.setTimeout(() => {
      window.location.href = url.href;
    }, 180);
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete the required fields.";
      formStatus.style.color = "#ff7d7d";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = "Please enter a valid work email address.";
      formStatus.style.color = "#ff7d7d";
      return;
    }

    formStatus.textContent = "Thanks! Our team will contact you within 24 hours.";
    formStatus.style.color = "#33d6a3";
    contactForm.reset();
  });
}
