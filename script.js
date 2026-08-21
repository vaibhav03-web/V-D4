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

  // The Letter Box — each envelope on the grid. Edit label/emoji/body freely.
  // In body text, wrap any phrase in **double asterisks** to highlight it (like a sticky-note style emphasis).
  letters: [
    {
      emoji: "🥺",
      label: "Open when you feel stressed...",
      body: "Heyyy baby ❤️ I know you're stressed right now, but please remember you don't have to carry everything alone. Give that pretty little brain a break, okay? 🥺 Come here, let me take at least 1% of your stress… I'll handle the other 99% with unlimited hugs, kisses, and annoying love 😂❤️ You're stronger than this moment, and I'm right here with you. Now breathe, my love. Everything will be okay. 🫶🥹",
    },
    {
      emoji: "💖",
      label: "Open when you miss me...",
      body: "**Miss you too!**\nIt's kinda weird not being able to just hang out, but honestly, I'm so grateful for our bond. Let's get on a call or play something soon, okiee? Miss our random chaos a little too much. 🎀❤️",
    },
    {
      emoji: "🤗",
      label: "Open when you need a hug...",
      body: "Come here, baby 🥺❤️ I know you need a hug right now, so imagine me pulling you into the tightest, warmest hug and not letting go anytime soon. 🤗❤️ And honestly… if I were there, you'd have to fight me to escape my arms. 😭😂💕",
    },
    {
      emoji: "😆",
      label: "Open when you need a laugh...",
      body: "Remember the cute little chaos we've created over these 8 years. 😂 If I look back, I genuinely wonder how we survived each other because we were basically two professional-level idiots with zero sense and unlimited confidence. But look at us now… somehow we grew up, started taking responsibilities, and actually learned to stand by each other. ❤️ From \"let's do something stupid\" to \"don't worry, I've got your back\" — what a character development. 😂❤️ 8 years later, still together… still childish… just with more responsibilities and slightly better decision-making skills. 😭😂",
    },
  ],
};
/* ================================================ */

const scenes = {
  welcome: document.getElementById("scene-welcome"),
  question: document.getElementById("scene-question"),
  response: document.getElementById("scene-response"),
  cards: document.getElementById("scene-cards"),
  letters: document.getElementById("scene-letters"),
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
        const btn = document.getElementById("btn-to-letters");
        btn.classList.add("show");
      }
    }
    card.classList.toggle("flipped");
  });
  cardGrid.appendChild(card);
});

/* ---------- Scene 4 -> 4.5 (Letter Box) ---------- */
document.getElementById("btn-to-letters").addEventListener("click", () => {
  showScene("letters");
});

/* ---------- Letter Box: build envelopes ---------- */
const envelopeGrid = document.getElementById("envelope-grid");

CONFIG.letters.forEach((letter, i) => {
  const env = document.createElement("div");
  env.className = "envelope";
  env.innerHTML = `
    <span class="envelope-emoji">${letter.emoji}</span>
    <span class="envelope-label">${letter.label}</span>
  `;
  env.addEventListener("click", () => openLetter(letter));
  envelopeGrid.appendChild(env);
});

/* ---------- Letter Box: modal open/close ---------- */
const letterOverlay = document.getElementById("letter-overlay");
const letterLabel = document.getElementById("letter-label");
const letterBody = document.getElementById("letter-body");
const letterClose = document.getElementById("letter-close");

function openLetter(letter) {
  letterLabel.textContent = letter.label;
  // convert **highlight** markers into styled spans
  const formatted = letter.body.replace(/\*\*(.+?)\*\*/g, '<span class="highlight">$1</span>');
  letterBody.innerHTML = formatted;
  letterOverlay.classList.add("open");
}

function closeLetter() {
  letterOverlay.classList.remove("open");
}

letterClose.addEventListener("click", closeLetter);
letterOverlay.addEventListener("click", (e) => {
  if (e.target === letterOverlay) closeLetter();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLetter();
});

/* ---------- Scene 4.5 -> 5 ---------- */
document.getElementById("btn-to-setup").addEventListener("click", () => {
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
  }, 2000);

  setTimeout(() => {
    clearInterval(interval);
    showScene("ask");
  }, messages.length * 2000 + 300);
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

/* ---------- background music: soft, low-volume, fades in on first interaction ---------- */
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const TARGET_VOLUME = 0.25; // keep it gentle in the background
let musicStarted = false;
let musicMuted = false;

function fadeInMusic() {
  bgMusic.volume = 0;
  bgMusic.play().catch(() => {
    // autoplay might be blocked; it'll start on the next click instead
  });
  let vol = 0;
  const step = setInterval(() => {
    vol += 0.02;
    if (vol >= TARGET_VOLUME) {
      bgMusic.volume = TARGET_VOLUME;
      clearInterval(step);
    } else {
      bgMusic.volume = vol;
    }
  }, 120);
}

function startMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  fadeInMusic();
  musicToggle.textContent = "🔊";
}

// start softly the moment she begins the experience
document.getElementById("btn-start").addEventListener("click", startMusicOnce, { once: true });
// safety net: also start on any first click anywhere, in case autoplay rules are strict
document.body.addEventListener("click", startMusicOnce, { once: true });

musicToggle.addEventListener("click", () => {
  musicMuted = !musicMuted;
  if (musicMuted) {
    bgMusic.volume = 0;
    musicToggle.textContent = "🔇";
  } else {
    bgMusic.volume = TARGET_VOLUME;
    musicToggle.textContent = "🔊";
  }
  if (!musicStarted) startMusicOnce();
});
