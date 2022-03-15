export default class Preloader {
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div') as HTMLDivElement;
    this.container.classList.add('preloader');
  }

  public render = (): HTMLDivElement => {
    this.container.innerHTML = `
      <div class="preloader__inner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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
