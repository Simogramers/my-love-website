// Small floating hearts and the interactive letter.
document.addEventListener("DOMContentLoaded", () => {
  const heartLayer = document.querySelector(".floating-hearts");
  if (heartLayer) {
    const makeHeart = () => {
      const heart = document.createElement("span");
      heart.className = "heart-particle";
      heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${10 + Math.random() * 16}px`;
      heart.style.animationDuration = `${9 + Math.random() * 8}s`;
      heartLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 18000);
    };
    for (let i = 0; i < 9; i++) setTimeout(makeHeart, i * 450);
    setInterval(makeHeart, 1500);
  }

  const envelope = document.getElementById("open-letter");
  const note = document.getElementById("love-note");
  const hint = document.getElementById("tap-hint");
  if (envelope && note) {
    envelope.addEventListener("click", () => {
      const isOpen = envelope.classList.toggle("open");
      envelope.setAttribute("aria-expanded", String(isOpen));
      note.hidden = !isOpen;
      if (hint) hint.textContent = isOpen ? "your little surprise ♡" : "tap to open your letter";
      if (isOpen) setTimeout(() => note.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
    });
  }

  // Tap a gallery photo to view it larger.
  document.querySelectorAll(".polaroid img").forEach(img => {
    img.addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.className = "photo-lightbox";
      overlay.innerHTML = `<button class="lightbox-close" aria-label="Close">×</button><img alt="">`;
      overlay.querySelector("img").src = img.src;
      overlay.querySelector("img").alt = img.alt;
      Object.assign(overlay.style, {
        position: "fixed", inset: "0", zIndex: "20", background: "rgba(58,31,43,.86)",
        display: "grid", placeItems: "center", padding: "25px", cursor: "zoom-out"
      });
      Object.assign(overlay.querySelector("img").style, {
        maxWidth: "min(90vw, 650px)", maxHeight: "85vh", objectFit: "contain",
        border: "8px solid white", boxShadow: "0 20px 60px rgba(0,0,0,.25)"
      });
      const close = overlay.querySelector("button");
      Object.assign(close.style, {
        position: "absolute", top: "20px", right: "25px", border: "0", background: "none",
        color: "white", fontSize: "2.5rem", cursor: "pointer"
      });
      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });
});
