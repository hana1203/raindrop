export class ImageComponent {
    constructor(imgsrc, title) {
        const template = document.createElement("template");
        template.innerHTML = `<section class="image">
      <div class="image__holder"><img class="img__thumbnail"></div>
      <p class="img__title"></p>
    </section>`;
        this.element = template.content.firstElementChild;
        const imgElement = this.element.querySelector(".img__thumbnail");
        imgElement.src = imgsrc;
        imgElement.alt = title;
        const imgTitle = this.element.querySelector(".img__title");
        imgTitle.textContent = title;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
}
