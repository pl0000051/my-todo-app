document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const prioritySelect = document.getElementById('priority-select');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `priority-${task.priority}`;
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <small>Priority: ${task.priority}</small>
                    <button onclick="removeTask(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    window.removeTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        const priority = prioritySelect.value;
        if (text) {
            tasks.push({ text, priority });
            saveTasks();
            renderTasks();
            input.value = '';
        }
    });

    renderTasks();
});
