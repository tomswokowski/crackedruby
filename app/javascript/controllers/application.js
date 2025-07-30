import { Application } from '@hotwired/stimulus';

const application = Application.start();

application.debug = false;
window.Stimulus = application;

// Scroll to top on every page load/navigation
document.addEventListener('turbo:load', () => {
  const isIOSChrome = /CriOS/.test(navigator.userAgent);

  if (isIOSChrome) {
    // Scroll slightly past top, then back to true top to force recalculation
    window.scrollTo(0, -1);
    setTimeout(() => window.scrollTo(0, 0), 1);
  } else {
    // Normal scroll to top for all other browsers
    window.scrollTo(0, 0);
  }
});

export { application };
