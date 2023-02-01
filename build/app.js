import { ImageComponentRefactor } from "./components/page/item/imageRefactor.js";
import { PageComponentRefactor } from "./components/page/pageRefactor.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponentRefactor();
        this.page.attachTo(appRoot);
        const imgComponent = new ImageComponentRefactor("https://picsum.photos/seed/picsum/200/300", "hi img title");
        imgComponent.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".document"));
