import { BaseComponent } from "../basecomponent.js";
export class Modal extends BaseComponent {
    constructor() {
        super(`<dialog class='modal'>
    <div class='modal__container'>
    <button class="modal__close">&times;</button>
    <div class='modal__body'>    </div>
    <button class="modal__add">ADD</button>
    </div>
  </dialog>`);
        const close = this.element.querySelector(".modal__close");
        close.addEventListener("click", () => {
            this.closeListener && this.closeListener();
        });
        const add = this.element.querySelector(".modal__add");
        add.onclick = () => this.addListener && this.addListener();
    }
    setOnCloseListener(listner) {
        this.closeListener = listner;
    }
    setOnAddListener(listner) {
        this.addListener = listner;
    }
    addChild(child) {
        const body = this.element.querySelector(".modal__body");
        child.attachTo(body);
    }
}
