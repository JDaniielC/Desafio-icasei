import { IVideo, IVideoResponse } from "./types/video";
import debouce from "./utils/debouce";

const apiUrl = "/api"
class VideosPage {
  private videosContainer: HTMLElement;
  private videoContainer: HTMLElement;
  private videoIframe: HTMLIFrameElement;
  private searchInput: HTMLInputElement;
  private drawerButton: HTMLElement;
  private drawer: HTMLElement;

  constructor() {
    this.videosContainer = document.getElementById('videos') as HTMLElement
    this.videoContainer = document.getElementById('video-container') as HTMLElement
    this.videoIframe = document.getElementById('video') as HTMLIFrameElement
    this.searchInput = document.getElementById('search') as HTMLInputElement
    this.drawerButton = document.getElementById('drawer') as HTMLElement
    this.drawer = document.getElementById('nav-menu') as HTMLElement

    this.onInit()  
  } 

  private onInit() {
    // Initialize event listeners
    this.drawerButton.onclick = () => this.toggleDrawer()
    this.searchInput.onkeyup = debouce(
      () => this.searchVideos(), 250
    )

    this.fetchVideos('icasei')
  }

  private toggleDrawer() {
    this.drawer.classList.toggle('active')
  }

  private searchVideos() {
    this.videoContainer.style.display = 'none'
    this.videosContainer.style.display = 'grid'
    const searchValue = this.searchInput.value.toLowerCase()
    this.fetchVideos(searchValue)
  }

  private removeVideoInfo() {
    document.querySelectorAll('.video-info').forEach(
      (info: Element) => info.remove()
    )
  }

  private createVideoInfo(video: IVideo) {
    this.removeVideoInfo()

    let videoInfo = document.createElement('div')
    videoInfo.className = 'video-info'
    videoInfo.innerHTML = `
      <div class="info">
        <div>
          <h1>${video.title}</h1>
          <p class="channel-title">${video.channelTitle}</p>
        </div>
      </div>
      <p>${video.description}</p>
    `
    return videoInfo
  }

  private openVideo(video: IVideo) {
    this.videoIframe.src = this.videoIframe.src.replace(
      ':id', video.id
    )
    this.videoContainer.style.display = 'block'
    this.videosContainer.style.display = 'none'
    this.videoContainer.appendChild(
      this.createVideoInfo(video)
    )
  }

  private createVideoElement(video: IVideo) {
    const videoElement = document.createElement('div')
    videoElement.className = 'video'
    videoElement.onclick = () => this.openVideo(video);
    videoElement.innerHTML = `
      <img
        class="thumbnail"
        src="${video.thumbnail}"
        alt="${video.title}"
      >
      <div class="info">
        <p>${video.title}</p>
      </div>
      <p class="channel-title">${video.channelTitle}</p>
    `
    return videoElement
  }

  private fetchVideos(query: string) {
    fetch(`${apiUrl}/videos?query=${query}`)
      .then(res => res.json()).then((data: IVideoResponse) => {
        try {
          this.videosContainer.innerHTML = ''
          const videos: IVideo[] = data.videos
          videos.forEach(video => {
            this.videosContainer.appendChild(this.createVideoElement(video))
          })
        } catch (error) {
          console.error(error)
        }
      }
    )
  }
}

new VideosPage()