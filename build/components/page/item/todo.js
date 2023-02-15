import { BaseComponent } from "../../basecomponent.js";
export class TodoComponent extends BaseComponent {
    constructor(title, todo) {
        super(`<section class="todo">
    <h3 class="page-item__title todo__title"></h3>
    <input class="todo__input" type="checkbox">
    <label for="checkbox" class="todo-label"></label>
      </section>`);
        const todoTitle = this.element.querySelector(".todo__title");
        todoTitle.textContent = title;
        const todoInput = this.element.querySelector(".todo__input");
        todoInput.insertAdjacentText("afterend", todo);
    }
}
