import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js"; //import시 확장명 작성

class App {
  private readonly page: PageComponent;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);
    const imgComponent = new ImageComponent(
      "https://picsum.photos/seed/picsum/200/300",
      "hi img title"
    );
    imgComponent.attachTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement);
//querySelector는 기본적으로 element | null 리턴함
//동적으로 만드는게 아니라 document 클래스에 붙이는것이므로 type assertion 사용ok - null아니고 html element 타입이야
