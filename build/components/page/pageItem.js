import { BaseComponent } from "../basecomponent.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<div class="page-item">
        <button class="x-button">x</button>
      </div>`);
    }
    addChild(child) {
        const container = this.element.querySelector(".page-item");
        child.attachTo(container);
    }
}
