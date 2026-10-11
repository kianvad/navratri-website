// EDIT: first night start time (UK local time)
const EVENT_START = new Date("2026-10-11T19:30:00+01:00");
const CONTACT_EMAIL = "team@southlondonsuthars.com";

// ----- Countdown -----
const pad = (n) => String(n).padStart(2, "0");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const diff = EVENT_START - new Date();
  if (diff <= 0) {
    countdownEl.innerHTML = "<p><strong>The celebrations have begun. Jai Mata Di!</strong></p>";
    clearInterval(timer);
    return;
  }
  document.getElementById("cd-days").textContent = pad(Math.floor(diff / 86400000));
  document.getElementById("cd-hours").textContent = pad(Math.floor(diff / 3600000) % 24);
  document.getElementById("cd-mins").textContent = pad(Math.floor(diff / 60000) % 60);
  document.getElementById("cd-secs").textContent = pad(Math.floor(diff / 1000) % 60);
}
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// ----- Header background on scroll -----
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll);
onScroll();

// ----- Mobile menu -----
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  header.classList.add("scrolled");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
  })
);

// ----- Standard / Season ticket toggle -----
const toggleBtns = document.querySelectorAll(".toggle-btn");
const panels = document.querySelectorAll("[data-plan-panel]");
toggleBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    toggleBtns.forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn);
    });
    panels.forEach((p) => (p.hidden = p.dataset.planPanel !== btn.dataset.plan));
  })
);

// ----- Register / contact form -----
// No backend yet: opens the visitor's email app with the details filled in.
// Swap for a form service (e.g. Formspree, Netlify Forms) to collect submissions directly.
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = [
    `Name: ${f.get("name")}`,
    `Email: ${f.get("email")}`,
    `Phone: ${f.get("phone") || "-"}`,
    `Keep me updated: ${f.get("updates") ? "Yes" : "No"}`,
    "",
    f.get("message") || "",
  ].join("\n");
  const subject = f.get("message") ? "Website enquiry" : "Register my details";
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
