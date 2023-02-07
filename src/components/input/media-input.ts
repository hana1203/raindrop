import { BaseComponent } from "../basecomponent.js";

export class MediaInputComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
        <label for="title">TITLE</label>
        <input type="text" class="title" />
        <label for="note">URL</label>
        <input type="text" class="note" value="" />
      </div>`);
  }
  //modal body에 있는 내용 pageItem으로 붙이기
  get title(): string {
    const title = this.element.querySelector(".title")! as HTMLInputElement;
    return title.value;
  }

  get note(): string {
    const note = this.element.querySelector(".note")! as HTMLInputElement;
    return note.value;
  }
}
