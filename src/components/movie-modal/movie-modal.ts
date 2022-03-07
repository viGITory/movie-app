import { IMovieData, IActors, IVideos, IGenres } from '../../scripts/types';

export default class MovieModal {
  container: HTMLDivElement;
  closeButton!: HTMLButtonElement;

  specialVideoKey: string;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('movie-modal', 'hide-modal');

    this.specialVideoKey = 'dQw4w9WgXcQ';
  }

  public render = (
    movieData: IMovieData,
    actors: IActors,
    videos: IVideos,
    genres: IGenres
  ): void => {
    const actorsCast = actors.cast
      .filter((item) => item.profile_path !== null)
      .map((item) => {
        return `
          <div class="movie-modal__actor" style="background-image: url(https://image.tmdb.org/t/p/w300${item.profile_path})" title="${item.name}"></div>
        `;
      })
      .slice(0, 10)
      .join('');

    const genresList = genres.genres
      .map((item) => {
        return `
          <p class="movie-modal__genre">${item.name}</p>
        `;
      })
      .slice(0, 3)
      .join('');

    this.container.innerHTML = `
      <div class="movie-modal__inner">
        <div class="movie-modal__top">
          <h3 class="movie-modal__title">${
            movieData.title || movieData.name
          }</h3>
          <button class="movie-modal__close-button" type="button">✖</button>
        </div>
        <div class="movie-modal__poster-wrapper">
          <div class="movie-modal__poster" style="background-image: url(https://image.tmdb.org/t/p/w1280${
            movieData.backdrop_path
          })">
          </div>
        </div>
        <div class="movie-modal__description-wrapper">
          <p class="movie-modal__description">${movieData.overview}</p>
          <div class="movie-modal__genres-wrapper">${genresList}</div>
          <div class="movie-modal__bottom">
            <div class="movie-modal__release">
              <p class="movie-modal__release-date">Release date: ${this.formatDate(
                movieData.release_date || movieData.first_air_date || ''
              )}</p>
              <a class="movie-modal__youtube" href="https://www.youtube.com/watch?v=${
                videos.results[0]?.key || this.specialVideoKey
              }" target="_blank">YouTube</a>
            </div>
            <div class="movie-modal__cast">${actorsCast}</div>
          </div>
        </div>
      </div>
    `;
  };

  get modalContainer(): HTMLDivElement {
    return this.container;
  }

  private formatDate = (date: string): string => {
    return date.split('-').reverse().join('/');
  };

  public show = (): void => {
    this.container.classList.remove('hide-modal');
  };

  public hide = (): void => {
    this.container.classList.add('hide-modal');
  };

  public addListeners = () => {
    this.closeButton = this.container.querySelector(
      '.movie-modal__close-button'
    ) as HTMLButtonElement;

    this.closeButton.addEventListener('click', this.hide);
  };
}
