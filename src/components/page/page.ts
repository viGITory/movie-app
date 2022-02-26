import { IMovieData } from '../../scripts/types';

import Header from '../header/header';
import Footer from '../footer/footer';
import Preloader from '../preloader/preloader';
import Movie from '../movie/movie';
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
  tvPopularButton!: HTMLButtonElement;
  tvTopRatedButton!: HTMLButtonElement;
  loadButton!: HTMLButtonElement;
  buttons!: Element[];

  pageCount: number;
  currentUrl: string;
  apiKey: string;

  preloader: Preloader;
  movieModal: MovieModal;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;
    this.preloader = new Preloader();
    this.movieModal = new MovieModal();

    this.pageCount = 1;
    this.apiKey = '48fa0c325cf33db96de5b585427f9aa1';
    this.currentUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
  }

  private render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <div class="page__inner">
        ${new Header().render()}
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
                <h2 class="visually-hidden">Movies/TV</h2>
                <div class="main__movies"></div>
              </div>
              <button class="button" type="button" data-type="load">Load more</button>
            </div>
          </div>
        </main>
        ${new Footer().render()}
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
    this.tvPopularButton = this.container.querySelector(
      '[data-button=tv-popular]'
    ) as HTMLButtonElement;
    this.tvTopRatedButton = this.container.querySelector(
      '[data-button=tv-top-rated]'
    ) as HTMLButtonElement;
    this.loadButton = this.container.querySelector(
      '[data-type=load]'
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

  private showMovies = (): void => {
    this.moviesContainer.innerHTML = '';
    this.pageCount = 1;
    this.preloader.show();
    this.addMovies(this.currentUrl);
  };

  private getData = async (url: string) => {
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
        !data.results?.length &&
        this.moviesContainer.childNodes.length === 0
      ) {
        this.moviesContainer.innerHTML = `
          <div class="main__error-wrapper">
            <img class="main__error-image" src="./assets/popcorn-error.webp">
            <p class="main__error-text">There are no movies for this keyword, try again</p>
          </div>
        `;
      }

      this.preloader.hide();
    }, 2000);

    return data;
  };

  private addMovies = async (url: string): Promise<void> => {
    try {
      const data = await this.getData(url + this.pageCount);

      data.results.forEach((item: IMovieData) => {
        const movie = new Movie().render(item);

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

    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !target.matches(
          '.movie, .movie *, .movie-modal__inner, .movie-modal__inner *'
        )
      )
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

        this.searchInput.value = this.searchInput.value.trim();
        this.currentUrl = `https://api.themoviedb.org/3/search/${currentCategory}?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;
        this.showMovies();
        this.buttons.forEach((elem) => {
          elem.classList.remove('active-btn');
        });
      }
    });

    this.searchButtons.forEach((item) => {
      item.addEventListener('click', () => {
        if (this.searchInput.value && !item.classList.contains('active-btn')) {
          if (item === this.searchMovieButton)
            this.currentUrl = `https://api.themoviedb.org/3/search/movie?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;
          else if (item === this.searchTvButton)
            this.currentUrl = `https://api.themoviedb.org/3/search/tv?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;

          this.showMovies();
        }

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
          this.addMovies(this.currentUrl);
        } else if (item === this.movieNowPlayingButton)
          this.currentUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.moviePopularButton)
          this.currentUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.movieTopRatedButton)
          this.currentUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.movieUpcomingButton)
          this.currentUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.tvPopularButton)
          this.currentUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=en-US&page=`;
        else if (item === this.tvTopRatedButton)
          this.currentUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=`;

        if (
          item !== this.loadButton &&
          !item.classList.contains('active-btn')
        ) {
          this.buttons.forEach((elem) => {
            elem.classList.remove('active-btn');
          });
          item.classList.add('active-btn');

          this.searchInput.value = '';
          this.showMovies();
        }
      });
    });

    this.loadButton.addEventListener('click', () => {
      this.pageCount++;
      this.preloader.show();
      this.addMovies(this.currentUrl);
    });
  };

  public init = (): void => {
    this.render();
    this.getElements();
    this.addComponents();
    this.addMovies(this.currentUrl);
    this.addListeners();
  };
}
