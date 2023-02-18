import { BaseComponent } from "../../basecomponent.js";
export class ImageComponent extends BaseComponent {
    constructor(title, imgsrc) {
        super(`<section class="image">
          <div class="img__holder"><img class="img__thumbnail"></div>
          <h3 class="page-item__title img__title"></h3>
        </section>`);
        const imgElement = this.element.querySelector(".img__thumbnail");
        imgElement.src = imgsrc;
        imgElement.alt = title;
        const imgTitle = this.element.querySelector(".img__title");
        imgTitle.textContent = title;
    }
}
