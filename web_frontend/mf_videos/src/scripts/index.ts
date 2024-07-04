import { IVideo } from "./types/video";
import { api, apiService } from "./services/api";
import debouce from "./utils/debouce";

export class VideosPage {
  videoContainer: HTMLElement;
  videosContainer: HTMLElement;
  searchInput: HTMLInputElement;
  videoIframe: HTMLIFrameElement;
  videoTemplate: HTMLTemplateElement;
  videoInfoTemplate: HTMLTemplateElement;

  favoriteVideosId: string[] = []
  FIRST_VIDEO_SEARCH = 'icasei'
  api: apiService

  constructor() {
    this.api = api
    this.videosContainer = this.getElementById('videos') as HTMLElement
    this.videoContainer = this.getElementById('video-container') as HTMLElement
    this.videoIframe = this.getElementById('video') as HTMLIFrameElement
    this.searchInput = this.getElementById('search') as HTMLInputElement
    this.videoTemplate = this.getElementById('video-template') as HTMLTemplateElement
    this.videoInfoTemplate = this.getElementById('video-info-template') as HTMLTemplateElement

    this.onInit()  
  } 

  getElementById(id: string) {
    return document.getElementById(id)
  }

  onInit() {
    this.getFavoriteVideos()
    api.fetchFavoriteVideos(this.favoriteVideosId).then(
      (videos) => this.renderVideoList(videos)
    )

    if (this.searchInput == null) {
      throw new Error('Search input not found')
    }
    if (this.videoContainer == null) {
      throw new Error('Video container not found')
    }
    if (this.videosContainer == null) {
      throw new Error('Videos container not found')
    }
    this.searchInput.onkeyup = debouce(
      () => this.searchVideos(), 250
    )
  } 

  removeFavoriteVideo(videoId: string) {
    this.favoriteVideosId = this.favoriteVideosId.filter(
      (id) => id !== videoId
    )
    localStorage.setItem('favoriteVideos', JSON.stringify(this.favoriteVideosId))
  }

  getFavoriteVideos() {
    this.favoriteVideosId = JSON.parse(
      localStorage.getItem('favoriteVideos') ?? '[]'
    )
  }

  saveFavoriteVideo(videoId: string) {
    this.favoriteVideosId.push(videoId)
    localStorage.setItem('favoriteVideos', JSON.stringify(this.favoriteVideosId))
  }

  private searchVideos() {
    this.videoContainer.style.display = 'none'
    this.videosContainer.style.display = 'grid'
    const searchValue = this.searchInput.value.toLowerCase()
    api.fetchVideos(searchValue).then(
      (videos) => this.renderVideoList(videos)
    )
  }

  private removeVideoInfo() {
    document.querySelectorAll('.video-info').forEach(
      (info: Element) => info.remove()
    )
  }

  renderVideoList(videos: IVideo[]) {
    this.videosContainer.innerHTML = ''
    videos.forEach(video => {
      this.videosContainer.appendChild(this.createVideoElement(video))
    })
  }

  private createVideoInfo(video: IVideo) {
    this.removeVideoInfo()

    if (this.videoInfoTemplate == null) {
      throw new Error('Video info template not found')
    }

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
    if (this.videoTemplate == null) {
      throw new Error('Video template not found')
    }
    const clone = this.videoTemplate.content.cloneNode(true) as HTMLElement
    const star = clone.querySelector('i') as HTMLElement
    const videoElement = clone.querySelector('.video') as HTMLElement
    const thumbnail = clone.querySelector('img') as HTMLImageElement
    const info = clone.querySelector('.info') as HTMLElement
    const channelTitle = clone.querySelector('.channel-title') as HTMLElement

    if (this.favoriteVideosId.includes(video.id)) {
      star.className = 'fa-solid fa-star'
    }

    thumbnail.src = video.thumbnail
    thumbnail.alt = video.title
    info.querySelector('p')!.innerText = video.title
    channelTitle.innerText = video.channelTitle
    star.onclick = ($event) => {
      star.className = star.className === 'fa-regular fa-star'
        ? 'fa-solid fa-star' : 'fa-regular fa-star'
      
      if (star.className === 'fa-solid fa-star') {
        this.saveFavoriteVideo(video.id)
      } else {
        this.removeFavoriteVideo(video.id)
      }

      $event.stopPropagation()
    }

    videoElement.onclick = () => this.openVideo(video)
    return videoElement
  }
}

new VideosPage()