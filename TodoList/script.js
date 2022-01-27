// 階段一
// 初始變數
const listArea = document.querySelector("#list-area");
const list = document.querySelector("#my-todo");
const doneList = document.querySelector("#done-list");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  if (!text.length) return
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  list.appendChild(newItem);
}

function addDoneItem(text) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="done" class="checked">${text}</label>
    <i class="delete fa fa-trash"></i>
  `;
  doneList.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value.trim()
  addItem(inputValue);
  // 功能1：透過trim()防止產生空白 todo。
});
// 功能2：當使用者在 input#newTodo 裡按下 Enter 鍵時，可以新增 to-do。
input.addEventListener("keypress", function (event) {
  const inputValue = input.value.trim()

  if (event.key === "Enter") {
    addItem(inputValue);
  }
});

// Delete and check
// 功能3：當使用者點擊完成的 todo 時，該項目會被送進 Done 清單；同時，​Done 清單中的項目也要能夠被刪除
listArea.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;

  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (target.tagName === "LABEL") {
    if (!target.classList.contains("checked")) {
      addDoneItem(target.innerText)
      parentElement.remove()
    }
  }
});

