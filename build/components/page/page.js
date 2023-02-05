import { BaseComponent } from "../basecomponent.js";
export class PageComponent extends BaseComponent {
    constructor() {
        super(`<ul class='page'></ul>`);
    }
    addChild(child) {
        const pageItem = new PageItemComponent();
        pageItem.addChild(child);
        pageItem.attachTo(this.element, "beforeend");
        pageItem.setOnCloseListener(() => {
            pageItem.removeFrom(this.element);
        });
    }
}
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`
    <li class="page-item">
    <div class="page-item__body"></div>
    <div class="page-item__controls">
        <button class="x-button">&times;</button>
      </div>
      </li>`);
        const xButton = this.element.querySelector(".x-button");
        xButton.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }
    addChild(child) {
        const container = this.element.querySelector(".page-item__body");
        child.attachTo(container);
    }
    setOnCloseListener(listner) {
        this.closeListener = listner;
    }
}
