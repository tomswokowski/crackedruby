import { Application } from '@hotwired/stimulus';

const application = Application.start();

application.debug = false;
window.Stimulus = application;

document.addEventListener('turbo:load', () => {
  setTimeout(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 0);
});

export { application };
