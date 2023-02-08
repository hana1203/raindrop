import { BaseComponent } from "../../basecomponent.js";

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(`<section class="note">
        <h3 class="page-item__title note__title"></h3>
        <p class="note__body"></p>
      </section>`);

    const noteTitle = this.element.querySelector(
      ".note__title"
    )! as HTMLHeadingElement;
    noteTitle.textContent = title;
    const noteBody = this.element.querySelector(
      ".note__body"
    )! as HTMLParagraphElement;
    noteBody.textContent = body;
  }
}
