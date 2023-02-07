import { Component } from "./components/basecomponent.js";
import { MediaInputComponent } from "./components/input/media-input.js";
import { Modal } from "./components/modal/modal.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
// import { TodoComponent } from "./components/page/item/todo.js";
// import { VideoComponent } from "./components/page/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js"; //import시 확장명 작성

class App {
  // private readonly page: PageComponent;
  private readonly page: Component & Composable; //page변수가 Page컴포넌트인지 아닌지는 잘 모름 - PageComponent라고 커플링하기보다
  constructor(appRoot: HTMLElement, modalRoot: HTMLElement) {
    // this.page = new PageComponent();
    this.page = new PageComponent(PageItemComponent); //dependency injection이후
    this.page.attachTo(appRoot);

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

    //modal
    const imgBtn = document.body.querySelector(
      "#new-image"
    )! as HTMLButtonElement;
    imgBtn.addEventListener("click", () => {
      const modal = new Modal();
      const mediaInput = new MediaInputComponent();
      modal.addChild(mediaInput);
      modal.attachTo(modalRoot);

      modal.setOnAddListener(() => {
        modal.removeFrom(modalRoot);
        this.page.addChild(
          new ImageComponent(mediaInput.title, mediaInput.note)
        );
      });
      modal.setOnCloseListener(() => {
        modal.removeFrom(modalRoot);
      });
    });

    const noteBtn = document.body.querySelector(
      "#new-note"
    )! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const modal = new Modal();
      const inputComponent = new MediaInputComponent();
      modal.addChild(inputComponent);
      modal.attachTo(modalRoot);

      modal.setOnAddListener(() => {
        modal.removeFrom(modalRoot);
        this.page.addChild(
          new NoteComponent(inputComponent.title, inputComponent.note)
        );
      });
      modal.setOnCloseListener(() => {
        modal.removeFrom(modalRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
//querySelector는 기본적으로 element | null 리턴함
//동적으로 만드는게 아니라 document 클래스에 붙이는것이므로 type assertion 사용ok - null아니고 html element 타입이야
