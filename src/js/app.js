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
  rectFark = 213,
  rectTopNow = 683,
  rectBottomNow = 470,
  rectFarkNow = 213,
  spamGuard = false,
  lateWork = [],
  whichGame = 0,
  gameNowKey = "",
  gameNowCheckKey = "",
  redColor = false,
  oncekiRedMi = false;

$(document).ready(() => {
  const letters = document.querySelectorAll(".letter");
  const heartPlace = document.querySelectorAll(".life-place div");
  const winPlace = document.querySelectorAll(".win-place div");

  function clean() {
    for (var i = 0; i < letters.length; i++) {
      letters[i].innerHTML = " ";
      letters[i].classList.remove("letter-anim");
      letters[i].classList.remove("letter-fast-anim");
      letters[i].style.color = "#fff";
    }
  }

  function play() {
    clean();
    whichGame += 1;
    const numForRed = Math.floor(Math.random() * 101);

    if (numForRed < 40) {
      if (!oncekiRedMi && whichGame !== 1) {
        redColor = true;
        oncekiRedMi = true;
      }
    }
    const numForPlace = Math.floor(Math.random() * 550) + 150;

    if (numForPlace < 470) {
      rectBottomNow = numForPlace;
      rectFarkNow = 470 - rectBottomNow;
      rectTopNow = 683 - rectFarkNow;
    } else if (683 < numForPlace) {
      rectTopNow = numForPlace;
      rectFarkNow = numForPlace - 683;
      rectBottomNow = 470 + rectFarkNow;
    } else {
      rectTopNow = numForPlace;
      rectFarkNow = 683 - rectTopNow;
      rectBottomNow = 470 - rectFarkNow;
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
        if (whichGame === 1) {
          letters[randomPlace].classList.add("letter-fast-anim");
        } else {
          letters[randomPlace].classList.add("letter-anim");
        }
        key = letter[randomLetter];
        if (redColor) {
          letters[randomPlace].style.color = "red";
        } else if (whichGame === 1) {
          letters[randomPlace].style.color = "yellow";
        } else {
          letters[randomPlace].style.color = "white";
        }
        const bodySel = document.querySelector(".container");
        const doctop = bodySel.getBoundingClientRect().bottom;
        const docbot = bodySel.getBoundingClientRect().top;
        rectTop = (rectTopNow * doctop) / 860.75;
        rectBottom = (rectBottomNow * docbot) / 78.25;
        if(whichGame === 1){
          const myOtherInterval = setInterval(()=>{
            const rectOffset = letters[randomPlace].offsetTop;
            if(rectOffset < rectTop && rectOffset > rectBottom){
              letters[randomPlace].style.color = 'green'
            }else if(rectOffset < rectBottom) {
              setTimeout(()=>{
                letters[randomPlace].style.color = '#fc0303'
              },20)
              setTimeout(()=>{
                letters[randomPlace].style.color = '#fcf803'
              },40)
              setTimeout(()=>{
                letters[randomPlace].style.color = '#0384fc'
              },60)
              setTimeout(()=>{
                letters[randomPlace].style.color = '#df03fc'
              },80)
            } else {
              letters[randomPlace].style.color = '#000'
              clearInterval(myOtherInterval)
            }
          },100)
        }else {
          const myInterval = setInterval(() => {
            const rectOffset = letters[randomPlace].offsetTop;
            if (rectOffset < rectTop && rectOffset > rectBottom) {
              letters[randomPlace].style.color = "green";
            } else if (rectOffset > rectTop) {
              if (redColor) {
                letters[randomPlace].style.color = "red";
              } else {
                oncekiRedMi = false;
                letters[randomPlace].style.color = "white";
              }
              clearInterval(myInterval);
            }
          }, 5);
        }
        lateGame(whichGame);
      }
    }, 20);
  }
  play();

  function lateGame(num) {
    if (num === 1) {
      setTimeout(() => {
        if (!lateWork[num - 1][1]) {
          heart(life);
        }
      }, 1000);
    } else {
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
      }, 2500);
    }
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
            const rect = letters[randomPlace].offsetTop;
            if (rect > rectBottom && rect < rectTop) {
              if (whichGame === 1) {
                win = maxwin;
                won(maxwin);
                return;
              }
              win += 1;
              won(win);
              return;
            } else {
              if (whichGame !== 1) {
                life -= 1;
                heart(life);
              }
            }
          } else {
            if (whichGame !== 1) {
              life -= 1;
              heart(life);
            }
          }
        }
      }
    }
  });
});
