// Buradaki ayarlardan sadece letter ı değiştirebilirsiniz.
// Diğer ayarlara pls dokunmayın. Can ile maxwini değiştirecekseniz index.html deki divleri ayarlamanız gerekmekte. Koda yazsaydım kod kalabalığı olurdu ondan siz elinizle yapın.
// Dipnot: spamGuard ın false olması spam koruması yok demek değil o sürekli var. spamGuard sadece tuşa bir defa basıldığı anda true oluyor o yüzden şu an false elleşmeyin ona.
// Discord Eiben#4325
// Github Eiben
// Steam /naeiben


let letter = ["A", "S", "D"],
  life = 3,
  win = 0,
  maxwin = 5,
  gameStart = false,
  key = "",
  randomLetter = 0,
  randomPlace = 0,
  rectTop = 683,
  rectBottom = 470,
  spamGuard = false,
  lateWork = [],
  whichGame = 0,
  gameNowKey = "",
  gameNowCheckKey = "",
  redColor = false;

$(document).ready(() => {
  const letters = document.querySelectorAll(".letter");
  const heartPlace = document.querySelectorAll(".life-place div");
  const winPlace = document.querySelectorAll(".win-place div");

  function clean() {
    for (var i = 0; i < letters.length; i++) {
      letters[i].innerHTML = " ";
      letters[i].classList.remove("letter-anim");
      letters[i].style.color = "#fff";
    }
  }

  function play() {
    clean();
    whichGame += 1;
    const numForRed = Math.floor(Math.random() * 101);
    if (numForRed < 40) {
      redColor = true;
    }
    setTimeout(() => {
      gameNowKey = `game${whichGame}`;
      var newarr = [];
      var objj = { [gameNowKey]: false };
      newarr.push(objj);
      lateWork.push(newarr);
    }, 10);
    setTimeout(() => {
      if (life > 0 && win < maxwin) {
        gameStart = true;
        randomLetter = Math.floor(Math.random() * letter.length);
        randomPlace = Math.floor(Math.random() * letters.length);
        letters[randomPlace].innerHTML = letter[randomLetter];
        letters[randomPlace].classList.add("letter-anim");
        key = letter[randomLetter];
        if (redColor) {
          letters[randomPlace].style.color = "red";
        }
        lateGame(whichGame);
      }
    }, 20);
  }
  play();

  function lateGame(num) {
    setTimeout(() => {
      if (!lateWork[num - 1][1]) {
        if (redColor) {
          redColor = false;
          play();
          return;
        } else {
          life -= 1;
          heart(life);
        }
      }
    }, 1500);
  }

  function setHeart(life) {
    for (var i = 0; i < 3; i++) {
      heartPlace[i].style.background = "transparent";
    }
    setTimeout(() => {
      for (var i = 0; i < life; i++) {
        heartPlace[i].style.background = "red";
      }
    }, 10);
  }
  setHeart(life);
  function setWin(wiin) {
    for (var i = 0; i < 5; i++) {
      winPlace[i].style.background = "transparent";
    }
    setTimeout(() => {
      for (var i = 0; i < wiin; i++) {
        winPlace[i].style.background = "#35eb0c";
      }
    }, 10);
  }

  function heart(heart) {
    gameStart = false;
    spamGuard = false;
    setHeart(heart);
    if (heart === 0) {
      console.log("yenildin");
      return;
    } else {
      play();
      return;
    }
  }

  function won(won) {
    gameStart = false;
    spamGuard = false;
    setWin(won);
    if (won === maxwin) {
      console.log("tebrikler");
      return;
    } else {
      play();
      return;
    }
  }

  document.addEventListener("keypress", (e) => {
    const keypressing = e.code.substring(3, 4);
    if (!spamGuard) {
      spamGuard = true;
      gameNowCheckKey = `game${whichGame}check`;
      var objj2 = { [gameNowCheckKey]: true };
      lateWork[whichGame - 1].push(objj2);
      if (gameStart) {
        if (redColor) {
          redColor = false;
          life -= 1;
          heart(life);
        } else {
          if (keypressing === key) {
            const bodySel = document.querySelector(".container");
            const doctop = bodySel.getBoundingClientRect().bottom
            const docbot = bodySel.getBoundingClientRect().top
            rectTop = (683*doctop)/860.75
            rectBottom = (470*docbot)/78.25
            const rect = letters[randomPlace].offsetTop;
            if (rect > rectBottom && rect < rectTop) {
              win += 1;
              won(win);
              return;
            } else {
              life -= 1;
              heart(life);
            }
          } else {
            life -= 1;
            heart(life);
          }
        }
      }
    }
  });
});
