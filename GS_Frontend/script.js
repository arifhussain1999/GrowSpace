async function addToDo() {
    const description = document.getElementById('todo-input').value;
    await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
    });
    loadToDos();
}

async function loadToDos() {
    const response = await fetch('/todos');
    const todos = await response.json();
    // Render todos in the list
}

async function markAsComplete(id) {
    await fetch(`/todos/${id}?status=true`, { method: 'PUT' });
    loadToDos();
}


function renderToDos(todos) {
    const list = document.getElementById('todo-list');
    list.innerHTML = ''; // Clear previous list
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${todo.description}</span>
                             <input type="checkbox" onchange="markAsComplete(${todo.id})" ${todo.status ? 'checked' : ''} />`;
        list.appendChild(listItem);
    });
}
