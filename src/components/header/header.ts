export default class Header {
  public render = (): string => {
    return `
      <header class="header" id="scroll-top">
        <div class="container">
          <div class="header__inner">
            <a class="header__logo" href="index.html">Movie<span class="header__logo-short">App</span></a>
            <div class="header__search">
              <label class="visually-hidden" for="movie-search">Search movie</label>
              <input class="header__input" type="search" id="movie-search" placeholder="Search movie" autocomplete="off" autofocus>
              <div class="header__search-buttons">
                <button class="button active-btn" type="button" data-search="movie">Movie</button>
                <button class="button" type="button" data-search="tv">TV</button>
              </div>
            </div>
            <button class="button" type="button" data-button="theme">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" version="1.1"><path d="M 7.5 2 C 5.71 3.15 4.5 5.18 4.5 7.5 C 4.5 9.82 5.71 11.85 7.53 13 C 4.46 13 2 10.54 2 7.5 A 5.5 5.5 0 0 1 7.5 2 M 19.07 3.5 L 20.5 4.93 L 4.93 20.5 L 3.5 19.07 L 19.07 3.5 M 12.89 5.93 L 11.41 5 L 9.97 6 L 10.39 4.3 L 9 3.24 L 10.75 3.12 L 11.33 1.47 L 12 3.1 L 13.73 3.13 L 12.38 4.26 L 12.89 5.93 M 9.59 9.54 L 8.43 8.81 L 7.31 9.59 L 7.65 8.27 L 6.56 7.44 L 7.92 7.35 L 8.37 6.06 L 8.88 7.33 L 10.24 7.36 L 9.19 8.23 L 9.59 9.54 M 19 13.5 A 5.5 5.5 0 0 1 13.5 19 C 12.28 19 11.15 18.6 10.24 17.93 L 17.93 10.24 C 18.6 11.15 19 12.28 19 13.5 M 14.6 20.08 L 17.37 18.93 L 17.13 22.28 L 14.6 20.08 M 18.93 17.38 L 20.08 14.61 L 22.28 17.15 L 18.93 17.38 M 20.08 12.42 L 18.94 9.64 L 22.28 9.88 L 20.08 12.42 M 9.63 18.93 L 12.4 20.08 L 9.87 22.27 L 9.63 18.93 Z" /></svg>
            </button>
          </div>
        </div>
      </header>
    `;
  };
}
