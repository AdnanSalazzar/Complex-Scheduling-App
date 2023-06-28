const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");

const addToDo = function (e) {
  e.preventDefault();

  ///making the list------------------------------------
  /* 
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
 */

  //-------------------------------------------- Their way

  const inputvalue = todoInput.value;

  if (!inputvalue) return;

  //ADDING TO LOCAL STORAGE
  saveLocalTodos(inputvalue);

  const markup = genrateMarkup(inputvalue);
  todoInput.value = "";
  todoList.insertAdjacentHTML("afterbegin", markup);
  todoInput.value = "";

  
  filterOption.addEventListener("change", filterTodo);
};

const genrateMarkup = function (value) {
  return `
            <div class="todo">
                    <li class="todo-item">${value}</li>

                    <button class="complete-btn">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="trash-btn">
                        <i class="fas fa-trash"></i>
                    </button>
            </div>
    `;
};

const filterTodo = function (e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todos) => {
    const markup = genrateMarkup(todos);
    todoList.insertAdjacentHTML("afterbegin", markup);

    /* 
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv); 
*/
  });
}

const deleteCheck = function (e) {
  const item = e.target;
  console.log(item);

  if (item.classList[0] === "trash-btn") {
    const todo = item.closest(".todo");
    todo.classList.add("slide");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => todo.remove());
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.closest(".todo");
    todo.classList.toggle("completed");
  }
};

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); /// getting the todos item from local data and placing in todos
  }
  // console.log(todos);

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    
  });

}

const init = function () {
  document.addEventListener("DOMContentLoaded", getLocalTodos);
  todoButton.addEventListener("click", addToDo);
  todoList.addEventListener("click", deleteCheck);
  
  filterOption.addEventListener("change", filterTodo);
  
};

init();
console.log(filterOption);
