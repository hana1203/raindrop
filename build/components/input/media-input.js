import { BaseComponent } from "../basecomponent.js";
export class MediaInputComponent extends BaseComponent {
    constructor() {
        super(`<div class='input__container'>
        <label for="title">Title</label>
        <input type="text" class="title" />
        <label for="url">Url</label>
        <input type="text" class="url" value="" />
      </div>`);
    }
    get title() {
        const title = this.element.querySelector(".title");
        return title.value;
    }
    get url() {
        const url = this.element.querySelector(".url");
        return url.value;
    }
}
