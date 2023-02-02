// import { ImageComponent } from "./components/page/item/image.js";
import { ImageComponentRefactor } from "./components/page/item/imageRefactor.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
// import { PageComponent } from "./components/page/page.js"; //import시 확장명 작성
import { PageComponentRefactor } from "./components/page/pageRefactor.js";

class App {
  // private readonly page: PageComponent;
  private readonly page: PageComponentRefactor; //refactor이후

  constructor(appRoot: HTMLElement) {
    // this.page = new PageComponent();
    // this.page.attachTo(appRoot);
    // const imgComponent = new ImageComponent(
    //   "https://picsum.photos/seed/picsum/200/300",
    //   "hi img title"
    // );
    // imgComponent.attachTo(appRoot, "beforeend");

    //refactor
    this.page = new PageComponentRefactor();
    this.page.attachTo(appRoot);
    const imgComponent = new ImageComponentRefactor(
      "https://picsum.photos/seed/picsum/200/300",
      "hi img title"
    );
    imgComponent.attachTo(appRoot, "beforeend");

    const videoComponent = new VideoComponent(
      // "https://www.youtube.com/embed/K3-jG52XwuQ",
      "https://youtu.be/K3-jG52XwuQ",
      "iam video"
    );
    videoComponent.attachTo(appRoot, "beforeend");

    const noteComponent = new NoteComponent("note title", "note body");
    noteComponent.attachTo(appRoot, "beforeend");

    const todoComponent = new TodoComponent("투두", "checklist");
    todoComponent.attachTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
//querySelector는 기본적으로 element | null 리턴함
//동적으로 만드는게 아니라 document 클래스에 붙이는것이므로 type assertion 사용ok - null아니고 html element 타입이야
