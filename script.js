class Todo {
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    isCompleted() {
        return this.completed;
    }
}

class Todolist {
    constructor() {
        this.todos = [];
        this.nextId = 1;
        this.todoDOMList = document.querySelector('ul#todolist');
        this.#renderTodos(this.getTodos());
    }

    renderTodosByType(type) {
        const todos = this.getTodos().filter(todo => {
            let res = true;
            if (type !== 'all') {
                res = (type === 'completed') ? todo.completed : !todo.completed;
            }
            return res;
        })
        this.#renderTodos(todos);
    }

    #renderTodos(todos) {
        this.todoDOMList.innerHTML = '';
        todos.map(todo => this.#createTodoDOMElement(todo))
            .forEach(element => this.todoDOMList.appendChild(element));
    }

    #createTodoDOMElement({ id, text, completed }) {
        const element = document.createElement('li');
        element.classList.add(completed ? 'completed' : 'uncompleted');
        element.id = this.#formatId(id);
        const check = document.createElement('span');
        check.classList.add(completed ? 'completed' : 'uncompleted');
        check.addEventListener('click', e => this.#toggleTodo(id, e.target));

        const cross = document.createElement('span');
        cross.classList.add('cross');
        cross.addEventListener('click', e => this.#removeTodo(id));

        const textNode = document.createTextNode(text);

        element.appendChild(check);
        element.appendChild(textNode);
        element.appendChild(cross);
        return element;
    }

    #formatId(id) {
        return 'todo-' + id;
    }

    getTodos() {
        return this.todos;
    }

    addTodo(text) {
        const newTodo = new Todo(this.nextId++, text);
        this.todos.push(newTodo);
        this.#renderNewTodo(newTodo);
    }

    #renderNewTodo({ id, text, completed }) {
        this.todoDOMList
            .appendChild(this.#createTodoDOMElement({ id, text, completed }));
    }

    #removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.todoDOMList.removeChild(this.todoDOMList.querySelector('#' + this.#formatId(id)));
    }

    #toggleTodo(id, domElement) {
        this.todos = this.todos.map(todo => {
            todo.completed = (todo.id === id) ? !todo.completed : todo.completed;
            return todo;
        });
        domElement.classList.toggle('completed');
        domElement.classList.toggle('uncompleted');
        domElement.parentNode.classList.toggle('completed');
    }
}


const myTodo = new Todolist();

const input = document.querySelector('input#todo');
const ENTER_KEY = 13;
input.addEventListener('keyup', event => {
    if (event.keyCode === ENTER_KEY && event.target.value.length > 2) {
        myTodo.addTodo(event.target.value);
        event.target.value = '';
    }
});

const buttons = document.querySelector('div.buttons');
buttons.addEventListener('click', event => {
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('active');
        button.removeAttribute('disabled');
    });
    const button = event.target;
    button.classList.toggle('active');
    button.setAttribute('disabled', true);
    myTodo.renderTodosByType(button.getAttribute('filter'));
});
