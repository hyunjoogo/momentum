const greetingScreen = document.querySelector('.greeting-screen');
const askNameInput = document.querySelector('.askNameInput');
const askNameForm = document.querySelector('.askNameForm');

const USER_LS = "currentUser"

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}


function handleSubmit(event) {
  event.preventDefault();
  const currentValue = askNameInput.value;
  greetingUser(currentValue)
  saveName(currentValue);
}

function askUserName() {
  askNameForm.addEventListener('submit', handleSubmit);
}

function greetingUser(text) {
  greetingScreen.innerText = `만나서 반가워요, ${text}`;
}
function loadUser() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askUserName();
  } else {
    greetingUser(currentUser);
  };
}

function init(){
  loadUser();
}

init();

// 1.1. 유저가 없다면 
// 1. form은 보이게, 인사는 안 보이게
// 2. 유저 이름을 로컬스토리지에 넣는다.
  // 2.1 form을 submit하면 A함수가 하나 발동
  // 2.2 A함수는 이벤트가 다시 페이지가 리플레쉬 되는걸 막고
      // input value를 상수로 만들어서 인사하는데도 쓰고 해
  // 2.3 로컬스토리지에 key : currentUser , Value : text 저장해.
//  2.1. 유저가 있으면 
// 1. 로컬스토리지에서 이름을 가지고 와
// 2. form 안보이게, 인사는 할 수 있도록
// 3. 인사는 이렇게 해.