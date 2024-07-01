import { IVideo, IVideoResponse } from "./types/video";

const videosContainer: HTMLElement = document.getElementById('videos') as HTMLElement

const videoContainer: HTMLElement = document.getElementById('video-container') as HTMLElement

const videoIframe: HTMLIFrameElement = document.getElementById('video') as HTMLIFrameElement

const searchInput: HTMLInputElement = document.getElementById('search') as HTMLInputElement

function createVideoInfo(video: IVideo) {
  document.querySelectorAll('.video-info').forEach(
    (info: Element) => info.remove()
  )

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

function openVideo(video: IVideo) {
  videoIframe.src = videoIframe.src.replace(':id', video.id)
  videoContainer.style.display = 'block'
  videosContainer.style.display = 'none'
  videoContainer.appendChild(createVideoInfo(video))
}

function createVideoElement(video: IVideo) {
  let videoElement = document.createElement('div')
  videoElement.className = 'video'
  videoElement.onclick = () => openVideo(video);
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

function treatData(data: IVideoResponse) {
  try {
    videosContainer.innerHTML = ''
    const videos: IVideo[] = data.videos
    videos.forEach(video => {
      videosContainer.appendChild(createVideoElement(video))
    })
  } catch (error) {
    console.error(error)
  }
}

const apiUrl = "/api"

fetch(`${apiUrl}/videos?query=icasei`)
  .then(res => res.json()).then(treatData)

const debouce = (fn: Function, delay: number) => {
  let timeout: number
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(
      () => fn(...args), delay
    ) as unknown as number
  }
}

searchInput.onkeyup = debouce(() => {
  videoContainer.style.display = 'none'
  videosContainer.style.display = 'grid'
  const searchValue = searchInput.value.toLowerCase()
  fetch(`${apiUrl}/videos?query=${searchValue}`)
    .then(res => res.json()).then(treatData)
}, 250);