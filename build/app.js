import { MediaInputComponent, } from "./components/input/media-input.js";
import { TextInputComponent, } from "./components/input/text-input.js";
import { Modal } from "./components/modal/modal.js";
import { ImageComponent } from "./components/page/item/image.js";
import { VideoComponent } from "./components/page/item/video.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { PageComponent, PageItemComponent, } from "./components/page/page.js";
class App {
    constructor(appRoot, modalRoot) {
        this.modalRoot = modalRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.page.addChild(new ImageComponent("hi img title", "https://picsum.photos/seed/picsum/200/300"));
        this.page.addChild(new VideoComponent("iam video", "https://youtu.be/K3-jG52XwuQ"));
        this.page.addChild(new NoteComponent("note title", "note body"));
        this.page.addChild(new TodoComponent("투두", "checklist"));
        this.bindElementToModal("#new-todo", TextInputComponent, (input) => new TodoComponent(input.title, input.note));
        this.bindElementToModal("#new-note", TextInputComponent, (input) => new NoteComponent(input.title, input.note));
        this.bindElementToModal("#new-image", MediaInputComponent, (input) => new ImageComponent(input.title, input.url));
        this.bindElementToModal("#new-video", MediaInputComponent, (input) => new VideoComponent(input.title, input.url));
    }
    bindElementToModal(selector, inputComponentConstructor, makeInputComponent) {
        const selectedElement = document.body.querySelector(selector);
        selectedElement.addEventListener("click", () => {
            const modal = new Modal();
            const inputComponent = new inputComponentConstructor();
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
new App(document.querySelector(".document"), document.body);
