interface IData {
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export default class Page {
  container: HTMLDivElement;
  main!: HTMLDivElement;
  searchInput!: HTMLInputElement;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;
  }

  private render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <div class="page__inner">
        <header class="header">
          <div class="container">
            <div class="header__inner">
              <a class="header__logo" href="#">Movie app</a>
              <div class="header__search">
                <label class="visually-hidden" for="movie-search">Search movie</label>
                <input class="header__input" type="search" id="movie-search" placeholder="Search movie">
              </div>
            </div>
          </div>
        </header>
        <main class="main">
          <div class="container">
            <h1 class="visually-hidden">Movie-app</h1>
            <div class="main__inner"></div>
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
    this.main = this.container.querySelector('.main__inner') as HTMLDivElement;
    this.searchInput = this.container.querySelector(
      '.header__input'
    ) as HTMLInputElement;
  };

  private getData = async (url: string) => {
    const result = await fetch(url);
    const data = await result.json();

    return data;
  };

  private renderMovie = (data: any) => {
    data.results.forEach((item: IData) => {
      let movie = document.createElement('article');
      movie.classList.add('movie');

      movie.innerHTML = `
        <h3 class="movie__title">${item.title}</h3>
        <div class="movie__poster-wrapper">
          <img class="movie__poster" src="https://image.tmdb.org/t/p/w1280${item.poster_path}">
        </div>
        <p class="movie__description">${item.overview}</p>
        <p class="movie__rate">${item.vote_average}</p>
      `;

      this.main.append(movie);
    });
  };

  private addMovies = async (): Promise<void> => {
    try {
      const data = await this.getData(
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=48fa0c325cf33db96de5b585427f9aa1'
      );

      this.renderMovie(data);
    } catch (err) {}
  };

  private addListeners = (): void => {
    this.searchInput.addEventListener('change', async () => {
      if (this.searchInput.value !== '') {
        try {
          const data = await this.getData(
            `https://api.themoviedb.org/3/search/movie?query=${this.searchInput.value}&api_key=48fa0c325cf33db96de5b585427f9aa1`
          );

          this.main.innerHTML = '';
          this.renderMovie(data);
        } catch (err) {}
      }
    });
  };

  public init = (): void => {
    this.render();
    this.getElements();
    this.addMovies();
    this.addListeners();
  };
}
