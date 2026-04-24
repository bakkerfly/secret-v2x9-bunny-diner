document.addEventListener("DOMContentLoaded", () => {
  const topLink = document.getElementById("topLink");
  const selector = document.getElementById("selector");
  const characterDisplay = document.querySelector(".character-display");
  const charImage = document.getElementById("charImage");
  const charName = document.getElementById("charName");
  const charDesc = document.getElementById("charDesc");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const galleryImages = Array.from(document.querySelectorAll(".gallery-img"));
  const revealSections = Array.from(document.querySelectorAll(".reveal-on-scroll"));

  const characters = [
    {
      name: "あらかわ",
      color: "#ffe96b",
      desc: "明るさ全振り、でも話題はなぜかちょっと危険。\nかわいい女の子を見つけるとテンション急上昇、ブレーキはほぼ未搭載。\n見た目はふわっとしてるのに、動きは常に騒がしくて落ち着きゼロ。",
      bust: "images/characters/arakawa_bust.png",
      full: "images/characters/arakawa_full.png"
    },
    {
      name: "しろまぐろ",
      color: "#ff4d82",
      desc: "手作りの青いリボンに想いを込めた、自己評価低めの褒め上手。\n一度スイッチが入ると賞賛が止まらないのに、本人は「コミュ障だから…」と逃げ腰。\n恥ずかしがりで、そういう話題には即フリーズ。距離が縮まるほどにギャップが露呈する、不器用系ヒロイン。",
      bust: "images/characters/shiromaguro_bust.png",
      full: "images/characters/shiromaguro_full.png"
    },
    {
      name: "しーな",
      color: "#af4dff",
      desc: "大人の余裕、完璧な立ち振る舞い。その裏にある“秘密”は決して見せない。\n水着を着ないのはタトゥーが入っているからだと話しているが…？\n黒猫を飼っているらしい。",
      bust: "images/characters/shina_bust.png",
      full: "images/characters/shina_full.png"
    },
    {
      name: "かます",
      color: "#684dff",
      desc: "勝負を全力で楽しむ関西人。\n落ち着いて見えるが、リアクションだけは誤魔化せない。\n隙を突かれて、なぜかいじられ役に回ってしまう。",
      bust: "images/characters/kamasu_bust.png",
      full: "images/characters/kamasu_full.png"
    },
    {
      name: "かぶらや",
      color: "#940707",
      desc: "みんなのマスコット的存在。\n中身は狐面をしたイケメンだとまことしやかにささやかれている。",
      bust: "images/characters/kaburaya_bust.png",
      full: "images/characters/kaburaya_full2.png"
    }
  ];

  let currentCharacter = 0;
  let currentGalleryIndex = 0;
  let isCharacterModal = false;
  let isCharacterAnimating = false;
  let isModalImageAnimating = false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderButtons() {
    selector.innerHTML = "";
    characters.forEach((character, index) => {
      const btn = document.createElement("button");
      btn.textContent = character.name;
      btn.style.setProperty("--c-color", character.color);
      if (index === currentCharacter) btn.classList.add("active");

      btn.addEventListener("click", () => {
        if (index === currentCharacter) return;
        if (isCharacterAnimating) return;
        animateCharacterChange(index);
      });

      selector.appendChild(btn);
    });
  }

  function updateCharacter() {
    const character = characters[currentCharacter];
    charImage.src = character.bust;
    charName.textContent = character.name;
    charDesc.textContent = character.desc;
    charName.style.setProperty("--char-color", character.color);
  }

  function animateCharacterChange(nextIndex) {
    if (prefersReducedMotion) {
      currentCharacter = nextIndex;
      updateCharacter();
      renderButtons();
      return;
    }

    isCharacterAnimating = true;
    characterDisplay.classList.add("is-switching-out");

    window.setTimeout(() => {
      currentCharacter = nextIndex;
      updateCharacter();
      renderButtons();

      characterDisplay.classList.remove("is-switching-out");
      characterDisplay.classList.add("is-switching-in");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          characterDisplay.classList.remove("is-switching-in");
          isCharacterAnimating = false;
        });
      });
    }, 170);
  }

  function openModal(src) {
    modal.classList.add("active");
    modalImg.src = src;
    const showArrows = !isCharacterModal;
    prevBtn.style.display = showArrows ? "block" : "none";
    nextBtn.style.display = showArrows ? "block" : "none";
  }

  function closeModal() {
    modal.classList.remove("active");
  }

  function switchModalImage(nextSrc) {
    if (prefersReducedMotion) {
      modalImg.src = nextSrc;
      return;
    }
    if (isModalImageAnimating) return;

    isModalImageAnimating = true;
    modalImg.classList.add("is-fading-out");

    window.setTimeout(() => {
      modalImg.src = nextSrc;
      modalImg.classList.remove("is-fading-out");
      modalImg.classList.add("is-fading-in");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modalImg.classList.remove("is-fading-in");
          isModalImageAnimating = false;
        });
      });
    }, 150);
  }

  function setupScrollReveal() {
    if (!revealSections.length) return;

    document.body.classList.add("has-scroll-reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealSections.forEach((section) => section.classList.add("is-visible"));
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -15% 0px"
      }
    );

    revealSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  topLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", (event) => {
      event.stopPropagation();
      isCharacterModal = false;
      currentGalleryIndex = index;
      openModal(img.src);
    });
  });

  charImage.addEventListener("click", (event) => {
    event.stopPropagation();
    isCharacterModal = true;
    openModal(characters[currentCharacter].full);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  modalImg.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  if (modalClose) {
    modalClose.addEventListener("click", (event) => {
      event.stopPropagation();
      closeModal();
    });
  }

  prevBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isCharacterModal) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    switchModalImage(galleryImages[currentGalleryIndex].src);
  });

  nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isCharacterModal) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    switchModalImage(galleryImages[currentGalleryIndex].src);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("active")) return;

    if (event.key === "Escape" || event.key === "Esc") {
      closeModal();
      return;
    }
    if (isCharacterModal) return;

    if (event.key === "ArrowRight") {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      switchModalImage(galleryImages[currentGalleryIndex].src);
    } else if (event.key === "ArrowLeft") {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      switchModalImage(galleryImages[currentGalleryIndex].src);
    }
  });

  setupScrollReveal();
  renderButtons();
  updateCharacter();
});
