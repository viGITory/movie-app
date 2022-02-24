import { IData } from '../../scripts/types';

export default class Movie {
  container: HTMLElement;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('movie');
  }

  public render = (item: IData): HTMLElement => {
    this.container.innerHTML = `
      <h3 class="movie__title">${item.title || item.name}</h3>
      <div class="movie__poster-wrapper">
        <div class="movie__poster" style="background-image: url(https://image.tmdb.org/t/p/w1280${
          item.poster_path
        })">
        </div>
      </div>
      <p class="movie__rate">${item.vote_average}</p>
    `;

    return this.container;
  };
}
