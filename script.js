import { Todolist } from './model/todolist.js';

const ENTER_KEY = 13;

const todolist = new Todolist();

document.querySelector('input#todo')
    .addEventListener('keyup', event => {
        if (event.keyCode === ENTER_KEY && event.target.value.length > 2) {
            todolist.addTodo(event.target.value);
            event.target.value = '';
        }
    });

document.querySelector('div.buttons')
    .addEventListener('click', event => {
        const button = event.target;
        if ("BUTTON" === button.tagName) {
            document.querySelectorAll('button').forEach(button => {
                button.classList.remove('active');
                button.removeAttribute('disabled');
            });
            button.classList.toggle('active');
            button.setAttribute('disabled', true);
            todolist.renderer.renderTodosByType(button.getAttribute('filter'));
        }
    });
