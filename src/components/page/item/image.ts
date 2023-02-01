export class ImageComponent {
  //my previous code
  private element: HTMLElement;
  constructor(imgsrc: string, title: string) {
    // this.element = document.createElement("section");
    // const imgElement = document.createElement("img");
    // const imgTitle = document.createElement("p");
    // this.element.appendChild(imgElement);
    // this.element.appendChild(imgTitle);

    // imgElement.src = imgsrc;
    // imgElement.alt = title;
    // imgTitle.textContent = title;

    //more simple way - use template tag
    //template tag: holding html not to be rendered immediately when a page is loaded
    const template = document.createElement("template");
    template.innerHTML = `<section class="image">
      <div class="image__holder"><img class="img__thumbnail"></div>
      <p class="img__title"></p>
    </section>`;
    //user에게 전달받은 내용을 innerHTML로 설정하는건 위험
    this.element = template.content.firstElementChild! as HTMLElement;

    const imgElement = this.element.querySelector(
      ".img__thumbnail"
    )! as HTMLImageElement;
    imgElement.src = imgsrc;
    imgElement.alt = title;

    const imgTitle = this.element.querySelector(
      ".img__title"
    )! as HTMLParagraphElement;
    imgTitle.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
