export class ImageComponent {
    constructor(imgsrc, title) {
        this.element = document.createElement("section");
        const imgElement = document.createElement("img");
        const imgTitle = document.createElement("p");
        this.element.appendChild(imgElement);
        this.element.appendChild(imgTitle);
        imgElement.src = imgsrc;
        imgElement.alt = title;
        imgTitle.textContent = title;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
}
