import { Modal } from "./components/modal/modal.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponent, PageItemComponent, } from "./components/page/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent(PageItemComponent);
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
        const imgBtn = document.body.querySelector("#new-image");
        imgBtn.addEventListener("click", () => {
            const modal = new Modal();
            modal.setOnAddListener(() => {
                modal.removeFrom(document.body);
            });
            modal.setOnCloseListener(() => {
                modal.removeFrom(document.body);
            });
            modal.attachTo(document.body);
        });
    }
}
new App(document.querySelector(".document"));
