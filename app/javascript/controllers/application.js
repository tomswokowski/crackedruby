import { Application } from '@hotwired/stimulus';

const application = Application.start();

application.debug = false;
window.Stimulus = application;

document.addEventListener('turbo:load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export { application };
