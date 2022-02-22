import { IData } from '../../scripts/types';

import Header from '../header/header';
import Footer from '../footer/footer';
import Preloader from '../preloader/preloader';
import MovieModal from '../movie-modal/movie-modal';

export default class Page {
  container: HTMLDivElement;
  moviesContainer!: HTMLDivElement;
  searchInput!: HTMLInputElement;
  searchMovieButton!: HTMLButtonElement;
  searchTvButton!: HTMLButtonElement;
  searchButtons!: Element[];

  movieNowPlayingButton!: HTMLButtonElement;
  moviePopularButton!: HTMLButtonElement;
  movieTopRatedButton!: HTMLButtonElement;
  movieUpcomingButton!: HTMLButtonElement;
  tvPopulartButton!: HTMLButtonElement;
  tvTopRatedButton!: HTMLButtonElement;
  loadButton!: HTMLButtonElement;
  buttons!: Element[];

  pageCount: number;
  currentRequest: string;
  apiKey: string;

  header: Header;
  preloader: Preloader;
  footer: Footer;
  movieModal: MovieModal;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;
    this.header = new Header();
    this.preloader = new Preloader();
    this.footer = new Footer();
    this.movieModal = new MovieModal();

    this.pageCount = 1;
    this.apiKey = '48fa0c325cf33db96de5b585427f9aa1';
    this.currentRequest = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
  }

  private render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <div class="page__inner">
        ${this.header.render()}
        <main class="main">
          <div class="container">
            <h1 class="visually-hidden">Movie-app</h1>
            <div class="main__inner">
              <div class="main__top">
                <button class="button active-btn" type="button" data-button="movie-popular">Popular</button>
                <button class="button" type="button" data-button="movie-now-playing">Now playing</button>
                <button class="button" type="button" data-button="movie-top-rated">Top rated</button>
                <button class="button" type="button" data-button="movie-upcoming">Upcoming</button>
                <button class="button" type="button" data-button="tv-popular">Popular (TV)</button>
                <button class="button" type="button" data-button="tv-top-rated">Top rated (TV)</button>
              </div>
              <div class="main__center">
                <div class="main__movies"></div>
              </div>
              <button class="button" type="button" data-button="load">Load more</button>
            </div>
          </div>
        </main>
        ${this.footer.render()}
      </div>
    `;

    return this.container;
  };

  private getElements = (): void => {
    this.moviesContainer = this.container.querySelector(
      '.main__movies'
    ) as HTMLDivElement;
    this.searchInput = this.container.querySelector(
      '.header__input'
    ) as HTMLInputElement;
    this.searchMovieButton = this.container.querySelector(
      '[data-search=movie]'
    ) as HTMLButtonElement;
    this.searchTvButton = this.container.querySelector(
      '[data-search=tv]'
    ) as HTMLButtonElement;
    this.movieNowPlayingButton = this.container.querySelector(
      '[data-button=movie-now-playing]'
    ) as HTMLButtonElement;
    this.moviePopularButton = this.container.querySelector(
      '[data-button=movie-popular]'
    ) as HTMLButtonElement;
    this.movieTopRatedButton = this.container.querySelector(
      '[data-button=movie-top-rated]'
    ) as HTMLButtonElement;
    this.movieUpcomingButton = this.container.querySelector(
      '[data-button=movie-upcoming]'
    ) as HTMLButtonElement;
    this.tvPopulartButton = this.container.querySelector(
      '[data-button=tv-popular]'
    ) as HTMLButtonElement;
    this.tvTopRatedButton = this.container.querySelector(
      '[data-button=tv-top-rated]'
    ) as HTMLButtonElement;
    this.loadButton = this.container.querySelector(
      '[data-button=load]'
    ) as HTMLButtonElement;
    this.searchButtons = [...this.container.querySelectorAll('[data-search]')];
    this.buttons = [...this.container.querySelectorAll('[data-button]')];
  };

  private addComponents = (): void => {
    this.moviesContainer.insertAdjacentElement(
      'beforebegin',
      this.preloader.render()
    );
    this.container.append(this.movieModal.modalContainer);
  };

  private getData = async (url: string) => {
    document.body.classList.toggle('no-scroll');

    const result = await fetch(url);
    const data = await result.json();

    setTimeout(() => {
      if (result.status !== 200) {
        this.moviesContainer.innerHTML = `
          <div class="main__error-wrapper">
            <img class="main__error-image" src="./assets/popcorn-error.webp">
            <p class="main__error-text">Something went wrong :(</p>
          </div>
        `;
      }

      if (
        !data.results.length &&
        this.moviesContainer.childNodes.length === 0
      ) {
        this.moviesContainer.innerHTML = `
          <div class="main__error-wrapper">
            <img class="main__error-image" src="./assets/popcorn-error.webp">
            <p class="main__error-text">There are no movies for this keyword, try again</p>
          </div>
        `;
      }

      document.body.classList.toggle('no-scroll');
      this.preloader.hide();
    }, 2000);

    return data;
  };

  private addMovies = async (url: string): Promise<void> => {
    try {
      const data = await this.getData(url + this.pageCount);

      data.results.forEach((item: IData) => {
        let movie = document.createElement('article');
        movie.classList.add('movie');

        movie.innerHTML = `
          <h3 class="movie__title">${item.title || item.name}</h3>
          <div class="movie__poster-wrapper">
            <img class="movie__poster" src="https://image.tmdb.org/t/p/w1280${
              item.poster_path
            }" alt="Movie poster">
          </div>
          <p class="movie__rate">${item.vote_average}</p>
        `;

        movie.addEventListener('click', () => {
          this.movieModal.render(item);
          this.movieModal.show();
        });

        this.moviesContainer.append(movie);
      });
    } catch (err) {}
  };

  private addListeners = (): void => {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'Escape') this.movieModal.hide();
    });

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (
        !this.container
          .querySelector('.movie-modal__inner')!
          .contains(target) &&
        !target.classList.contains('movie')
      ) {
        this.movieModal.hide();
      }
    });

    this.searchInput.addEventListener('change', () => {
      if (this.searchInput.value !== '') {
        let currentCategory = '';

        if (this.searchMovieButton.classList.contains('active-btn'))
          currentCategory = 'movie';
        else if (this.searchTvButton.classList.contains('active-btn'))
          currentCategory = 'tv';

        this.currentRequest = `https://api.themoviedb.org/3/search/${currentCategory}?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;
        this.pageCount = 1;
        this.moviesContainer.innerHTML = '';

        this.buttons.forEach((elem) => {
          elem.classList.remove('active-btn');
        });

        this.preloader.show();
        this.addMovies(this.currentRequest);
      }
    });

    this.searchButtons.forEach((item) => {
      item.addEventListener('click', () => {
        if (item === this.searchMovieButton) {
          this.searchMovieButton.classList.add('active-btn');
          this.searchTvButton.classList.remove('active-btn');
          this.searchInput.placeholder = 'Search movie';
        } else if (item === this.searchTvButton) {
          this.searchTvButton.classList.add('active-btn');
          this.searchMovieButton.classList.remove('active-btn');
          this.searchInput.placeholder = 'Search TV';
        }
      });
    });

    this.buttons.forEach((item) => {
      item.addEventListener('click', () => {
        if (item === this.loadButton) {
          this.pageCount++;
          this.preloader.show();
          this.addMovies(this.currentRequest);
        } else if (item === this.movieNowPlayingButton)
          this.currentRequest = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.moviePopularButton)
          this.currentRequest = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.movieTopRatedButton)
          this.currentRequest = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.movieUpcomingButton)
          this.currentRequest = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.tvPopulartButton)
          this.currentRequest = `https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.tvTopRatedButton)
          this.currentRequest = `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=`;

        if (
          item !== this.loadButton &&
          !item.classList.contains('active-btn')
        ) {
          this.buttons.forEach((elem) => {
            elem.classList.remove('active-btn');
          });
          item.classList.add('active-btn');

          this.pageCount = 1;
          this.searchInput.value = '';
          this.moviesContainer.innerHTML = '';

          this.preloader.show();
          this.addMovies(this.currentRequest);
        }
      });
    });
  };

  public init = (): void => {
    this.render();
    this.getElements();
    this.addComponents();
    this.addMovies(this.currentRequest);
    this.addListeners();
  };
}
