const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = JSON.parse(localStorage.getItem('todos')) || []; // Завантаження даних із Local Storage

// Оновлення лічильників
function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.completed).length;
}

// Відображення окремої справи
function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.completed ? 'checked' : ''} onChange="checkTodo(${todo.id})"/>
      <label for="${todo.id}">
        <span class="${todo.completed ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

// Відображення списку справ
function render() {
  list.innerHTML = todos.map(renderTodo).join('');
  updateCounter();
}

// Додавання нової справи
function newTodo() {
  const text = prompt('Введіть нову задачу:');
  if (text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(todo);
    saveTodos();
    render();
  }
}

// Видалення справи
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
}

// Відмітка про виконання справи
function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

// Збереження справ у Local Storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Початкове відображення
render();
