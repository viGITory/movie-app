export default class Page {
  container: HTMLDivElement;
  main!: HTMLDivElement;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;
  }

  private render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <header class="header">
        <div class="container">
          <a class="logo" href="#"></a>
          <div class="search">
            <label class="visually-hidden" for="movie-search">Search movie</label>
            <input type="search" id="movie-search" placeholder="Search movie">
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
          <a class="footer__github" href="https://github.com/viGITory">viGITory</a>
          <time class="footer__year">2022</time>
          <a class="footer__logo" href="https://rs.school/js">RSSchool</a>
        </div>
      </footer>
    `;

    return this.container;
  };

  private getElements = (): void => {
    this.main = this.container.querySelector('.main__inner') as HTMLDivElement;
  };

  private getData = async (url: string) => {
    const result = await fetch(url);
    const data = await result.json();

    return data;
  };

  public init = (): void => {
    this.render();
    this.getElements();
  };
}
