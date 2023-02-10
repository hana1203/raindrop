import { BaseComponent, Component } from "../basecomponent.js";

//PageComponent, PageItemComponent에 공통으로있는 addChild() 메서드 인터페이스로 규격
//Composable 조립하고 묶을수있는
export interface Composable {
  addChild(child: Component): void;
}

type ItemContainerConstructor = {
  new (): ItemContainer; //생성자 타입 정의
};

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private dropTarget?: ItemContainer;
  private dragTarget?: ItemContainer;
  private children = new Set<ItemContainer>(); //Set이 배열보다 검색속도 빠름

  //dependency injection
  constructor(private pageItemConstructor: ItemContainerConstructor) {
    super(`<ul class='page'></ul>`); //call parent's constructor
    this.element.addEventListener("dragover", (e) => this.onDragOver(e));
    this.element.addEventListener("dragenter", (e) => this.onDrop(e));
  }
  addChild(child: Component): void {
    // const pageItem = new PageItemComponent();
    const pageItem = new this.pageItemConstructor();
    pageItem.addChild(child);
    pageItem.attachTo(this.element, "beforeend");
    pageItem.setOnCloseListener(() => {
      pageItem.removeFrom(this.element);
      this.children.delete(pageItem);
    });
    this.children.add(pageItem);
    pageItem.setOnDragStateListner(
      (target: ItemContainer, state: DragState) => {
        // console.log(target, state);
        switch (state) {
          case "start":
            this.dragTarget = target;
            //drag시작되면 모든 포인터 mute
            this.updateSections("mute");
            break;
          case "end":
            this.dragTarget = undefined; //드래그끝나면 drag되고있는 타겟없으므로 undefind할당
            this.updateSections("unmute");
            break;
          case "enter":
            console.log("무슨타겟enter", target);

            this.dropTarget = target;
            break;
          case "leave":
            console.log("무슨타겟leave", target);
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`unsupported state: ${state}`);
        }
      }
    );
  }

  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: ItemContainer) => {
      section.muteChildren(state);
    });
  }

  onDragOver(event: DragEvent) {
    console.log("ondragover", event);
  }
  onDrop(event: DragEvent) {
    console.log("ondrop", event);
    //위치 바꿔주기

    if (!this.dropTarget) {
      return; //dropTarget이 undefined이면 처리할 로직없음
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      //똑같은 아이템을 drag drop 못하니까 조건추가
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, "beforebegin");
    }
  }
}

type OnCloseListener = () => void; //아무런 인자도 받지않고 아무런것도 리턴하지않는 함수
type OnDragStateListner<T extends Component> = (
  target: T,
  state: DragState
) => void;
//왜 target을 T제네릭 타입으로 받을까? type이 안전하고 보존되는

type DragState = "start" | "end" | "enter" | "leave";
//drag하는 아이템기준 start, end //drag하면서 overlay되는 아이템 기준 enter, leave

interface ItemContainer extends Component, Composable {
  setOnCloseListener(listner: OnCloseListener): void;
  setOnDragStateListner(listener: OnDragStateListner<PageItemComponent>): void;
  //pageComponent에서 pageItem 컴포넌트 더할때, 페이지아이템 컴포넌트 자체를 받아와서 사용하는게 아니라 어떤 페이지 컴포넌트도 받아올 수있으므로 인터페이스에 정의해두기
  muteChildren(state: "mute" | "unmute"): void;
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements ItemContainer
{
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListner<PageItemComponent>;

  constructor() {
    super(`
    <li class="page-item" draggable='true'>
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

    //pageItem constructor 자체에서 drag event 사용
    this.element.addEventListener("dragstart", (e) => this.onDragStart(e));
    this.element.addEventListener("dragend", (e) => this.onDragEnd(e));
    this.element.addEventListener("dragenter", (e) => this.onDragEnter(e));
    this.element.addEventListener("dragleave", (e) => this.onDragLeave(e));
  }

  onDragStart(_: DragEvent) {
    //event 인자 받지않는다면 param 아예 없애도 됨
    this.notifyDragObservers("start");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("end");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }

  //등록된 콜백함수 있으면 호출
  //한번에 수정사항 반영할수 있게 함수로 만들기
  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state); //target은 나 자신 컴포넌트, state 전달
  }

  //drag이벤트가 발생하면 나한테 알려줘하고 콜백함수 등록
  setOnDragStateListner(listener: OnDragStateListner<PageItemComponent>) {
    this.dragStateListener = listener;
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

  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }

  // clickCloseBtn(): void {
  //   this.element.remove();
  // }
}
