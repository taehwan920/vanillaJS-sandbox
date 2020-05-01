const now = new Date();
const year = now.getFullYear();
const month =
    now.getMonth() < 10 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`;
const day = now.getDate() < 10 ? `0${now.getDate()}` : `${now.getDate()}`;
const hour = now.getHours() < 10 ? `0${now.getHours()}` : `${now.getHours()}`;
const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : `${now.getMinutes()}`;
const second = `${now.getMilliseconds()}`;

const ID = `${year}${month}${day}${hour}${minute}${second}`;
const pendingBox = document.querySelector(".pending-li");
const finishedBox = document.querySelector(".finished-li");
const taskInput = document.querySelector(".add-task");
let pendingToDos = [];
let finishedToDos = [];

const submitted = e => {
    const TEXT = e.target.childNodes[1].value;
    const newToDo = {
        id: ID,
        text: TEXT
    };
    e.target.childNodes[1].value = "";
    createPending(newToDo);
};

const savePendings = () => {
    localStorage.setItem("PENDING", JSON.stringify(pendingToDos));
};

const saveFinisheds = () => {
    localStorage.setItem("FINISHED", JSON.stringify(finishedToDos));
};

const loadToDos = () => {
    const pendList = JSON.parse(localStorage.getItem("PENDING"));
    const finList = JSON.parse(localStorage.getItem("FINISHED"));
    if (!pendList) {
        return;
    }
    pendList.forEach(item => {
        createPending(item);
    });
    if (!finList) {
        return;
    }
    finList.forEach(item => {
        createFinished(item);
    });
};

const createPending = obj => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const okBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    okBtn.innerText = "✅";
    okBtn.addEventListener("click", sendToFinished);
    span.innerText = obj.text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(okBtn);
    li.id = obj.id;
    pendingBox.appendChild(li);
    pendingToDos.push(obj);
    savePendings();
};

const createFinished = obj => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const controlBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    controlBtn.innerText = "⏪";
    controlBtn.addEventListener("click", backToPending);
    span.innerText = obj.text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(controlBtn);
    li.id = obj.id;
    finishedBox.appendChild(li);
    finishedToDos.push(obj);
    saveFinisheds();
};

const deleteToDo = btn => {
    const parentBox = btn.target.parentNode.parentNode.className;
    const list = btn.target.parentNode;
    const listID = btn.target.parentNode.id;
    if (parentBox === "pending-li") {
        pendingBox.removeChild(list);
        pendingToDos = pendingToDos.filter(item => item.id !== listID);
        savePendings();
    } else if (parentBox === "finished-li") {
        finishedBox.removeChild(list);
        finishedToDos = finishedToDos.filter(item => item.id !== listID);
        saveFinisheds();
    }
};

const sendToFinished = btn => {
    const listID = btn.target.parentNode.id;
    const selectedOne = pendingToDos.filter(item => item.id === listID)[0];
    createFinished(selectedOne);
    deleteToDo(btn);
};

const backToPending = btn => {
    const listID = btn.target.parentNode.id;
    const selectedOne = finishedToDos.filter(item => item.id === listID)[0];
    createPending(selectedOne);
    deleteToDo(btn);
};

function init() {
    taskInput.addEventListener("submit", submitted);
    loadToDos();
}

init();