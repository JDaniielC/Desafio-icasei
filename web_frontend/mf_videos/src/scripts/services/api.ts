import { IVideo, IVideoResponse } from "../types/video"

const apiUrl = "/api"

export class apiService {
  async fetchVideos(
    query: string,
  ): Promise<IVideo[]> {
    const videos = await fetch(`${apiUrl}/videos?query=${query}`)
      .then(res => res.json())
      .then((data: IVideoResponse) => data.videos)

    return videos
  };

  async fetchFavoriteVideos(
    favoriteVideosIds: string[],
  ): Promise<IVideo[]> {
    const query = JSON.stringify(favoriteVideosIds)
    const videos = await fetch(`${apiUrl}/videos?filters=${query}`)
      .then(res => res.json())
      .then((data: IVideoResponse) => data.videos)

    return videos
  }
}

export const api = new apiService()