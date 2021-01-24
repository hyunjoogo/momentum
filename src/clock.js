const timeTitle = document.querySelector(".timeTitle");
const hour12 = document.querySelector("label");
const hour12Input = document.querySelector("#hour12");
const clockSwitch = document.querySelector(".clockswitch");

let options = { hour: "numeric", minute: "numeric", hour12: false };

function nowTime() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("ko-KR", options).format(now);
  timeTitle.innerText = time;
}

hour12.addEventListener("click", (e) => {
  options.hour12 = !options.hour12;
});

nowTime();
setInterval(nowTime, 1000);
