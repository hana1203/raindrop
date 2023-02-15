import { BaseComponent } from "../basecomponent.js";
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super(`<ul class='page'></ul>`);
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
        this.element.addEventListener("dragover", (e) => this.onDragOver(e));
        this.element.addEventListener("dragenter", (e) => this.onDrop(e));
    }
    addChild(child) {
        const pageItem = new this.pageItemConstructor();
        pageItem.addChild(child);
        pageItem.attachTo(this.element, "beforeend");
        pageItem.setOnCloseListener(() => {
            pageItem.removeFrom(this.element);
            this.children.delete(pageItem);
            console.log("디스칠드런", this.children);
        });
        this.children.add(pageItem);
        console.log("디스칠드런", this.children);
        pageItem.setOnDragStateListner((target, state) => {
            switch (state) {
                case "start":
                    this.dragTarget = target;
                    this.updateSections("mute");
                    break;
                case "end":
                    this.dragTarget = undefined;
                    this.updateSections("unmute");
                    break;
                case "enter":
                    console.log("타겟enter", target);
                    this.dropTarget = target;
                    break;
                case "leave":
                    console.log("타겟leave", target);
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`unsupported state: ${state}`);
            }
        });
    }
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
    onDragOver(event) {
        event.preventDefault();
        console.log("ondragover", event);
    }
    onDrop(event) {
        event.preventDefault();
        console.log("ondrop", event);
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = event.clientY;
            const dragElRect = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY > dragElRect.y ? "afterend" : "beforebegin");
        }
        this.dropTarget.onDropped();
    }
}
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`
    <li class="page-item" draggable='true'>
    <div class="page-item__body"></div>
    <div class="page-item__controls">
        <button class="x-button">&times;</button>
      </div>
      </li>`);
        const xButton = this.element.querySelector(".x-button");
        xButton.onclick = () => {
            this.closeListener && this.closeListener();
        };
        this.element.addEventListener("dragstart", (e) => this.onDragStart(e));
        this.element.addEventListener("dragend", (e) => this.onDragEnd(e));
        this.element.addEventListener("dragenter", (e) => this.onDragEnter(e));
        this.element.addEventListener("dragleave", (e) => this.onDragLeave(e));
    }
    onDragStart(_) {
        this.notifyDragObservers("start");
        this.element.classList.add("lifted");
    }
    onDragEnd(_) {
        this.notifyDragObservers("end");
        this.element.classList.remove("lifted");
    }
    onDragEnter(_) {
        this.notifyDragObservers("enter");
        this.element.classList.add("drop-area");
    }
    onDragLeave(_) {
        this.notifyDragObservers("leave");
        this.element.classList.remove("drop-area");
    }
    onDropped() {
        this.element.classList.remove("drop-area");
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    setOnDragStateListner(listener) {
        this.dragStateListener = listener;
    }
    addChild(child) {
        const container = this.element.querySelector(".page-item__body");
        child.attachTo(container);
    }
    setOnCloseListener(listner) {
        this.closeListener = listner;
    }
    muteChildren(state) {
        if (state === "mute") {
            this.element.classList.add("mute-children");
        }
        else {
            this.element.classList.remove("mute-children");
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
}
