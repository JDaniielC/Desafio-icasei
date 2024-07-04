export interface IVideo {
  id: string
  thumbnail: string
  title: string
  channelTitle: string
  description: string
  channelId: string
}

export interface IVideoResponse {
  videos: IVideo[]
}