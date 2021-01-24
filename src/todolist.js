"use strict";

const addTodos = document.querySelector(".todoform");
const pendingTodo = document.querySelector(".pendingtodo");
const finishedTodo = document.querySelector(".finishedtodo");
const delToDo = document.querySelector(".deltodo");

let toDos = JSON.parse(localStorage.getItem("PENDING")) || [];
let finishToDos = JSON.parse(localStorage.getItem("FINISHED")) || [];
let idNumbers = 1;

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("input").value;
  const newId = idNumbers;
  idNumbers += 1;
  const todo = {
    text: text,
    done: false,
    id: newId,
  };
  toDos.push(todo);
  localStorage.setItem("PENDING", JSON.stringify(toDos));
  fillList(toDos, pendingTodo);
  this.reset();
}

function fillList(items = [], itemList) {
  itemList.innerHTML = items
    .map((item, i) => {
      return `
  <li data-index=${i} id="${item.id}">
    <input type="checkbox" data-index=${i} ${item.done ? "checked" : ""} />
    <span data-index=${i}>${item.text}</span>
    <button data-index=${i}>🖐</button>
  </li>`;
    })
    .join("");
}

function deleteTodos(e) {
  const target = e.target;
  const li = target.parentNode;
  const ulListName = li.parentNode.className;
  const index = target.dataset.index;
  if (ulListName === "pendingtodo") {
    li.remove();
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    localStorage.setItem("PENDING", JSON.stringify(toDos));
  } else if (ulListName === "finishedtodo") {
    li.remove();
    delete finishToDos[index];
    const cleanToDos = finishToDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    finishToDos = cleanToDos;
    localStorage.setItem("FINISHED", JSON.stringify(finishToDos));
  }
}

function toggleDone(e) {
  const target = e.target;
  const targetParent = target.parentNode;
  const index = target.dataset.index;
  const ulListName = targetParent.parentNode.className;
  if (e.target.matches("button")) {
    deleteTodos(e);
  } else if (e.target.matches("input")) {
    if (ulListName === "pendingtodo") {
      toDos[index].done = !toDos[index].done;
      e.target.parentNode.remove();
      const cleanToDos = toDos.filter(function (todo) {
        return todo.done === false;
      });
      const moveToDos = toDos.filter(function (todo) {
        return todo.done === true;
      });
      finishToDos.push(...moveToDos);
      toDos = cleanToDos;
    } else if (ulListName === "finishedtodo") {
      finishToDos[index].done = !finishToDos[index].done;
      e.target.parentNode.remove();
      const cleanToDos = finishToDos.filter(function (todo) {
        return todo.done === true;
      });
      const moveToDos = finishToDos.filter(function (todo) {
        return todo.done === false;
      });
      toDos.push(...moveToDos);
      finishToDos = cleanToDos;
    }
    localStorage.setItem("PENDING", JSON.stringify(toDos));
    localStorage.setItem("FINISHED", JSON.stringify(finishToDos));
    fillList(toDos, pendingTodo);
    fillList(finishToDos, finishedTodo);
  } else {
    return;
  }
}

function clearToDo(e) {
  if (e.target.className === "deltodo") {
    return;
  } else {
    console.log("d");
    toDos = [];
    finishToDos = [];
    localStorage.setItem("PENDING", JSON.stringify(toDos));
    localStorage.setItem("FINISHED", JSON.stringify(finishToDos));
    fillList(toDos, pendingTodo);
    fillList(finishToDos, finishedTodo);
  }
}

finishedTodo.addEventListener("click", toggleDone);
pendingTodo.addEventListener("click", toggleDone);
addTodos.addEventListener("submit", addItem);
delToDo.addEventListener("click", clearToDo);

fillList(toDos, pendingTodo);
fillList(finishToDos, finishedTodo);
