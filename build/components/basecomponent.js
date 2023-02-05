export class BaseComponent {
    constructor(htmlContents) {
        const template = document.createElement("template");
        template.innerHTML = htmlContents;
        this.element = template.content.firstElementChild;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
    removeFrom(parent) {
        if (parent !== this.element.parentElement) {
            throw new Error("parent mismatched");
        }
        parent.removeChild(this.element);
    }
}
