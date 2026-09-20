const target = new Date("2026-10-27T00:00:00+01:00").getTime();
function tick() {
  let d = Math.max(0, target - Date.now());
  const day = 86400000,
    hour = 3600000,
    min = 60000;
  document.getElementById("days").textContent = String(
    Math.floor(d / day),
  ).padStart(2, "0");
  d %= day;
  document.getElementById("hours").textContent = String(
    Math.floor(d / hour),
  ).padStart(2, "0");
  d %= hour;
  document.getElementById("minutes").textContent = String(
    Math.floor(d / min),
  ).padStart(2, "0");
  d %= min;
  document.getElementById("seconds").textContent = String(
    Math.floor(d / 1000),
  ).padStart(2, "0");
}
tick();
setInterval(tick, 1000);
const menu = document.querySelector(".menu"),
  nav = document.querySelector(".nav nav");
menu.onclick = () => nav.classList.toggle("open");
document
  .querySelectorAll("nav a")
  .forEach((a) => (a.onclick = () => nav.classList.remove("open")));
function store(key, obj) {
  let a = JSON.parse(localStorage.getItem(key) || "[]");
  a.unshift(obj);
  localStorage.setItem(key, JSON.stringify(a));
  return a;
}
function render() {
  const wishes = JSON.parse(localStorage.getItem("wishes") || "[]"),
    stories = JSON.parse(localStorage.getItem("stories") || "[]");
  document.getElementById("wishList").innerHTML = wishes
    .map(
      (x) =>
        `<article class="wish"><strong>${esc(x.name)}</strong><small>${esc(x.relationship)}</small><p>${esc(x.message)}</p></article>`,
    )
    .join("");
  document.getElementById("storyList").innerHTML = stories
    .map(
      (x) =>
        `<article class="testimonial"><strong>${esc(x.name)}</strong><small>${esc(x.relationship)}</small><p><b>How we met:</b> ${esc(x.meeting)}</p><p><b>Impact:</b> ${esc(x.impact)}</p>${x.admire ? `<p><b>What I admire:</b> ${esc(x.admire)}</p>` : ""}</article>`,
    )
    .join("");
}
function esc(s = "") {
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}
document.getElementById("wishForm").onsubmit = (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  store("wishes", {
    name: f.get("name"),
    relationship: f.get("relationship"),
    message: f.get("message"),
  });
  e.target.reset();
  render();
  alert("Thank you. Your birthday wish has been saved.");
};
document.getElementById("storyForm").onsubmit = (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  store("stories", {
    name: f.get("name"),
    relationship: f.get("relationship"),
    meeting: f.get("meeting"),
    impact: f.get("impact"),
    admire: f.get("admire"),
  });
  e.target.reset();
  render();
  alert("Thank you. Your story has been saved.");
};
render();
