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

const position = document.getElementById('position');

// Tästä funktio, käytetään uudelleen koodia addItemissä

function lisaa(item) {
  const i = item.completed ? 'checked' : '';
  position.insertAdjacentHTML(
    'beforeend',
    '<li id=' +
      item.id +
      "><input type='checkbox' id='todo-" +
      item.id +
      "' " +
      i +
      '>' +
      "<label for='todo-" +
      item.id +
      "'>" +
      item.task +
      '</label><button type="submit" class="deleteButton">X</button></li>'
  );
}

// Display arrayssa olevat

for (let item of todoList) {
  lisaa(item);
}

// Käyttäjä checkkaa itemin, päivitä todo array completed: true tai false

function updateCompleted(id) {
  const checkbox = document.getElementById(id);
  if (!checkbox) return;

  for (let item of todoList) {
    if (id === 'todo-' + item.id) {
      item.completed = checkbox.checked;
    }
  }
}

// Kaikki checkboxit, kun muuttuu arvo päivitetään array item

position.addEventListener('change', e => {
  if (e.target.type === 'checkbox') {
    const checkbox = e.target;
    console.log(
      checkbox.checked ? `Checked ${checkbox.id}` : `Unchecked ${checkbox.id}`
    );
    // päivittää arrayn funktiolla
    updateCompleted(checkbox.id);
    console.log(todoList);
  }
});

// Jokaiselle itemille delete nappi, poistaa itemin
// poistaa myös arraysta
// käytä removeChild
// log consoleen muutosten tullessa

position.addEventListener('click', e => {
  // deletebutton luokka luodaan dynaamisesti "lisaa" funktiossa
  if (e.target.classList.contains('deleteButton')) {
    const listItem = e.target.parentNode;
    // li:lle lisäsin id:n myös "lisaa" funktiossa
    console.log(listItem.id);
    const list = listItem.parentNode;

    // poistetaan arraysta
    for (let item of todoList) {
      if (listItem.id == item.id) {
        const index = todoList.indexOf(item);
        if (index > -1) {
          todoList.splice(index, 1);
        }
      }
    }

    // poistetaan html listasta
    list.removeChild(listItem);
    console.log(todoList);
  }
});

// paina nappia -> avaa ikkuna itemin lisäykselle
// Form jossa kenttä nimelle ja save nappi
// Save nappia painetaan -> lisää arrayihin, completed false
// log muutokset

const dialog = document.querySelector('dialog');

const btn = document.querySelector('button[class=add-btn]');

const uusiItem = document.querySelector('input[type=text]');

// muutin type submitista buttoniksi, voisi myös tehdä preventdefault
const addItem = document.querySelector('button[type=button]');

btn.addEventListener('click', () => {
  console.log('AVATTU');
  dialog.showModal();
});

addItem.addEventListener('click', () => {
  console.log('ADDED');
  let newId = todoList[todoList.length - 1].id + 1;
  // lisää arrayihin
  todoList.push({
    id: newId,
    task: uusiItem.value,
    completed: false,
  });

  // lisää html
  lisaa(todoList.find(x => x.id == newId));

  dialog.close();
  console.log(todoList);
});
