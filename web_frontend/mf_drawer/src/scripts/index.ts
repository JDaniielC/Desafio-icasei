export class Drawer {
  menu: HTMLElement;
  drawerButton: HTMLElement;
  favorites: HTMLElement;
  favoriteVideosId: string[] = []

  constructor() {
    this.menu = document.getElementById('nav-menu') as HTMLElement
    this.drawerButton = document.getElementById('drawer-button') as HTMLElement
    this.favorites = document.getElementById('favorite-count') as HTMLElement

    this.onInit()  
  } 

  onInit() {
    if (this.drawerButton === null) {
      throw new Error('Drawer button not found')
    } else {
      this.drawerButton.onclick = () => this.toggleDrawer()
    }
    if (this.favorites === null) {
      throw new Error('Favorite count not found')
    } else {
      this.getFavoriteVideos()
      this.favorites.innerText = this.favoriteVideosId.length.toString()
    }
  }

  getFavoriteVideos() {
    this.favoriteVideosId = JSON.parse(
      localStorage.getItem('favoriteVideos') || '[]'
    )
  }

  toggleDrawer() {
    if (this.menu === null) {
      throw new Error('Menu not found')
    }
    this.menu.classList.toggle('active')
  }
}

new Drawer()