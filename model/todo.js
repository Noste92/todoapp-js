export class Todo {
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
