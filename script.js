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

  const heroSection = document.querySelector(".hero");
  const mainLogoContainer = document.querySelector(".main-logo-container");
  const mainLogo = document.querySelector(".logo");

  // 切り替えたい画像のリストとロゴの位置設定
  const heroBackgrounds = [
    { url: "images/other/back01.png",  logoTop: "min(55vh, 550px)", logoLeft: "auto", logoWidth: "min(500px, 92vw)"},
    { url: "images/other/back03.png", logoTop: "min(52vh, 520px)", logoLeft: "500px", logoWidth: "min(500px, 92vw)"}, // 左寄せ
    { url: "images/other/back02.png", logoTop: "min(55vh, 550px)", logoLeft: "auto", logoWidth: "min(460px, 85vw)"},
  ];

  let currentHeroIndex = 0;

  // 初期状態をセットする関数（起動時の位置ズレ防止）
  function setInitialHeroStyle() {
    const firstBg = heroBackgrounds[0];
    heroSection.style.backgroundImage = `url(${firstBg.url})`;
    
    // 変更前: mainLogoContainer.style.marginTop = firstBg.logoTop;
    // 変更後: CSS変数に値をセットする
    mainLogoContainer.style.setProperty('--dynamic-mt', firstBg.logoTop);
    mainLogo.style.width = firstBg.logoWidth;
    mainLogoContainer.style.alignItems = (firstBg.logoLeft === "auto") ? "center" : "flex-start";
    mainLogoContainer.style.paddingLeft = (firstBg.logoLeft === "auto") ? "0" : firstBg.logoLeft;
    
    mainLogoContainer.classList.remove("is-hidden");
  }

  function rotateHeroBackground() {
    mainLogoContainer.classList.add("is-hidden");

    setTimeout(() => {
      currentHeroIndex = (currentHeroIndex + 1) % heroBackgrounds.length;
      const nextBg = heroBackgrounds[currentHeroIndex];

      heroSection.style.backgroundImage = `url(${nextBg.url})`;
      
      // 変更前: mainLogoContainer.style.marginTop = nextBg.logoTop;
      // 変更後: CSS変数に値をセットする
      mainLogoContainer.style.setProperty('--dynamic-mt', nextBg.logoTop);

      mainLogo.style.width = nextBg.logoWidth;
      
      mainLogoContainer.style.alignItems = (nextBg.logoLeft === "auto") ? "center" : "flex-start";
      mainLogoContainer.style.paddingLeft = (nextBg.logoLeft === "auto") ? "0" : nextBg.logoLeft;

      setTimeout(() => {
        mainLogoContainer.classList.remove("is-hidden");
      }, 1200); 
    }, 600); 
  }

  // 実行
  setInitialHeroStyle();
  setInterval(rotateHeroBackground, 6000);


  const characters = [
    {
      name: "あらかわ",
      color: "#ffe96b",
      desc: `バニーダイナーの"(自称)元気担当"。
      黙っていれば可愛いが、ひとたび話し始めると止まらない暴走列車になってしまう。特にえっちな話題に目がなく、かわいい女の子が大好き。`,
      bust: "images/characters/arakawa_bust.png",
      full: "images/characters/arakawa_full.png"
    },
    {
      name: "しろまぐろ",
      color: "#ff4d82",
      desc: `手作りの青いリボンがトレードマーク。
      褒め上手で褒められ下手、お喋り上手の自称コミュ障。褒められると恥ずかしがる姿に心を掴まれたお客さんは数知れず。えっちな話題が苦手な姿にもそそられるお客さんは多いらしい……。`,
      bust: "images/characters/shiromaguro_bust.png",
      full: "images/characters/shiromaguro_full.png"
    },
    {
      name: "しーな",
      color: "#af4dff",
      desc: `バニーダイナーのみんなの"お姉さん"。
      キャスト内でも1、2を争うほどえっちな見た目でみんなを惑わせている。
      第一印象とは異なり店内でも随一の常識人で、お客さんの真面目な相談にのることもしばしば……。
      何故か水着を着たがらないが噂によるとなにやら不思議なタトゥーが入っているだとか……？`,
      bust: "images/characters/shina_bust.png",
      full: "images/characters/shina_full.png"
    },
    {
      name: "かます",
      color: "#684dff",
      desc: `何事にも真剣勝負がモットー。
      普段は落ち着いた言動を心がけているが、ふとした時につい関西の血が暴れてしまう上、その度に多方面からいじられている。ボケが多いバニーだーないなーの中の数少ないツッコミだが、時々様子のおかしい言動が見られる。
      様々なジャンルのゲームが好きでビリヤードから放置ゲームまで網羅している。`,
      bust: "images/characters/kamasu_bust.png",
      full: "images/characters/kamasu_full.png"
    },
    {
      name: "エナガ",
      color: "#c0b5aa",
      desc: `動きで魅せる言葉少ないバニー。
      普段は無口で視線や動きだけでお客さんを魅了する、蠱惑的なお姉さん。
      しかし、気まぐれに言葉を発することもあり、その時は少し茶目な雰囲気も感じ取れるそのギャップにますます魅了されてしまう。`,
      bust: "images/characters/enaga_bust.png",
      full: "images/characters/enaga_full.png"
    }, 
    {
      name: "ケセド",
      color: "#c43232e8",
      desc: "まだ",
      bust: "images/characters/chesed_bust.png",
      full: "images/characters/chesed_full.png"
    },  
    {
      name: "パッキー",
      color: "#a13498",
      desc: "まだ",
      bust: "images/characters/pakkii_bust.png",
      full: "images/characters/pakkii_full.png"
    },  
    {
      name: "うましかちょう",
      color: "#ec1c00",
      desc: "自分で紹介文を書くのは勘弁してください",
      bust: "images/characters/bakkerfly_bust.png",
      full: "images/characters/bakkerfly_full.png"
    },   
    {
      name: "ゆっきー",
      color: "#e8adee",
      desc: `まったりとした話し方がチャームポイント。
      ファッションに精通しており、その時々の流行アイテムや流行色などについて詳しく教えてくれる。
      お酒好きのため、お酒の話にも楽しそうに反応してくれる。
      しかしお酒が回りきると原型がないほど砕け切った話し方になってしまうため、コミュニケーションが難しいことも……。`,
      bust: "images/characters/yukki_bust.png",
      full: "images/characters/yukki_full.png"
    }, 
    {
      name: "うぇざー",
      color: "#ecdd87",
      desc: "まだ",
      bust: "images/characters/weather_bust.png",
      full: "images/characters/weather_full.png"
    }, 
    {
      name: "ランシア",
      color: "#57e2d7",
      desc: `気づいたときにはそこにいた。
      誰も知らない謎の存在。
      今日も店内を見つめている。`,
      bust: "images/characters/ransia_bust.png",
      full: "images/characters/ransia_full.png"
    }, 
    {
      name: "スバル",
      color: "#4260c2",
      desc: `すべてはここから始まった。
      誕生日を最も有効活用したことで知られる。`,
      bust: "images/characters/subaru_bust.png",
      full: "images/characters/subaru_full.png"
    }, 
    {
      name: "かぶらや",
      color: "#6d0c0c",
      desc: `みんなのマスコット的存在。
      中身は狐面をしたイケメンだとまことしやかにささやかれている。`,
      bust: "images/characters/kaburaya_bust.png",
      full: "images/characters/kaburaya_full.png"
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
