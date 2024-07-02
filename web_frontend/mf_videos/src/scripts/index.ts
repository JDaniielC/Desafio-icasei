import { IVideo, IVideoResponse } from "./types/video";
import debouce from "./utils/debouce";

const apiUrl = "/api"
class VideosPage {
  private videosContainer: HTMLElement;
  private videoContainer: HTMLElement;
  private videoIframe: HTMLIFrameElement;
  private searchInput: HTMLInputElement;
  private drawerButton: HTMLElement;
  private videoInfoTemplate: HTMLTemplateElement;
  private videoTemplate: HTMLTemplateElement;
  private drawer: HTMLElement;
  private main: HTMLElement;

  constructor() {
    this.videosContainer = document.getElementById('videos') as HTMLElement
    this.videoContainer = document.getElementById('video-container') as HTMLElement
    this.videoIframe = document.getElementById('video') as HTMLIFrameElement
    this.searchInput = document.getElementById('search') as HTMLInputElement
    this.drawerButton = document.getElementById('drawer') as HTMLElement
    this.drawer = document.getElementById('nav-menu') as HTMLElement
    this.main = document.querySelector('main') as HTMLElement
    this.videoInfoTemplate = document.getElementById('video-info-template') as HTMLTemplateElement
    this.videoTemplate = document.getElementById('video-template') as HTMLTemplateElement

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
    this.main.classList.toggle('drawer-switched')
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

    const clone = this.videoInfoTemplate.content.cloneNode(true) as HTMLElement
    const videoInfo = clone.querySelector('.video-info') as HTMLElement
    const title = clone.querySelector('h1') as HTMLElement
    const channelTitle = clone.querySelector('.channel-title') as HTMLElement
    const description = clone.querySelector('p') as HTMLElement

    title.innerText = video.title
    channelTitle.innerText = video.channelTitle
    description.innerText = video.description
    
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
    const clone = this.videoTemplate.content.cloneNode(true) as HTMLElement
    const videoElement = clone.querySelector('.video') as HTMLElement
    const thumbnail = clone.querySelector('img') as HTMLImageElement
    const info = clone.querySelector('.info') as HTMLElement
    const channelTitle = clone.querySelector('.channel-title') as HTMLElement

    thumbnail.src = video.thumbnail
    thumbnail.alt = video.title
    info.querySelector('p')!.innerText = video.title
    channelTitle.innerText = video.channelTitle

    videoElement.onclick = () => this.openVideo(video)
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