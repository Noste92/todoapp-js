import { Todo } from './todo.js';
import { DOMTodolistRender } from './domtodolistrenderer.js';

export class Todolist {
    constructor() {
        this.todos = this.loadTodosFromLocalStorage();
        this.nextId = this.loadNextIdFromCache();
        this.renderer = new DOMTodolistRender(this);
    }

    getTodos() {
        return this.todos;
    }

    loadNextIdFromCache() {
        const nextId = localStorage.getItem('nextId');
        return (nextId) ? +nextId : 1;
    }

    loadTodosFromLocalStorage() {
        const localTodos = localStorage.getItem('todos');
        if (localTodos) {
            const todos = JSON.parse(localTodos);
            return (todos) ? todos : [];
        }
        return [];
    }

    saveTodosToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    saveNextIdToLocalStorage() {
        localStorage.setItem('nextId', this.nextId);
    }

    addTodo(text) {
        const newTodo = new Todo(this.nextId++, text);
        this.todos.push(newTodo);
        this.renderer.renderNewTodo(newTodo);
        this.saveTodosToLocalStorage();
        this.saveNextIdToLocalStorage();
    }

    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodosToLocalStorage();
        this.renderer.removeTodo(id);
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo => {
            todo.completed = (todo.id === id) ? !todo.completed : todo.completed;
            return todo;
        });
        this.saveTodosToLocalStorage();
        this.renderer.toggleTodo(id);
    }

}