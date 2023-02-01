export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected element: T; //protected로 상속하는 자식클래스에서만 element변수 접근가능

  //사용자가 어떤 컨텐츠 넣을건지 전달하도록
  constructor(htmlContents: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlContents;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
