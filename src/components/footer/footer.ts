export default class Footer {
  public render = (): string => {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer__inner">
            <a class="footer__github" href="https://github.com/viGITory" target="_blank">viGITory</a>
            <time class="footer__year">2022</time>
            <a class="footer__logo" href="https://rs.school/js" target="_blank">RSSchool</a>
          </div>
        </div>
      </footer>
    `;
  };
}
