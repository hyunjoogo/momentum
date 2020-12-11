const importantWorkForm = document.querySelector('.importantwork-form');
const importantWorkInput = document.querySelector('.importantwork-input');
const importantWorktext = document.querySelector('.importantWork-screen-text');

const WORK_LS = "importantWork";

function savewWork(text) {
  localStorage.setItem(WORK_LS, text);
}

function showwork(text) {
  importantWorktext.innerText = text;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = importantWorkInput.value;
  showWork(currentValue);
  saveWork(currentValue);
}

function askWork() {
  importantWorkForm.addEventListener('submit', handleSubmit);
}

function loadImportantWork() {
  const importantWork = localStorage.getItem(WORK_LS);
  if (importantWork === null) {
    askWork();
  } else {
    showWork(importantWork);
  }
}

function init() {
  loadImportantWork();
}

init();


// 1. input에 submot을 하면 이벤트가 발생
// 2. text를 로컬에 저장
// 2.1 text를 h1에 innerText
// 3.1 importantWork-ask__container 없애기
// 3.2 importantwork-screen__container 보여주기
// 4.
