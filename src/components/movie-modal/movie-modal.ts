import { IMovieData, IActors, IVideos } from '../../scripts/types';

export default class MovieModal {
  container: HTMLDivElement;
  specialVideoKey: string;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('movie-modal', 'hide');

    this.specialVideoKey = 'dQw4w9WgXcQ';
  }

  public render = (
    movieData: IMovieData,
    actors: IActors,
    videos: IVideos
  ): void => {
    const actorsCast = actors.cast
      .filter((item) => item.profile_path !== null)
      .map((item) => {
        return `
          <div class="movie-modal__actor" style="background-image: url(https://image.tmdb.org/t/p/w300${item.profile_path})" title="${item.name}"></div>
        `;
      })
      .slice(0, 5)
      .join('');

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
          <div class="movie-modal__bottom">
            <div>
              <p class="movie-modal__release">Release date: ${
                movieData.release_date || movieData.first_air_date || ''
              }</p>
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

  public show = (): void => {
    this.container.classList.remove('hide');
  };

  public hide = (): void => {
    this.container.classList.add('hide');
  };
}
