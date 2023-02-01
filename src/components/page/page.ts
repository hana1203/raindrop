//parent container about page
export class PageComponent {
  //기존 코드
  private element: HTMLUListElement; //카드 목록
  constructor() {
    this.element = document.createElement("ul");
    this.element.setAttribute("class", "page");
    this.element.textContent = "This is PageComponent";
  }
  //외부에서 페이지 컴포넌트 만들어서 필요한 곳에 페이지 추가하는 함수
  //인자로 전달받은 parent에 추가 - 부모는 html어떤 요소든 받을 수 있음
  //어떤 포지션에 넣을 건지 인자로 받음
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
