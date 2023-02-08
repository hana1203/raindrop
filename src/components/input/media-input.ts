import { BaseComponent } from "../basecomponent.js";

export class MediaInputComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
        <label for="title">Title</label>
        <input type="text" class="title" />
        <label for="url">Url</label>
        <input type="text" class="url" value="" />
      </div>`);
  }

  get title(): string {
    const title = this.element.querySelector(".title")! as HTMLInputElement;
    return title.value;
  }

  get url(): string {
    const url = this.element.querySelector(".url")! as HTMLInputElement;
    return url.value;
  }
}
