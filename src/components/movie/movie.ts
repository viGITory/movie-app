import { IMovieData } from '../../scripts/types';

export default class Movie {
  container: HTMLElement;

  constructor() {
    this.container = document.createElement('article');
    this.container.classList.add('movie');
    this.container.setAttribute('tabindex', '0');
  }

  public render = (item: IMovieData): HTMLElement => {
    this.container.innerHTML = `
      <h3 class="movie__title">${item.title || item.name}</h3>
      <div class="movie__poster" style="background-image: url(https://image.tmdb.org/t/p/w780${
        item.poster_path
      })">
      </div>
      <p class="movie__rate">${item.vote_average}</p>
    `;

    return this.container;
  };
}
