import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent, } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
        const pageItem = new PageItemComponent();
        pageItem.attachTo(appRoot, "beforeend");
        const imgComponent = new ImageComponent("https://picsum.photos/seed/picsum/200/300", "hi img title");
        this.page.addChild(imgComponent);
        const videoComponent = new VideoComponent("https://youtu.be/K3-jG52XwuQ", "iam video");
        this.page.addChild(videoComponent);
        const noteComponent = new NoteComponent("note title", "note body");
        this.page.addChild(noteComponent);
        const todoComponent = new TodoComponent("투두", "checklist");
        this.page.addChild(todoComponent);
    }
}
new App(document.querySelector(".document"));
