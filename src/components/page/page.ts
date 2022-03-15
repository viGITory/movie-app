import { IMovieData } from '../../scripts/types';

import Header from '../header/header';
import Footer from '../footer/footer';
import Preloader from '../preloader/preloader';
import Movie from '../movie/movie';
import MovieModal from '../movie-modal/movie-modal';

export default class Page {
  private static container = document.getElementById('root') as HTMLDivElement;
  private static currentType = 'movie';
  private static pageCount = 1;
  private static apiKey = '48fa0c325cf33db96de5b585427f9aa1';
  private static currentUrl = `https://api.themoviedb.org/3/${Page.currentType}/popular?api_key=${Page.apiKey}&language=en-US&page=`;

  moviesContainer!: HTMLDivElement;
  themeButton!: HTMLButtonElement;
  searchInput!: HTMLInputElement;
  searchMovieButton!: HTMLButtonElement;
  searchTvButton!: HTMLButtonElement;
  loadButton!: HTMLButtonElement;
  searchButtons!: NodeListOf<HTMLElement>;
  categoryButtons!: NodeListOf<HTMLElement>;

  preloader: Preloader;
  movieModal: MovieModal;

  constructor() {
    this.preloader = new Preloader();
    this.movieModal = new MovieModal();
  }

  private render = (): HTMLDivElement => {
    Page.container.innerHTML = `
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
                <div class="main__movies hide"></div>
              </div>
              <div class="main__bottom">
                <button class="button" type="button" data-type="load">Load more</button>
                <a class="main__scroll-button button" href="#scroll-top">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="1706.667" height="1706.667" viewBox="0 0 1280 1280"><path d="M627 2.1c-5.1 2-20.8 17.4-233.6 230.3-186.1 186.1-228.6 229-230.5 233.1-2 4.2-2.4 6.6-2.4 14.5 0 11.1 1.9 16.2 8.6 22.9 6.2 6.2 11.9 8.5 21.9 8.9 6.9.3 9.6 0 14.5-1.9 5.8-2.1 12-8.2 205-200.7l199-198.6.5 574c.5 542 .6 574.1 2.2 577.7 3.1 6.8 7.6 11.5 14.3 14.8 5.9 2.9 7 3.1 14.7 2.7 9.6-.4 14.3-2.3 20.1-8.1 2.2-2.2 4.9-6 6.1-8.6l2.1-4.6.5-573.9.5-574 198.5 198c159.6 159.2 199.5 198.5 203.5 200.5 6.7 3.2 19.1 3.9 26.7 1.3 7.1-2.3 16.7-11.8 19.1-18.8 2.4-6.9 2.2-17.2-.4-24.3-2-5.6-10.2-13.9-230.3-234C722.3 68 658.3 4.6 655 2.9c-6.6-3.3-20.4-3.7-28-.8z" fill="#030303"/></svg>
                </a>
              </div>
            </div>
          </div>
        </main>
        ${new Footer().render()}
      </div>
    `;

    return Page.container;
  };

  private getElements = (): void => {
    this.moviesContainer = Page.container.querySelector(
      '.main__movies'
    ) as HTMLDivElement;
    this.searchInput = Page.container.querySelector(
      '.header__input'
    ) as HTMLInputElement;
    this.searchMovieButton = Page.container.querySelector(
      '[data-search=movie]'
    ) as HTMLButtonElement;
    this.searchTvButton = Page.container.querySelector(
      '[data-search=tv]'
    ) as HTMLButtonElement;
    this.themeButton = Page.container.querySelector(
      '[data-button=theme]'
    ) as HTMLButtonElement;
    this.loadButton = Page.container.querySelector(
      '[data-type=load]'
    ) as HTMLButtonElement;
    this.searchButtons = Page.container.querySelectorAll('[data-search]');
    this.categoryButtons = Page.container.querySelectorAll('[data-category]');
  };

  private addComponents = (): void => {
    this.moviesContainer.insertAdjacentElement(
      'beforebegin',
      this.preloader.render()
    );
    Page.container.append(this.movieModal.modalContainer);
  };

  private showMovies = (): void => {
    this.moviesContainer.innerHTML = '';
    Page.pageCount = 1;
    this.preloader.show();
    this.moviesContainer.classList.add('hide');
    this.addMovies(Page.currentUrl);
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
      this.moviesContainer.classList.remove('hide');
    }, 2000);

    return data;
  };

  private addMovies = async (url: string): Promise<void> => {
    try {
      const data = await this.getData(url + Page.pageCount);

      data.results.forEach((item: IMovieData) => {
        const movie = new Movie().render(item);

        movie.addEventListener('click', async () => {
          const actors = await this.getData(
            `https://api.themoviedb.org/3/${Page.currentType}/${item.id}/credits?api_key=${Page.apiKey}&language=en-US`
          );
          const videos = await this.getData(
            `https://api.themoviedb.org/3/${Page.currentType}/${item.id}/videos?api_key=${Page.apiKey}&language=en-US`
          );
          const genres = await this.getData(
            `https://api.themoviedb.org/3/${Page.currentType}/${item.id}?api_key=${Page.apiKey}&language=en-US`
          );

          this.movieModal.render(item, actors, videos, genres);
          this.movieModal.addListeners();
          this.movieModal.show();
        });

        this.moviesContainer.append(movie);
      });
    } catch (err) {}
  };

  private addListeners = (): void => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(
        'vigitory-movieapp-theme',
        document.documentElement.className
      );
    });

    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.className =
        localStorage.getItem('vigitory-movieapp-theme') || '';
    });

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

    this.themeButton.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-theme');
    });

    this.searchInput.addEventListener('change', () => {
      if (this.searchInput.value !== '') {
        this.searchInput.value = this.searchInput.value.trim();

        if (this.searchMovieButton.classList.contains('active-btn')) {
          Page.currentType = 'movie';
        } else if (this.searchTvButton.classList.contains('active-btn')) {
          Page.currentType = 'tv';
        }

        Page.currentUrl = `https://api.themoviedb.org/3/search/${Page.currentType}?query=${this.searchInput.value}&api_key=${Page.apiKey}&page=`;
        this.showMovies();

        this.categoryButtons.forEach((elem) => {
          elem.classList.remove('active-btn');
        });
      }
    });

    this.searchButtons.forEach((item) => {
      item.addEventListener('click', () => {
        Page.currentType = `${item.dataset['search']}`;

        if (this.searchInput.value && !item.classList.contains('active-btn')) {
          Page.currentUrl = `https://api.themoviedb.org/3/search/${Page.currentType}?query=${this.searchInput.value}&api_key=${Page.apiKey}&page=`;
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
        Page.currentUrl = `https://api.themoviedb.org/3/${item.dataset['type']}/${item.dataset['category']}?api_key=${Page.apiKey}&language=en-US&page=`;
        Page.currentType = `${item.dataset['type']}`;

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
      Page.pageCount++;
      this.preloader.show();
      this.moviesContainer.classList.add('hide');
      this.addMovies(Page.currentUrl);
    });
  };

  public init = (): void => {
    this.render();
    this.getElements();
    this.addComponents();
    this.addMovies(Page.currentUrl);
    this.addListeners();
  };
}
