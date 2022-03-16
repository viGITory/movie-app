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
            <button class="button" type="button" data-button="theme" aria-label="theme-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="185.671" cy="183.812" r="65.625" /><path d="M 185.671 87.5622 a 13.1256 13.1256 0 0 0 13.125 -13.125 V 52.5622 a 13.125 13.125 0 1 0 -26.25 0 v 21.875 A 13.1257 13.1257 0 0 0 185.671 87.5622 Z" /><path d="M 99.051 115.752 a 13.1236 13.1236 0 1 0 18.56 -18.56 L 102.144 81.726 a 13.1236 13.1236 0 0 0 -18.5595 18.56 Z" /><path d="M 89.4208 183.812 a 13.1257 13.1257 0 0 0 -13.125 -13.125 H 54.4208 a 13.125 13.125 0 0 0 0 26.25 h 21.875 A 13.1256 13.1256 0 0 0 89.4208 183.812 Z" /><path d="M 99.051 251.872 L 83.5847 267.343 a 13.1236 13.1236 0 1 0 18.56 18.56 l 15.4663 -15.4706 a 13.1236 13.1236 0 1 0 -18.5595 -18.56 Z" /><path d="M 185.671 280.062 a 13.1258 13.1258 0 0 0 -13.125 13.125 v 21.875 a 13.125 13.125 0 0 0 26.25 0 v -21.875 A 13.1257 13.1257 0 0 0 185.671 280.062 Z" /><path d="M 272.291 251.872 a 13.1236 13.1236 0 1 0 -18.56 18.56 l 15.4663 15.4706 a 13.1236 13.1236 0 1 0 18.56 -18.56 Z" /><path d="M 330.046 183.812 a 13.1257 13.1257 0 0 0 -13.125 -13.125 h -21.875 a 13.125 13.125 0 0 0 0 26.25 h 21.875 A 13.1256 13.1256 0 0 0 330.046 183.812 Z" /><path d="M 263.011 119.597 a 13.0824 13.0824 0 0 0 9.28 -3.8452 l 15.4663 -15.4663 a 13.1236 13.1236 0 1 0 -18.56 -18.56 L 253.731 97.1923 a 13.125 13.125 0 0 0 9.28 22.4048 Z" /><path d="M 456.938 401.671 a 63.97 63.97 0 0 1 -14.9963 7.2055 c -19.6448 6.5283 -41.8787 2.9566 -58.1439 -9.8523 a 68.9311 68.9311 0 0 1 -10.835 -10.8339 c -12.8088 -16.2663 -16.3806 -38.5 -9.8523 -58.1471 a 63.8444 63.8444 0 0 1 7.2077 -14.9931 a 8.8036 8.8036 0 0 0 -10.1172 -13.3034 a 87.5188 87.5188 0 1 0 110.037 110.04 A 8.8 8.8 0 0 0 456.938 401.671 Z" /></g></svg>
            </button>
          </div>
        </div>
      </header>
    `;
  };
}
