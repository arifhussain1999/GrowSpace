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
            <tr>
                <td>${todo.description}</td>
                <td>
                    <input type="checkbox" onclick="markAsComplete(${todo.id})" id="${todo.id}" ${todo.status ? 'checked' : ''}/>
                </td>
            </tr>
            `;
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}