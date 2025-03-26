// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here

const lista = document.querySelector("ul");

for (let item of todoList) {

  const newLabel = document.createElement("label");
  newLabel.htmlFor = 'todo-' + item.id;
  newLabel.textContent = item.task;

  const newInput = document.createElement("input");
  newInput.type = 'checkbox';
  newInput.id = 'todo-' + item.id;
  if (item.completed) {
    newInput.checked = 'checked';
  }

  const newLi = document.createElement("li");

  newLi.appendChild(newInput);
  newLi.appendChild(newLabel);

  lista.appendChild(newLi);

}

