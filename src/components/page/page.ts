interface IData {
  name: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export default class Page {
  container: HTMLDivElement;
  preloader!: HTMLDivElement;
  moviesContainer!: HTMLDivElement;
  searchInput!: HTMLInputElement;

  loadButton!: HTMLButtonElement;
  movieNowPlayingButton!: HTMLButtonElement;
  moviePopularButton!: HTMLButtonElement;
  movieTopRatedButton!: HTMLButtonElement;
  movieUpcomingButton!: HTMLButtonElement;
  tvPopulartButton!: HTMLButtonElement;
  tvTopRatedButton!: HTMLButtonElement;
  buttons!: Element[];

  pageCount: number;
  currentRequest: string;
  apiKey: string;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;

    this.pageCount = 1;
    this.apiKey = '48fa0c325cf33db96de5b585427f9aa1';
    this.currentRequest = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=`;
  }

  private render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <div class="preloader">
        <div class="preloader__inner">
          <div class="preloader__square">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="preloader__square">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="preloader__square">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="preloader__square">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div class="page__inner">
        <header class="header">
          <div class="container">
            <div class="header__inner">
              <a class="header__logo" href="#">Movie app</a>
              <div class="header__search">
                <label class="visually-hidden" for="movie-search">Search movie</label>
                <input class="header__input" type="search" id="movie-search" placeholder="Search movie" autocomplete="off" autofocus>
              </div>
            </div>
          </div>
        </header>
        <main class="main">
          <div class="container">
            <h1 class="visually-hidden">Movie-app</h1>
            <div class="main__inner">
              <div class="main__top">
                <button class="main__button active-btn" type="button" data-button="movie-popular">Popular</button>
                <button class="main__button" type="button" data-button="movie-now-playing">Now playing</button>
                <button class="main__button" type="button" data-button="movie-top-rated">Top rated</button>
                <button class="main__button" type="button" data-button="movie-upcoming">Upcoming</button>
                <button class="main__button" type="button" data-button="tv-popular">Popular (TV)</button>
                <button class="main__button" type="button" data-button="tv-top-rated">Top rated (TV)</button>
              </div>
              <div class="main__movies"></div>
              <button class="main__button" type="button" data-button="load">Load more</button>
            </div>
          </div>
        </main>
        <footer class="footer">
          <div class="container">
            <div class="footer__inner">
              <a class="footer__github" href="https://github.com/viGITory">viGITory</a>
              <time class="footer__year">2022</time>
              <a class="footer__logo" href="https://rs.school/js">RSSchool</a>
            </div>
          </div>
        </footer>
      </div>
    `;

    return this.container;
  };

  private getElements = (): void => {
    this.preloader = this.container.querySelector(
      '.preloader'
    ) as HTMLDivElement;
    this.moviesContainer = this.container.querySelector(
      '.main__movies'
    ) as HTMLDivElement;
    this.searchInput = this.container.querySelector(
      '.header__input'
    ) as HTMLInputElement;
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
    this.buttons = [...this.container.querySelectorAll('[data-button]')];
  };

  private hidePreloader = (): void => {
    this.preloader.classList.add('hide');
    this.moviesContainer.classList.remove('hide');
  };

  private showPreloader = (): void => {
    this.preloader.classList.remove('hide');
    this.moviesContainer.classList.add('hide');
  };

  private getData = async (url: string) => {
    const result = await fetch(url);
    const data = await result.json();

    setTimeout(() => {
      if (result.status !== 200) {
        this.moviesContainer.innerHTML = `
          <p class="main__error">Something went wrong :(</p>
        `;
      }

      this.hidePreloader();
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
          <p class="movie__description">${item.overview}</p>
          <p class="movie__rate">${item.vote_average}</p>
        `;

        this.moviesContainer.append(movie);
      });
    } catch (err) {}
  };

  private addListeners = (): void => {
    this.searchInput.addEventListener('change', () => {
      if (this.searchInput.value !== '') {
        this.pageCount = 1;
        this.currentRequest = `https://api.themoviedb.org/3/search/movie?query=${this.searchInput.value}&api_key=${this.apiKey}&page=`;
        this.moviesContainer.innerHTML = '';

        this.buttons.forEach((elem) => {
          elem.classList.remove('active-btn');
        });

        this.showPreloader();
        this.addMovies(this.currentRequest);
      }
    });

    this.buttons.forEach((item) => {
      item.addEventListener('click', () => {
        if (item === this.loadButton) this.pageCount++;
        else if (item === this.movieNowPlayingButton)
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

        if (item !== this.loadButton) {
          this.buttons.forEach((elem) => {
            elem.classList.remove('active-btn');
          });
          item.classList.add('active-btn');

          this.pageCount = 1;
          this.moviesContainer.innerHTML = '';
        }

        this.showPreloader();
        this.addMovies(this.currentRequest);
      });
    });
  };

  public init = (): void => {
    this.render();
    this.getElements();
    this.addMovies(this.currentRequest);
    this.addListeners();
  };
}
