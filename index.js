function checkScreenSize() {
  const titleEl = document.querySelector(".main");
  const spanEl = titleEl.querySelector("span");
  const anchorEl = titleEl.querySelector("a");

  if (window.matchMedia("(max-width: 768px)").matches) {
    anchorEl.textContent = `AMAZING NUMBERS`;
    spanEl.textContent = `HOME`;
  } else {
    anchorEl.textContent = `➡️ AMAZING 🔄 NUMBERS ⬅️ `;
    spanEl.textContent = `6️⃣ 7️⃣ 8️⃣ #️⃣
        HOME 3️⃣ 2️⃣ 1️⃣ 🆒🆗`;
  }
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);