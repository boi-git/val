/* =====================
   CONFIG — EDIT HERE
===================== */

// 🎵 Background music (replace easily)
const MUSIC_SRC =
  "https://assets.mixkit.co/music/preview/mixkit-romantic-soft-piano-716.mp3";

// 🏠 Home feed (newest on top by date)
const HOME_POSTS = [
  {
    image: "", // add image path later
    caption: "Our first memory",
    desc: "Placeholder description",
    date: "2026-03-01",
  },
];

// 📅 Calendar events (GMT+8)
const EVENTS = [
  { title: "Staycation", date: "2026-03-12T00:00:00+08:00" },
  { title: "Anniversary", date: "2026-03-14T00:00:00+08:00" },
  { title: "Saturday date", date: "2026-04-04T00:00:00+08:00" },
  { title: "Redline", date: "2026-06-26T00:00:00+08:00" },
];

EVENTS.sort((a, b) => {
  return (
    new Date(a.date + "T00:00:00+08:00") - new Date(b.date + "T00:00:00+08:00")
  );
});

// Floating background symbols
const FLOATING_ITEMS = ["❤️", "🍫", "🌹"];

/* =====================
   MUSIC
===================== */
const music = document.getElementById("bgMusic");
music.src = MUSIC_SRC;
music.loop = true;

document.addEventListener(
  "click",
  () => {
    if (music.paused) music.play().catch(() => {});
  },
  { once: true },
);

music.play().catch(() => {});

/* =====================
   BACKGROUND FLOATING
===================== */
const layer = document.getElementById("floating-layer");

function createFloating() {
  const el = document.createElement("span");
  el.textContent =
    FLOATING_ITEMS[Math.floor(Math.random() * FLOATING_ITEMS.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 20 + 16 + "px";
  el.style.animationDuration = Math.random() * 3 + 4 + "s";
  layer.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}

setInterval(createFloating, 350);

/* =====================
   NAVIGATION
===================== */
const tabs = document.querySelectorAll(".floating-nav button");
const pages = document.querySelectorAll(".page");

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.remove("active"));
    pages.forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

/* =====================
   LOVE BUTTON LOGIC
===================== */
const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const hoverSound = document.getElementById("hoverSound");
const yesSound = document.getElementById("yesSound");

function moveNoButton() {
  const parent = noBtn.parentElement.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  noBtn.style.left = Math.random() * (parent.width - btn.width) + "px";
  noBtn.style.top = Math.random() * (parent.height - btn.height) + "px";
}

noBtn.addEventListener("mouseenter", () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
  moveNoButton();
});

noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  yesSound.play();
  confetti({ particleCount: 260, spread: 120, origin: { y: 0.65 } });
});

/* =====================
   HOME FEED
===================== */
const feed = document.querySelector(".feed");

EVENTS.slice()
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .forEach((event) => {
    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
      <div class="placeholder">
        Every picture has a story
      </div>
      <div class="content">
        <strong>${event.title}</strong>
        <p>${new Date(event.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Kuala_Lumpur",
        })}</p>
      </div>
    `;

    feed.appendChild(post);
  });

const calendar = document.querySelector(".calendar-list");

function pad(n) {
  return n.toString().padStart(2, "0");
}

function createSegments(label, value) {
  return `
    <div>
      <div class="flip">
        ${pad(value)
          .split("")
          .map((d) => `<div class="segment">${d}</div>`)
          .join("")}
      </div>
      <small>${label}</small>
    </div>
  `;
}

function updateCountdown() {
  calendar.innerHTML = "";
  const now = new Date();

  EVENTS.forEach((e) => {
    const target = new Date(e.date);
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;
    const mins = Math.floor(diff / 60000);
    diff %= 60000;
    const secs = Math.floor(diff / 1000);

    const div = document.createElement("div");
    div.className = "event";

    div.innerHTML = `
      <strong>${e.title}</strong>
      <p>${target.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kuala_Lumpur",
      })}</p>

      <div style="display:flex; gap:14px; flex-wrap:wrap;">
        ${createSegments("Days", days)}
        ${createSegments("Hours", hours)}
        ${createSegments("Min", mins)}
        ${createSegments("Sec", secs)}
      </div>
    `;

    calendar.appendChild(div);
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
