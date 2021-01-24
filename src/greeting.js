const askNameForm = document.querySelector(".askNameForm");
const askNameInput = document.querySelector(".askNameInput");
const askNameSection = document.querySelector(".askName");
const helloScreen = document.querySelector(".helloScreen");
const greetingText = document.querySelector(".greetingText");
const greetingName = document.querySelector(".greetingName");
const topbar = document.querySelector(".top");
const middle = document.querySelector(".middle");

const testBtn = document.querySelector(".testBtn");

const USER_LS = "currentUser";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function show() {
  askNameSection.classList.add("noshow");
  topbar.classList.add("show");
  middle.classList.add("show");
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = askNameInput.value;
  saveName(currentValue);
  askNameInput.value = "";
  askNameForm.classList.add("disappear");
  helloScreen.classList.add("appear");
  helloScreen.addEventListener("animationend", show);
  helloScreen.innerText = `반가워요! ${currentValue}님`;
  greetingUser(currentValue);
  // setTimeout(function () {
  //   console.log("이벤트 보냄");
  // }, 2000);
}

function greetingUser(text) {
  const now = new Date();
  const hours = now.getHours();
  function greetingMessage(hours) {
    let result;
    if (0 < hours && hours < 6) {
      result = "잘자요!";
    } else if (5 < hours && hours < 12) {
      result = "좋은 아침입니다!";
    } else if (11 < hours && hours < 14) {
      result = "점심 맛있게 드셨나요?";
    } else if (11 < hours && hours < 18) {
      result = "활기한 하루 되세요!";
    } else {
      result = "좋은 저녁입니다!";
    }
    return result;
  }

  greetingText.innerText = greetingMessage(hours);
  greetingName.innerText = `${text}님`;
}

function askUserName() {
  askNameForm.addEventListener("submit", handleSubmit);
}

function loadUser() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askUserName();
  } else {
    askNameSection.classList.add("noshow");
    topbar.classList.add("show");
    middle.classList.add("show");
    greetingUser(currentUser);
  }
}

loadUser();
