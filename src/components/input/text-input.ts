import { BaseComponent } from "../basecomponent.js";

export class TextInputComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
        <label for="title">Title</label>
        <input type="text" class="title" />
        <label for="note">Note</label>
        <textarea type="text" class="note" value=""></textarea>
      </div>`);
  }

  get title(): string {
    const title = this.element.querySelector(".title")! as HTMLInputElement;
    return title.value;
  }

  get note(): string {
    const note = this.element.querySelector(".note")! as HTMLInputElement;
    return note.value;
  }
}
