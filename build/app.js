import { ImageComponentRefactor } from "./components/page/item/imageRefactor.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { PageComponentRefactor } from "./components/page/pageRefactor.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponentRefactor();
        this.page.attachTo(appRoot);
        const imgComponent = new ImageComponentRefactor("https://picsum.photos/seed/picsum/200/300", "hi img title");
        imgComponent.attachTo(appRoot, "beforeend");
        const videoComponent = new VideoComponent("https://youtu.be/K3-jG52XwuQ", "iam video");
        videoComponent.attachTo(appRoot, "beforeend");
        const noteComponent = new NoteComponent("note title", "note body");
        noteComponent.attachTo(appRoot, "beforeend");
        const todoComponent = new TodoComponent("투두", "checklist");
        todoComponent.attachTo(appRoot, "beforeend");
    }
}
new App(document.querySelector(".document"));
