async function addToDo() {
    const description = document.getElementById('todo-input').value;
   let resp= await fetch('http://localhost:9999/todos/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({description})
    });
   // console.log(resp);
    loadToDos();
}

async function loadToDos() {
    try {
        const response = await fetch('http://localhost:9999/todos/get');
        const todos = await response.json();

        // Render todos in the list
        let list = document.getElementById('todo-list');
        list.innerHTML = "";

        todos.forEach(todo => {
            list.innerHTML += `
            <tr class="${todo.status ? 'comp': 'in'}">
                <td>${todo.description}</td>
                <td>
                    <input type="checkbox" onclick="markAsComplete(${todo.id})" id="${todo.id}" ${todo.status ? 'checked  disabled' : ''}  /> ${todo.status ? "Completed" : "Mark as Complete"}
                </td>
            </tr>
            `;
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}


async function markAsComplete(id) {
    await fetch(`http://localhost:9999/todos/change/${id}?status=true`, { method: 'PUT' });
    loadToDos();
}


function renderToDos(todos) {
    const list = document.getElementById('todo-list');
    list.innerHTML = ''; // Clear previous list
    todos.forEach(todo => {
      list.innerHTML+=`<tr>
    <td>${todo.description}</td>
    <td>${todo.id}</td>
    <div>Spec</div>
    </tr>`
    });
}

loadToDos()