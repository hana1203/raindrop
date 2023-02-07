import { Component, BaseComponent } from "../basecomponent.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnAddListener = () => void;

export class Modal extends BaseComponent<HTMLElement> implements Composable {
  private closeListener?: OnCloseListener;
  private addListener?: OnAddListener;
  constructor() {
    super(`<dialog class='modal'>
    <div class='modal__container'>
    <button class="close">&times;</button>
    <div class='modal__body'>    </div>
    <button class="add">ADD</button>
    </div>
  </dialog>`);

    //Modal클래스는 close,addListener 외부로부터 전달받아서 등록된 listener가 있다면? 등록된 리스터 호출
    const close = this.element.querySelector(".close")! as HTMLElement;
    close.addEventListener("click", () => {
      this.closeListener && this.closeListener();
    });
    //onclick 보단 addEventListner등록해서 사용하는게 좋음 - 다수의 이벤트 등록되어있으면 순서대로 모든 콜백함수가 호출
    //onclick은 기존에 다른 리스너가 등록되어있으면 덮어씌움 - 컴포넌트 안에서 한 군데에서만 등록해서 사용하면 ok
    const add = this.element.querySelector(".add")! as HTMLElement;
    add.onclick = () => this.addListener && this.addListener();
  }
  setOnCloseListener(listner: OnCloseListener) {
    this.closeListener = listner;
  }
  setOnAddListener(listner: OnCloseListener) {
    this.addListener = listner;
  }

  addChild(child: Component): void {
    //child 컴포넌트 받아서오면 body부분에 추가해주기
    const body = this.element.querySelector(".modal__body")! as HTMLElement;
    child.attachTo(body);
  }
}
