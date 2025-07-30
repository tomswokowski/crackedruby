import { Application } from '@hotwired/stimulus';

const application = Application.start();

application.debug = false;
window.Stimulus = application;

document.addEventListener('turbo:load', () => {
  const isIOSChrome = /CriOS/.test(navigator.userAgent);

  if (isIOSChrome) {
    window.scrollTo(0, -1);
    setTimeout(() => window.scrollTo(0, 0), 1);
  } else {
    window.scrollTo(0, 0);
  }
});

export { application };
