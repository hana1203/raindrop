import { BaseComponent } from "../../basecomponent.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, imgsrc: string) {
    super(`<section class="image">
          <div class="image__holder"><img class="img__thumbnail"></div>
          <p class="img__title"></p>
        </section>`);

    const imgElement = this.element.querySelector(
      ".img__thumbnail"
    )! as HTMLImageElement;
    imgElement.src = imgsrc;
    imgElement.alt = title;

    const imgTitle = this.element.querySelector(
      ".img__title"
    )! as HTMLParagraphElement;
    imgTitle.textContent = title;
  }
}
