import { Component } from "./components/basecomponent.js";
import {
  MediaInputComponent,
  MediaProperty,
} from "./components/input/media-input.js";
import {
  TextInputComponent,
  TextProperty,
} from "./components/input/text-input.js";
import { Modal } from "./components/modal/modal.js";
import { ImageComponent } from "./components/page/item/image.js";
import { VideoComponent } from "./components/page/item/video.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";

import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js"; //import시 확장명 작성

type InputComponentConstructor<
  T extends (MediaProperty | TextProperty) & Component
> = {
  new (): T;
};

class App {
  //private readonly page: PageComponent;
  private readonly page: Component & Composable; //page변수가 Page컴포넌트인지 아닌지는 잘 모름 - PageComponent라고 커플링하기보다
  private modalRoot: HTMLElement; //bindElementToModal 함수 만들면서 modalRoot는 클래스안의 멤버변수로 만들어주기

  constructor(appRoot: HTMLElement, modalRoot: HTMLElement) {
    this.modalRoot = modalRoot;
    // this.page = new PageComponent();
    this.page = new PageComponent(PageItemComponent); //dependency injection이후
    this.page.attachTo(appRoot);

    //page에 직접 추가하기
    // //pageitem 띄워보기
    // const pageItem = new PageItemComponent();
    // pageItem.attachTo(appRoot, "beforeend");

    // const imgComponent = new ImageComponent(
    //   "https://picsum.photos/seed/picsum/200/300",
    //   "hi img title"
    // );
    // // imgComponent.attachTo(appRoot, "beforeend");
    // this.page.addChild(imgComponent);

    // const videoComponent = new VideoComponent(
    //   // "https://www.youtube.com/embed/K3-jG52XwuQ",
    //   "https://youtu.be/K3-jG52XwuQ",
    //   "iam video"
    // );
    // // videoComponent.attachTo(appRoot, "beforeend");
    // this.page.addChild(videoComponent);

    // const noteComponent = new NoteComponent("note title", "note body");
    // // noteComponent.attachTo(appRoot, "beforeend");
    // this.page.addChild(noteComponent);

    // const todoComponent = new TodoComponent("투두", "checklist");
    // // todoComponent.attachTo(appRoot, "beforeend");
    // this.page.addChild(todoComponent);

    //modal띄우고 내용 pageItem에 추가하기
    // const imgBtn = document.body.querySelector(
    //   "#new-image"
    // )! as HTMLButtonElement;
    // imgBtn.addEventListener("click", () => {
    //   const modal = new Modal();
    //   const mediaInput = new MediaInputComponent();
    //   modal.addChild(mediaInput);
    //   modal.attachTo(modalRoot);

    //   modal.setOnAddListener(() => {
    //     modal.removeFrom(modalRoot);
    //     this.page.addChild(
    //       new ImageComponent(mediaInput.title, mediaInput.url)
    //     );
    //   });
    //   modal.setOnCloseListener(() => {
    //     modal.removeFrom(modalRoot);
    //   });
    // });

    //refactoring
    this.bindElementToModal(
      "#new-todo",
      TextInputComponent,
      (input: TextInputComponent) => new TodoComponent(input.title, input.note)
    );

    this.bindElementToModal(
      "#new-note",
      TextInputComponent,
      (input: TextInputComponent) => new NoteComponent(input.title, input.note)
    );
    this.bindElementToModal(
      "#new-image",
      MediaInputComponent,
      (input: MediaInputComponent) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToModal(
      "#new-video",
      MediaInputComponent,
      (input: MediaInputComponent) => new VideoComponent(input.title, input.url)
    );
  }

  //Media, Text 말고도 다른 input 컴포넌트 만들 수 있어서 커플링 하지않고 interface 로 구현
  private bindElementToModal<
    T extends (MediaProperty | TextProperty) & Component
  >(
    selector: string,
    inputComponentConstructor: InputComponentConstructor<T>,
    makeInputComponent: (input: T) => Component
  ) {
    const selectedElement = document.body.querySelector(
      selector
    )! as HTMLButtonElement;

    selectedElement.addEventListener("click", () => {
      const modal = new Modal();
      // const mediaInput = new MediaInputComponent();
      const inputComponent = new inputComponentConstructor(); //refactor: 각 타입컴포넌트를 내부에서 결정해서 생성하는게 아니고, constructor 타입 전달

      modal.addChild(inputComponent);
      modal.attachTo(this.modalRoot);

      modal.setOnAddListener(() => {
        modal.removeFrom(this.modalRoot);
        const el = makeInputComponent(inputComponent);
        this.page.addChild(el);
      });

      modal.setOnCloseListener(() => {
        modal.removeFrom(this.modalRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
//querySelector는 기본적으로 element | null 리턴함
//동적으로 만드는게 아니라 document 클래스에 붙이는것이므로 type assertion 사용ok - null아니고 html element 타입이야
