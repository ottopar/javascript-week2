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

const position = document.getElementById("position");

// Ei ehkä paras tapa tehdä näin, mutta toimii

for (let item of todoList) {
  if (item.completed) {
    i = 'checked';
  } else {i = 'unchecked'}
  position.insertAdjacentHTML("beforeend",
    "<li><input type='checkbox' id='todo-" + item.id + "' " + i + ">"
    + "<label for='todo-" + item.id + "'>" + item.task + "</label></li>"
  )
}

