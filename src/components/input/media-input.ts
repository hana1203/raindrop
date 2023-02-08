import { BaseComponent } from "../basecomponent.js";

//decoupling을 위해 interface 만들기
export interface MediaProperty {
  readonly title: string;
  readonly url: string;
}

export class MediaInputComponent
  extends BaseComponent<HTMLElement>
  implements MediaProperty
{
  constructor() {
    super(`<div class='input__container'>
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
