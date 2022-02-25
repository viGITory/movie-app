import { IMovieData } from '../../scripts/types';

export default class MovieModal {
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('movie-modal', 'hide');
  }

  public render = (movieData: IMovieData): void => {
    this.container.innerHTML = `
      <div class="movie-modal__inner">
        <h3 class="movie-modal__title">${movieData.title || movieData.name}</h3>
        <div class="movie-modal__poster-wrapper">
          <div class="movie-modal__poster" style="background-image: url(https://image.tmdb.org/t/p/w1280${
            movieData.backdrop_path
          })">
          </div>
        </div>
        <div class="movie-modal__description-wrapper">
          <p class="movie-modal__description">${movieData.overview}</p>
          <p class="movie-modal__release">Release date: ${
            movieData.release_date || movieData.first_air_date || ''
          }</p>
        </div>
      </div>
    `;
  };

  get modalContainer(): HTMLDivElement {
    return this.container;
  }

  public show = (): void => {
    this.container.classList.remove('hide');
  };

  public hide = (): void => {
    this.container.classList.add('hide');
  };
}
