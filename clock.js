const clockScreen = document.querySelector('.clock-screen');

function nowTime() {
  const now = new Date();
  const options = {hour: 'numeric', minute: 'numeric', hour12: false};
  const time = new Intl.DateTimeFormat('ko-KR', options).format(now);
  clockScreen.innerText = time;
}
function init() {
  nowTime();
  setInterval(nowTime, 1000);
}

init();