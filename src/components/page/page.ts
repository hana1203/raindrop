import { BaseComponent, Component } from "../basecomponent.js";

//PageComponent, PageItemComponent에 공통으로있는 addChild() 메서드 인터페이스로 규격
//Composable 조립하고 묶을수있는
export interface Composable {
  addChild(child: Component): void;
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class='page'></ul>`); //call parent's constructor
  }

  addChild(child: Component): void {
    const pageItem = new PageItemComponent();
    pageItem.addChild(child);
    pageItem.attachTo(this.element, "beforeend");
  }
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(`
    <li class="page-item">
    <div class="page-item__body"></div>
    <div class="page-item__controls">
        <button class="x-button">&times;</button>
      </div>
      </li>`);
  }

  addChild(child: Component): void {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }
}
