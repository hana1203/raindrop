import { BaseComponent } from "../../basecomponent.js";
export class TodoComponent extends BaseComponent {
    constructor(title, todo) {
        super(`<section class="todo">
    <h3 class="todo__title"></h3>
    <input class="todo__input" type="checkbox">
      </section>`);
        const todoTitle = this.element.querySelector(".todo__title");
        todoTitle.textContent = title;
        const todoInput = this.element.querySelector(".todo__input");
        todoInput.insertAdjacentText("afterend", todo);
    }
}
