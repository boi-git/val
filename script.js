/* =====================
   CONFIG — EDIT HERE
===================== */

// 🎵 Background music (replace easily)
const MUSIC_SRC =
  "High School Musical - Start Of Something New (Karaoke Version).mp3";

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
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".floating-nav button");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    // Remove active from everything
    pages.forEach((page) => page.classList.remove("active"));
    navButtons.forEach((btn) => btn.classList.remove("active"));

    // Activate selected
    document.getElementById(target).classList.add("active");
    button.classList.add("active");
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
  const parentRect = noBtn.parentElement.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = parentRect.width - btnRect.width;
  const maxY = parentRect.height - btnRect.height;

  // Random position
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Random rotation (-30deg to 30deg)
  const randomRotate = (Math.random() - 0.5) * 60;

  // Random scale (0.8 to 1.2)
  const randomScale = 0.8 + Math.random() * 0.4;

  // Apply position
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;

  // Apply chaos transform
  noBtn.style.transform = `
    rotate(${randomRotate}deg)
    scale(${randomScale})
  `;

  // Add quick bounce effect
  noBtn.style.transition = "all 0.15s ease-out";

  // 20% chance to jump near edge for extra chaos
  if (Math.random() < 0.2) {
    noBtn.style.left = Math.random() < 0.5 ? "0px" : `${maxX}px`;
    noBtn.style.top = Math.random() < 0.5 ? "0px" : `${maxY}px`;
  }
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
