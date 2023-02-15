import { BaseComponent } from "../basecomponent.js";
export class TextInputComponent extends BaseComponent {
    constructor() {
        super(`<div class='input__container'>
        <label for="title">Title</label>
        <input type="text" class="title" />
        <label for="note">Note</label>
        <textarea type="text" class="note" value=""></textarea>
      </div>`);
    }
    get title() {
        const title = this.element.querySelector(".title");
        return title.value;
    }
    get note() {
        const note = this.element.querySelector(".note");
        return note.value;
    }
}
