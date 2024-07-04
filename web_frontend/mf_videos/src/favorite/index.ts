import { VideosPage } from "..";
import { api } from "../services/api";

class FavoritePage extends VideosPage {

  constructor() {
    super()
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
  } 
}

new FavoritePage()