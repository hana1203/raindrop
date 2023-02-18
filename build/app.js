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
        this.page.addChild(new ImageComponent("The rainy day is temporary", "https://media.cntraveller.com/photos/611bea2b22be3ca7e5c007d1/4:3/w_2664,h_1998,c_limit/-arabica-exterior-london-nov19-pr.jpg"));
        this.page.addChild(new ImageComponent("The contrast is why we got 'em", "https://www.pdsa.org.uk/media/7646/golden-retriever-gallery-2.jpg?anchor=center&mode=crop&quality=100&height=500&bgcolor=fff&rnd=133020229510000000"));
        this.page.addChild(new VideoComponent("Have a cup of coffee", "https://youtu.be/K3-jG52XwuQ"));
        this.page.addChild(new NoteComponent("staying healthy", "laughing a lot and be thankful"));
        this.page.addChild(new TodoComponent("Making vanchau", "red wine 🍷"));
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
                const el = makeInputComponent(inputComponent);
                if (inputComponent.title.length === 0) {
                    alert("Please enter the title.");
                }
                else {
                    modal.removeFrom(this.modalRoot);
                    this.page.addChild(el);
                }
            });
            modal.setOnCloseListener(() => {
                modal.removeFrom(this.modalRoot);
            });
        });
    }
}
new App(document.querySelector(".document"), document.body);
