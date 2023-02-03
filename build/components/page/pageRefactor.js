import { BaseComponent } from "../basecomponent.js";
import { PageItemComponent } from "./item/pageItem.js";
export class PageComponentRefactor extends BaseComponent {
    constructor() {
        super(`<ul class='page'></ul>`);
    }
    addChild(child) {
        const pageItem = new PageItemComponent();
        pageItem.addChild(child);
        pageItem.attachTo(this.element);
    }
}
