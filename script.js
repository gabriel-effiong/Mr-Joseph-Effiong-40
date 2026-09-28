const eventTime = new Date("2026-10-27T00:00:00+01:00").getTime();
function tick() {
  let remainingSeconds = Math.max(
    0,
    Math.floor((eventTime - Date.now()) / 1000),
  );
  const day = 86400,
    hour = 3600,
    minute = 60;
  document.getElementById("days").textContent = String(
    Math.floor(remainingSeconds / day),
  ).padStart(2, "0");
  remainingSeconds %= day;
  document.getElementById("hours").textContent = String(
    Math.floor(remainingSeconds / hour),
  ).padStart(2, "0");
  remainingSeconds %= hour;
  document.getElementById("minutes").textContent = String(
    Math.floor(remainingSeconds / minute),
  ).padStart(2, "0");
  remainingSeconds %= minute;
  document.getElementById("seconds").textContent = String(
    remainingSeconds,
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
const memoryPhotos = [
  "JUBILEE IMAGE_1.JPG.jpeg",
  "JUBILEE IMAGE_2.JPG (1).jpeg",
  "JUBILEE IMAGE_2.JPG.jpeg",
  "JUBILEE IMAGE_3.JPG.jpeg",
  "JUBILEE IMAGE_4.JPG.jpeg",
  "JUBILEE IMAGE_6.JPG.jpeg",
  "JUBILEE IMAGE_7.JPG.jpeg",
  "JUBILEE IMAGE_11.JPG.jpeg",
  "JUBILEE IMAGE_12.JPG.jpeg",
  "JUBILEE IMAGE_13.JPG.jpeg",
  "JUBILEE IMAGE_18.JPG.jpeg",
  "JUBILEE IMAGE_19.JPG (1).jpeg",
  "JUBILEE IMAGE_19.JPG.jpeg",
  "JUBILEE IMAGE_20.JPG.jpeg",
  "JUBILEE IMAGE_31.JPG.jpeg",
  "JUBILEE IMAGE_37.JPG.jpeg",
  "JUBILEE IMAGE_46.JPG.jpeg",
  "JUBILEE IMAGE_50.JPG.jpeg",
  "JUBILEE IMAGE_63.JPG.jpeg",
  "JUBILEE IMAGE_65.JPG.jpeg",
  "JUBILEE IMAGE_66.JPG.jpeg",
  "JUBILEE IMAGE_67.JPG.jpeg",
  "JUBILEE IMAGE_72.JPG.jpeg",
  "JUBILEE IMAGE_87.JPG.jpeg",
  "JUBILEE IMAGE_97.JPG.jpeg",
  "JUBILEE IMAGE_98.JPG.jpeg",
  "JUBILEE IMAGE_104.JPG.jpeg",
  "JUBILEE IMAGE_105.JPG.jpeg",
  "JUBILEE IMAGE_106.JPG.jpeg",
  "JUBILEE IMAGE_107.JPG.jpeg",
  "JUBILEE IMAGE_109.JPG.jpeg",
  "JUBILEE IMAGE_110.JPG.jpeg",
  "JUBILEE IMAGE_111.JPG.jpeg",
  "JUBILEE IMAGE_115.JPG.jpeg",
  "JUBILEE IMAGE_119.JPG.jpeg",
  "JUBILEE IMAGE_125.JPG.jpeg",
  "JUBILEE IMAGE_128.JPG.jpeg",
  "JUBILEE IMAGE_129.JPG.jpeg",
  "JUBILEE IMAGE_147.JPG.jpeg",
  "JUBILEE IMAGE_155.JPG.jpeg",
  "JUBILEE IMAGE_156.JPG.jpeg",
  "JUBILEE IMAGE_157.JPG.jpeg",
  "JUBILEE IMAGE_158.JPG.jpeg",
  "JUBILEE IMAGE_160.JPG.jpeg",
  "JUBILEE IMAGE_161.JPG.jpeg",
  "JUBILEE IMAGE_162.JPG.jpeg",
  "JUBILEE IMAGE_163.JPG.jpeg",
  "JUBILEE IMAGE_165.JPG.jpeg",
  "JUBILEE IMAGE_166.JPG.jpeg",
  "JUBILEE IMAGE_168.JPG.jpeg",
  "JUBILEE IMAGE_169.JPG.jpeg",
  "JUBILEE IMAGE_175.JPG.jpeg",
];
const memoryGallery = document.getElementById("memoryGallery");
memoryPhotos.forEach((filename, index) => {
  const photo = document.createElement("figure");
  photo.className = "photo";
  const image = document.createElement("img");
  image.src = encodeURI(`images/${filename}`);
  image.alt = `Memory ${String(index + 1).padStart(2, "0")} from the Jubilee celebration`;
  image.loading = index < 3 ? "eager" : "lazy";
  const caption = document.createElement("figcaption");
  caption.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><b>Jubilee Memory</b>`;
  photo.append(image, caption);
  memoryGallery.append(photo);
});
const memoryCarousel = document.querySelector(".memory-carousel");
const autoplayToggle = document.getElementById("memoryAutoplay");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let autoplayEnabled = !reducedMotion;
let carouselInteracting = false;
function updateAutoplayToggle() {
  if (!autoplayToggle) return;
  autoplayToggle.textContent = autoplayEnabled
    ? "Pause slideshow"
    : "Play slideshow";
  autoplayToggle.setAttribute("aria-pressed", String(!autoplayEnabled));
}
document.querySelectorAll(".carousel-control").forEach((button) => {
  button.addEventListener("click", () => {
    const photo = memoryGallery.querySelector(".photo");
    if (!photo) return;
    const distance = photo.getBoundingClientRect().width + 14;
    memoryGallery.scrollBy({
      left: button.dataset.direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  });
});
if (memoryCarousel) {
  memoryCarousel.addEventListener("mouseenter", () => {
    carouselInteracting = true;
  });
  memoryCarousel.addEventListener("mouseleave", () => {
    carouselInteracting = false;
  });
  memoryCarousel.addEventListener("focusin", () => {
    carouselInteracting = true;
  });
  memoryCarousel.addEventListener("focusout", (event) => {
    if (!memoryCarousel.contains(event.relatedTarget)) {
      carouselInteracting = false;
    }
  });
  autoplayToggle?.addEventListener("click", () => {
    autoplayEnabled = !autoplayEnabled;
    updateAutoplayToggle();
  });
  updateAutoplayToggle();
  setInterval(() => {
    if (!autoplayEnabled || carouselInteracting) return;
    const photo = memoryGallery.querySelector(".photo");
    if (!photo) return;
    const distance = photo.getBoundingClientRect().width + 14;
    const atEnd =
      memoryGallery.scrollLeft + memoryGallery.clientWidth >=
      memoryGallery.scrollWidth - 2;
    if (atEnd) {
      memoryGallery.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      memoryGallery.scrollBy({ left: distance, behavior: "smooth" });
    }
  }, 3000);
}
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
