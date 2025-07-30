import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['pane', 'fade'];

  connect() {
    // Pre-bind handlers for efficient add/remove
    this.boundUpdate = this.update.bind(this);

    this.paneTarget.addEventListener('scroll', this.boundUpdate, { passive: true });
    window.addEventListener('resize', this.boundUpdate);
    this.update(); // Check initial state
  }

  disconnect() {
    this.paneTarget.removeEventListener('scroll', this.boundUpdate);
    window.removeEventListener('resize', this.boundUpdate);
  }

  update() {
    // Hide fade on mobile - carousel doesn't need fade indicator
    if (window.innerWidth < 768) {
      this.fadeTarget.classList.add('hidden');
      return;
    }

    // Check if scrolled to the end and toggle fade accordingly
    const { scrollLeft, clientWidth, scrollWidth } = this.paneTarget;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
    this.fadeTarget.classList.toggle('hidden', atEnd);
  }
}
