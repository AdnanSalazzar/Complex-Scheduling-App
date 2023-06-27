const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//document.addEventListener("DOMContentLoaded" , getLocalTodos);

const addToDo = function (e) {
  e.preventDefault();

  ///making the list------------------------------------

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  console.log(todoDiv);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  console.log(todoDiv);


  //-------------------------------------------- Their way

  const markup = genrateMarkup(todoInput.value);
  todoInput.value = "";
  todoList.insertAdjacentHTML("afterbegin", markup);

  
  todoInput.value = "";
};

const genrateMarkup = function (value) {
  return `
            <div class="todo">
                <li class="todo-item">
                    ${value}
                </li>
            </div>
    `;
};

todoButton.addEventListener("click", addToDo);
