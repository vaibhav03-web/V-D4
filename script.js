/* ================================================
   ⚠️ EDIT THIS SECTION to personalize everything
   ================================================ */
const CONFIG = {
  // The sweet things shown on the flip cards.
  // Front = emoji, Back = the message. Edit freely, add/remove entries.
  compliments: [
    { emoji: "😂", text: "You laugh at things nobody else finds funny, and somehow that's my favorite sound." },
    { emoji: "💗", text: "You made me feel something I've genuinely never felt before with anyone else." },
    { emoji: "🌙", text: "You make ordinary days feel like they matter." },
    { emoji: "☕", text: "Even your bad days have this way of making me want to be around you more, not less." },
    { emoji: "✨", text: "You have no idea how much better you make things just by being in them." },
    { emoji: "📖", text: "I could listen to you talk about literally anything." },
  ],

  // Loading messages while the "loading" scene plays
  loadingMessages: [
    "okay wait give me a sec...",
    "my hands are actually shaking rn",
    "let me just... breathe",
    "okay okay here goes",
    "here it comes 🌷"
  ],

  // Things the No button says when clicked (cycles through, never repeats twice in a row)
  noResponses: [
    "noo please 🥺",
    "wait no come back",
    "you sure...?",
    "one more chance?",
    "pretty please",
    "i'll be so sad",
    "reconsider? 👉👈"
  ],
};
/* ================================================ */

const scenes = {
  welcome: document.getElementById("scene-welcome"),
  question: document.getElementById("scene-question"),
  response: document.getElementById("scene-response"),
  cards: document.getElementById("scene-cards"),
  setup: document.getElementById("scene-setup"),
  loading: document.getElementById("scene-loading"),
  ask: document.getElementById("scene-ask"),
  yes: document.getElementById("scene-yes"),
};

function showScene(name) {
  Object.values(scenes).forEach((s) => s.classList.remove("active"));
  scenes[name].classList.add("active");
}

/* ---------- floating ambient petals ---------- */
function spawnPetals() {
  const container = document.getElementById("petals");
  const symbols = ["🌸", "🌷", "💮", "🌺"];
  const count = window.innerWidth < 500 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = 0.9 + Math.random() * 1.1 + "rem";
    petal.style.animationDuration = 10 + Math.random() * 14 + "s";
    petal.style.animationDelay = Math.random() * -20 + "s";
    petal.style.opacity = 0.3 + Math.random() * 0.4;
    container.appendChild(petal);
  }
}
spawnPetals();

/* ---------- Scene 1 -> 2 ---------- */
document.getElementById("btn-start").addEventListener("click", () => {
  showScene("question");
});

/* ---------- Scene 2 -> 3 (mood responses) ---------- */
const moodContent = {
  good: {
    eyebrow: "yay, love that",
    title: "glad it's a good one",
    sub: "hope this makes it a little better still 🌷",
  },
  okay: {
    eyebrow: "hey, that's okay",
    title: "not every day has to be perfect",
    sub: "hopefully this bit turns it around a little",
  },
  tired: {
    eyebrow: "aw, rest soon okay?",
    title: "you've been doing a lot",
    sub: "take a second, this'll only take a minute",
  },
};

document.querySelectorAll(".choice-card").forEach((card) => {
  card.addEventListener("click", () => {
    const mood = card.dataset.mood;
    const content = moodContent[mood];
    document.getElementById("response-eyebrow").textContent = content.eyebrow;
    document.getElementById("response-title").textContent = content.title;
    document.getElementById("response-sub").textContent = content.sub;
    showScene("response");
  });
});

/* ---------- Scene 3 -> 4 (build + show flip cards) ---------- */
document.getElementById("btn-to-cards").addEventListener("click", () => {
  showScene("cards");
});

const cardGrid = document.getElementById("card-grid");
let flippedCount = 0;

CONFIG.compliments.forEach((item, i) => {
  const card = document.createElement("div");
  card.className = "flip-card";
  card.innerHTML = `
    <div class="flip-inner">
      <div class="flip-front">${item.emoji}</div>
      <div class="flip-back">${item.text}</div>
    </div>
  `;
  card.addEventListener("click", () => {
    if (!card.classList.contains("flipped")) {
      flippedCount++;
      if (flippedCount === CONFIG.compliments.length) {
        const btn = document.getElementById("btn-to-ask");
        btn.classList.add("show");
      }
    }
    card.classList.toggle("flipped");
  });
  cardGrid.appendChild(card);
});

/* ---------- Scene 4 -> 5 ---------- */
document.getElementById("btn-to-ask").addEventListener("click", () => {
  showScene("setup");
});

/* ---------- Scene 5 -> 6 -> 7 (loading sequence) ---------- */
document.getElementById("btn-ask-it").addEventListener("click", () => {
  showScene("loading");
  const textEl = document.getElementById("loading-text");
  const messages = CONFIG.loadingMessages;
  let i = 0;
  textEl.textContent = messages[0];

  const interval = setInterval(() => {
    i++;
    if (i < messages.length) {
      textEl.textContent = messages[i];
    }
  }, 750);

  setTimeout(() => {
    clearInterval(interval);
    showScene("ask");
  }, messages.length * 750 + 300);
});

/* ---------- Scene 7: the No button runs away ---------- */
const btnNo = document.getElementById("btn-no");
const btnYes = document.getElementById("btn-yes");
const askButtons = document.querySelector(".ask-buttons");
const askSub = document.getElementById("ask-sub");
let noClicks = 0;
let lastNoMessage = "";

function pickNoMessage() {
  const options = CONFIG.noResponses.filter((m) => m !== lastNoMessage);
  const choice = options[Math.floor(Math.random() * options.length)];
  lastNoMessage = choice;
  return choice;
}

function dodgeNo() {
  noClicks++;

  // update the sub text with a new plea each time
  askSub.textContent = pickNoMessage();

  // grow the Yes button a little each time, for fun
  const growth = Math.min(1 + noClicks * 0.06, 1.6);
  btnYes.style.transform = `scale(${growth})`;

  // move the No button to a random safe spot within the container
  const containerRect = askButtons.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width - 8;
  const maxY = 90; // keep it within a reasonable vertical range

  const randX = Math.random() * maxX - maxX / 2;
  const randY = Math.random() * maxY - maxY / 2;

  btnNo.style.position = "absolute";
  btnNo.style.left = `calc(50% + ${randX}px)`;
  btnNo.style.top = `calc(50% + ${randY}px)`;
  btnNo.style.transform = "translate(-50%, -50%)";
}

// desktop: dodge on hover. mobile: dodge on touchstart (since hover doesn't exist)
btnNo.addEventListener("mouseenter", dodgeNo);
btnNo.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeNo();
}, { passive: false });

// safety net: if somehow clicked, still dodge instead of "succeeding"
btnNo.addEventListener("click", (e) => {
  e.preventDefault();
  dodgeNo();
});

/* ---------- Scene 7 -> 8 (YES) ---------- */
btnYes.addEventListener("click", () => {
  showScene("yes");
  launchConfetti();
});

/* ---------- confetti burst ---------- */
function launchConfetti() {
  const container = document.getElementById("confetti");
  const symbols = ["🎉", "💗", "🌸", "✨", "💐", "🎊"];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDuration = 1.8 + Math.random() * 1.6 + "s";
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    piece.style.fontSize = 1 + Math.random() * 1 + "rem";
    container.appendChild(piece);
  }

  // clean up after animation so it can replay if needed
  setTimeout(() => {
    container.innerHTML = "";
  }, 4000);
}
