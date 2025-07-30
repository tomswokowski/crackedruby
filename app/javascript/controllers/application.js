import { Application } from '@hotwired/stimulus';

const application = Application.start();

application.debug = false;
window.Stimulus = application;

document.addEventListener('turbo:load', () => {
  window.scrollTo(0, 0);
});

export { application };
