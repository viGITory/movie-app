class Preloader {
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('preloader');
  }

  public render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <div class="preloader__inner">
        <span class="preloader__item">L</span>
        <span class="preloader__item">o</span>
        <span class="preloader__item">a</span>
        <span class="preloader__item">d</span>
        <span class="preloader__item">i</span>
        <span class="preloader__item">n</span>
        <span class="preloader__item">g</span>
      </div>
    `;

    return this.container;
  };

  public hide = (): void => {
    this.container.classList.add('hide');
  };

  public show = (): void => {
    this.container.classList.remove('hide');
  };
}

const preloader = new Preloader();
export default preloader;
