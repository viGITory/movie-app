import '../styles/style.scss';

import Page from '../components/page/page';

new Page().init();

// ### PWA ###
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').catch();
}
