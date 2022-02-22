export default class Header {
  public render = (): string => {
    return `
      <header class="header">
        <div class="container">
          <div class="header__inner">
            <a class="header__logo" href="index.html">Movie app</a>
            <div class="header__search">
              <label class="visually-hidden" for="movie-search">Search movie</label>
              <input class="header__input" type="search" id="movie-search" placeholder="Search movie" autocomplete="off" autofocus>
              <div class="header__search-buttons">
                <button class="button active-btn" type="button" data-search="movie">Movie</button>
                <button class="button" type="button" data-search="tv">TV</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  };
}
