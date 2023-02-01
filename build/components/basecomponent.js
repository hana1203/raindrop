export class BaseComponent {
    constructor(htmlContents) {
        const template = document.createElement("template");
        template.innerHTML = htmlContents;
        this.element = template.content.firstElementChild;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
}
