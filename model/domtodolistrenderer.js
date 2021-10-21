export class DOMTodolistRender {

    constructor(todolist) {
        this.todolist = todolist;
        this.todoDOMList = document.querySelector( 'ul#todolist');
        this.renderTodos();
    }

    renderTodos() {
        this.#renderTodos(this.todolist.getTodos());
    }

    #renderTodos(todos) {
        this.todoDOMList.innerHTML = '';
        todos.map(todo => this.#createTodoDOMElement(todo))
            .forEach(element => this.todoDOMList.appendChild(element));
    }

    renderTodosByType(type) {
        const todos = this.todolist.getTodos().filter(todo => {
            let res = true;
            if (type !== 'all') {
                res = (type === 'completed') ? todo.completed : !todo.completed;
            }
            return res;
        })
        this.#renderTodos(todos);
    }

    #createTodoDOMElement({ id, text, completed }) {
        const element = this.#createLiElement(completed, id);
        const check = this.#createCheckElement(completed, id);
        const cross = this.#createCrossElement(id);
        const textNode = document.createTextNode(text);

        element.appendChild(check);
        element.appendChild(textNode);
        element.appendChild(cross);
        return element;
    }

    #createLiElement(completed, id) {
        const element = document.createElement('li');
        element.classList.add(this.#createSpanTodoClass(completed));
        element.id = this.#formatId(id);
        return element;
    }

    
    #createCheckElement(completed, id) {
        const check = document.createElement('span');
        check.id = 'check' + id;
        check.classList.add(this.#createSpanTodoClass(completed));
        check.addEventListener('click', e => this.todolist.toggleTodo(id, e.target));
        return check;
    }

    #createSpanTodoClass(completed) {
        return completed ? 'completed' : 'uncompleted';
    }
    
    #createCrossElement(id) {
        const cross = document.createElement('span');
        cross.classList.add('cross');
        cross.addEventListener('click', e => this.todolist.removeTodo(id));
        return cross;
    }

    #formatId(id) {
        return 'todo-' + id;
    }

    renderNewTodo({ id, text, completed }) {
        this.todoDOMList
            .appendChild(this.#createTodoDOMElement({ id, text, completed }));
    }

    removeTodo(id) {
        this.todoDOMList.removeChild(this.todoDOMList.querySelector('#' + this.#formatId(id)));
    }

    toggleTodo(id) {
        const domElement = document.querySelector('#check' + id);
        domElement.classList.toggle('completed');
        domElement.classList.toggle('uncompleted');
        domElement.parentNode.classList.toggle('completed');
    }
}
