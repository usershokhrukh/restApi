const request = new XMLHttpRequest();
let reporter = 0;

function getData(data) {
  data.map((item, index) => {
    let {body, likes, user} = item;
    if(reporter == index) {
      reporter = 0;
    }
    add(body, likes, user.fullName);
  });
}

const elForm = document.querySelector(".section__form");
const elInput = elForm["textarea"];
const elMainText = document.querySelector(".section__main-text");
const elMainLikes = document.querySelector(".section__main-likes");
const elMainViews = document.querySelector(".section__main-view");
const elCards = document.querySelector(".section__cards");
const elSend = document.querySelector(".send");

let likes = 0;
let views = 1;
elSend.addEventListener("click", (e) => {
  if (!elInput.value.trim()) {
    elInput.classList.add("warning");
  } else {
    elInput.classList.remove("warning");
    let responseText = JSON.parse(request.responseText);
    if(reporter == responseText.comments.length) {
      reporter = 0;
    }
    if(reporter != 0) {
      if(reporter == responseText.comments.length) {
        elInput.value = "";
        setTimeout(() => {
          startData();
        }, 2000);
      }else {
        alert(`Wait for end of comments ${responseText.comments.length - reporter} left`)
      }
    }else {
      elMainText.textContent = elInput.value.trim();
      setTimeout(() => {
          startData();
        }, 2000);
    }
    elInput.value = "";
  }
});

request.open("GET", "https://dummyjson.com/comments");
request.send();

function likesF(index) {
  const elLikes = document.querySelectorAll(".like");
  const elDislike = document.querySelectorAll(".dislike");
  elLikes[index].addEventListener("click", () => {
    elLikes[index].classList.toggle("bg");
    elDislike[index].classList.remove("dislike-bg");
  });
}

function dislikes(index) {
  const elDislike = document.querySelectorAll(".dislike");
  const elLikes = document.querySelectorAll(".like");
  elDislike[index].addEventListener("click", () => {
    elDislike[index].classList.toggle("dislike-bg");
    elLikes[index].classList.remove("bg");
  });
}

function startData() {
  if (request.readyState === 4) {
    let responseText = JSON.parse(request.responseText);
    getData(responseText.comments);
  }
}

elInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.trim();
  if (inputValue) {
    elInput.classList.remove("warning");
  }
});

function add(body, likesU, fullName) {
  setTimeout(() => {
    reporter++;
    elCards.innerHTML += `
      <div class="section__items">
          <div class="section__items-top">
            <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
            <div class="section__top-box">
              <h2 class="section__items-title">${fullName} <span class="section__items-title-sub"></span></h2>
            </div>
          </div>
          <div class="section__items-main">
            <p class="section__items-text">${body}</p>
            <div class="section__items-box">
              <svg width="20" class="like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path></svg>
              <svg width="20" class="dislike" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.40017 16H3C1.89543 16 1 15.1046 1 14V11.8957C1 11.6344 1.05118 11.3757 1.15064 11.1342L4.24501 3.61925C4.3993 3.24455 4.76447 3 5.16969 3H22C22.5523 3 23 3.44772 23 4V14C23 14.5523 22.5523 15 22 15H18.5182C18.1932 15 17.8886 15.1579 17.7012 15.4233L12.2478 23.149C12.1053 23.3508 11.8367 23.4184 11.6157 23.3078L9.80163 22.4008C8.74998 21.875 8.20687 20.6874 8.49694 19.548L9.40017 16ZM17 13.4125V5H5.83939L3 11.8957V14H9.40017C10.7049 14 11.6602 15.229 11.3384 16.4934L10.4351 20.0414C10.3771 20.2693 10.4857 20.5068 10.6961 20.612L11.3572 20.9425L16.0673 14.27C16.3172 13.9159 16.6366 13.6257 17 13.4125ZM19 13H21V5H19V13Z"></path></svg>
            </div>
          </div>
        </div>
    `;
    const elLikes = document.querySelectorAll(".like");
    for (var i = 1; i < elLikes.length; i++) {
      likesF(i);
      dislikes(i);
    }
    delAnimate();
    const elItems = document.querySelectorAll(".section__items");
    elItems[elItems.length - 1].classList.toggle("animate-show");
    views++;
    elMainViews.textContent = `${views}`;
    likes += likesU;
    setTimeout(() => {
      elMainLikes.textContent = `${likes}`;
    }, Math.random() * 1000) *
      (Math.random() * 1000);
  }, Math.random() * 700 * (Math.random() * 400));
}

function delAnimate() {
  const elItems = document.querySelectorAll(".section__items");
  for (var i = 0; i < elItems.length - 1; i++) {
    elItems[i].classList.remove("animate-show");
  }
}
