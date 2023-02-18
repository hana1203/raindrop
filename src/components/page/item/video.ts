import { BaseComponent } from "../../basecomponent.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, videosrc: string) {
    super(`<section class="video">
    <iframe width="450" height="300" class="video__holder" allowfullscreen></iframe>
    <h3 class="page-item__title video__title"></h3>
  </section>`);

    const videoEl = this.element.querySelector(
      ".video__holder"
      //class가져오는거니 . 기억!!
    )! as HTMLIFrameElement;

    const videoTitle = this.element.querySelector(
      ".video__title"
    )! as HTMLParagraphElement;
    videoTitle.textContent = title;

    //url 주소 -> id 추출해서 -> embed 형식으로 만들기
    const extractedId: string = formatEmbed(videosrc);
    if (extractedId.length === 0) {
      videoEl.src = "";
    } else {
      videoEl.src = `https://www.youtube.com/embed/${extractedId}`;
    }
  }
}

function formatEmbed(videosrc: string): string {
  //url 주소 / 이후 가져오기
  const lastSlashIdx = videosrc.lastIndexOf("/");
  const videoId = videosrc.substring(lastSlashIdx + 1);
  console.log("videoId", videoId);
  return videoId;
}
