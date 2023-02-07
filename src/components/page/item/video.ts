import { BaseComponent } from "../../basecomponent.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, videosrc: string) {
    super(`<section class="video">
    <iframe width="450" height="300" class="video__holder" allowfullscreen></iframe>
    <p class="video__title"></p>
  </section>`);

    const videoEl = this.element.querySelector(
      ".video__holder"
      //class가져오는거니 . 기억!!
    )! as HTMLIFrameElement;

    //url 주소 -> id 추출해서 -> embed 형식으로 만들기
    const extractedId: string = formatEmbed(videosrc);
    videoEl.src = `https://www.youtube.com/embed/${extractedId}`;

    const videoTitle = this.element.querySelector(
      ".video__title"
    )! as HTMLParagraphElement;
    videoTitle.textContent = title;
  }
}

function formatEmbed(videosrc: string): string {
  //url 주소 / 이후 가져오기
  const lastSlashIdx = videosrc.lastIndexOf("/");
  const videoId = videosrc.substring(lastSlashIdx + 1);
  console.log("videoId", videoId);
  return videoId;
}

// <iframe
//   width="905"
//   height="509"
//   src="https://www.youtube.com/embed/wxUexZbRdLU"
// ></iframe>;
