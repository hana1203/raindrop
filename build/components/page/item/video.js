import { BaseComponent } from "../../basecomponent.js";
export class VideoComponent extends BaseComponent {
    constructor(title, videosrc) {
        super(`<section class="video">
    <iframe width="450" height="300" class="video__holder" allowfullscreen></iframe>
    <h3 class="page-item__title video__title"></h3>
  </section>`);
        const videoEl = this.element.querySelector(".video__holder");
        const extractedId = formatEmbed(videosrc);
        videoEl.src = `https://www.youtube.com/embed/${extractedId}`;
        const videoTitle = this.element.querySelector(".video__title");
        videoTitle.textContent = title;
    }
}
function formatEmbed(videosrc) {
    const lastSlashIdx = videosrc.lastIndexOf("/");
    const videoId = videosrc.substring(lastSlashIdx + 1);
    console.log("videoId", videoId);
    return videoId;
}
