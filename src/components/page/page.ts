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
  loadButton!: HTMLButtonElement;
  searchButtons!: NodeListOf<HTMLElement>;
  categoryButtons!: NodeListOf<HTMLElement>;

  preloader: Preloader;
  movieModal: MovieModal;

  pageCount: number;
  currentUrl: string;
  apiKey: string;
  currentType: string;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;
    this.preloader = new Preloader();
    this.movieModal = new MovieModal();

    this.currentType = 'movie';
    this.pageCount = 1;
    this.apiKey = '48fa0c325cf33db96de5b585427f9aa1';
    this.currentUrl = `https://api.themoviedb.org/3/${this.currentType}/popular?api_key=${this.apiKey}&language=en-US&page=`;
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
                <button class="button active-btn" type="button" data-type="movie" data-category="popular">Popular</button>
                <button class="button" type="button" data-type="movie" data-category="now_playing">Now playing</button>
                <button class="button" type="button" data-type="movie" data-category="top_rated">Top rated</button>
                <button class="button" type="button" data-type="movie" data-category="upcoming">Upcoming</button>
                <button class="button" type="button" data-type="tv" data-category="popular">Popular (TV)</button>
                <button class="button" type="button" data-type="tv" data-category="top_rated">Top rated (TV)</button>
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
    this.loadButton = this.container.querySelector(
      '[data-type=load]'
    ) as HTMLButtonElement;
    this.searchButtons = this.container.querySelectorAll('[data-search]');
    this.categoryButtons = this.container.querySelectorAll('[data-category]');
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

        movie.addEventListener('click', async () => {
          const actors = await this.getData(
            `https://api.themoviedb.org/3/${this.currentType}/${item.id}/credits?api_key=${this.apiKey}&language=en-US`
          );
          const videos = await this.getData(
            `https://api.themoviedb.org/3/${this.currentType}/${item.id}/videos?api_key=${this.apiKey}&language=en-US`
          );

          this.movieModal.render(item, actors, videos);
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
    });

    this.searchInput.addEventListener('change', () => {
      if (this.searchInput.value !== '') {
        this.searchInput.value = this.searchInput.value.trim();

        if (this.searchMovieButton.classList.contains('active-btn')) {
          this.currentType = 'movie';
        } else if (this.searchTvButton.classList.contains('active-btn')) {
          this.currentType = 'tv';
        }

        this.currentUrl = `https://api.themoviedb.org/3/search/${this.currentType}?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;
        this.showMovies();

        this.categoryButtons.forEach((elem) => {
          elem.classList.remove('active-btn');
        });
      }
    });

    this.searchButtons.forEach((item) => {
      item.addEventListener('click', () => {
        this.currentType = `${item.dataset['search']}`;

        if (this.searchInput.value && !item.classList.contains('active-btn')) {
          this.currentUrl = `https://api.themoviedb.org/3/search/${this.currentType}?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;
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

    this.categoryButtons.forEach((item) => {
      item.addEventListener('click', () => {
        this.currentUrl = `https://api.themoviedb.org/3/${item.dataset['type']}/${item.dataset['category']}?api_key=${this.apiKey}&language=en-US&page=`;
        this.currentType = `${item.dataset['type']}`;

        if (!item.classList.contains('active-btn')) {
          this.categoryButtons.forEach((elem) => {
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
