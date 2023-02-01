import { ImageComponent } from "./components/page/item/image.js";
import { PageComponent } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const imgComponent = new ImageComponent("https://picsum.photos/seed/picsum/200/300", "hi img title");
        imgComponent.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".document"));
