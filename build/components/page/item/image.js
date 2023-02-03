import { BaseComponent } from "../../basecomponent.js";
export class ImageComponent extends BaseComponent {
    constructor(imgsrc, title) {
        super(`<section class="image">
          <div class="image__holder"><img class="img__thumbnail"></div>
          <p class="img__title"></p>
        </section>`);
        const imgElement = this.element.querySelector(".img__thumbnail");
        imgElement.src = imgsrc;
        imgElement.alt = title;
        const imgTitle = this.element.querySelector(".img__title");
        imgTitle.textContent = title;
    }
}
