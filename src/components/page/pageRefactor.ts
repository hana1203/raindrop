import { BaseComponent } from "../basecomponent.js";

export class PageComponentRefactor extends BaseComponent<HTMLUListElement> {
  constructor() {
    super(`<ul class='page'>This is PageRefactorComponent</ul>`); //call parent's constructor
  }
}
