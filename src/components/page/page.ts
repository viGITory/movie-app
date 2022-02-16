export default class Page {
  container: HTMLDivElement;

  constructor() {
    this.container = document.getElementById('root') as HTMLDivElement;
  }

  private render = (): HTMLDivElement => {
    this.container.innerHTML = ``;

    return this.container;
  };

  public init = (): void => {
    this.render();
  };
}
