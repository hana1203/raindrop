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
  //dependency injection
  constructor() {
    super(`<ul class='page'></ul>`); //call parent's constructor
  }
  addChild(child: Component): void {
    const pageItem = new PageItemComponent();
    pageItem.addChild(child);
    pageItem.attachTo(this.element, "beforeend");
    pageItem.setOnCloseListener(() => {
      pageItem.removeFrom(this.element);
    });
  }
}

type OnCloseListener = () => void; //아무런 인자도 받지않고 아무런것도 리턴하지않는 함수

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(`
    <li class="page-item">
    <div class="page-item__body"></div>
    <div class="page-item__controls">
        <button class="x-button">&times;</button>
      </div>
      </li>`);

    //DOM에서 제거하기
    // const xButton = this.element.querySelector(
    //   ".x-button"
    // )! as HTMLButtonElement;
    // xButton.addEventListener("click", () => {
    //   this.clickCloseBtn();
    // });

    //Ellie's solution. item 삭제
    const xButton = this.element.querySelector(
      ".x-button"
    )! as HTMLButtonElement;
    xButton.onclick = () => {
      this.closeListener && this.closeListener(); //closeListner가 null이아니라면 closeListner() 호출
    };
  }

  addChild(child: Component): void {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listner: OnCloseListener) {
    this.closeListener = listner;
  }

  // clickCloseBtn(): void {
  //   this.element.remove();
  // }
}
