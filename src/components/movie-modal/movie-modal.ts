import { IMovieData, IActors, IVideos, IGenres } from '../../scripts/types';

class MovieModal {
  container: HTMLDivElement;
  closeButton!: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('movie-modal', 'hide');
    this.container.setAttribute('tabindex', '0');
  }

  public render = (
    movieData: IMovieData,
    actors: IActors,
    videos: IVideos,
    genres: IGenres
  ): HTMLDivElement => {
    let video: string = 'https://www.youtube.com';
    let actorsCast: string[] = [];
    let genresList: string[] = [];

    if (videos.results)
      video = `https://www.youtube.com/watch?v=${videos.results[0]?.key}`;

    if (Array.isArray(genres.genres)) {
      genresList = genres.genres
        .map((genre) => {
          return `<p class="movie-modal__genre">${genre.name}</p>`;
        })
        .slice(0, 3);
    }

    if (Array.isArray(actors.cast)) {
      actorsCast = actors.cast
        .filter((actor) => actor.profile_path !== null)
        .map((actor) => {
          return `
          <div class="movie-modal__actor" style="background-image: url(https://image.tmdb.org/t/p/w300${actor.profile_path})" title="${actor.name}"></div>
        `;
        })
        .slice(0, 10);
    }

    this.container.innerHTML = `
      <div class="movie-modal__inner">
        <div class="movie-modal__top">
          <h3 class="movie-modal__title">${
            movieData.title || movieData.name
          }</h3>
          <button class="movie-modal__close-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M 12 11.2929 L 16.1464 7.14645 C 16.3417 6.95118 16.6583 6.95118 16.8536 7.14645 C 17.0488 7.34171 17.0488 7.65829 16.8536 7.85355 L 12.7071 12 L 16.8536 16.1464 C 17.0488 16.3417 17.0488 16.6583 16.8536 16.8536 C 16.6583 17.0488 16.3417 17.0488 16.1464 16.8536 L 12 12.7071 L 7.85355 16.8536 C 7.65829 17.0488 7.34171 17.0488 7.14645 16.8536 C 6.95118 16.6583 6.95118 16.3417 7.14645 16.1464 L 11.2929 12 L 7.14645 7.85355 C 6.95118 7.65829 6.95118 7.34171 7.14645 7.14645 C 7.34171 6.95118 7.65829 6.95118 7.85355 7.14645 L 12 11.2929 Z" /></svg>
          </button>
        </div>
        <div class="movie-modal__poster-wrapper">
          <div class="movie-modal__poster" style="background-image: url(https://image.tmdb.org/t/p/w1280${
            movieData.backdrop_path
          })">
          </div>
        </div>
        <div class="movie-modal__description-wrapper">
          <p class="movie-modal__description">${movieData.overview}</p>
          <div class="movie-modal__genres-wrapper">${genresList.join('')}</div>
          <div class="movie-modal__bottom">
            <div class="movie-modal__release">
              <p class="movie-modal__release-date">Release date: ${this.formatDate(
                movieData.release_date || movieData.first_air_date || ''
              )}</p>
              <a class="movie-modal__youtube" href="${video}" target="_blank">YouTube</a>
            </div>
            <div class="movie-modal__cast">${actorsCast.join('')}</div>
          </div>
        </div>
      </div>
    `;

    return this.container;
  };

  private formatDate = (date: string): string => {
    return date.split('-').reverse().join('/');
  };

  public show = (): void => {
    this.container.classList.remove('hide');
    this.container.focus();
  };

  public hide = (): void => {
    this.container.classList.add('hide');
  };

  public addListeners = () => {
    this.closeButton = this.container.querySelector(
      '.movie-modal__close-button'
    ) as HTMLButtonElement;

    this.closeButton.addEventListener('click', this.hide);
  };
}

const movieModal = new MovieModal();
export default movieModal;
