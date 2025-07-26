import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['pane', 'fade'];

  connect() {
    this.boundUpdate = this.update.bind(this);
    this.paneTarget.addEventListener('scroll', this.boundUpdate, { passive: true });
    window.addEventListener('resize', this.boundUpdate);
    this.update();
  }

  disconnect() {
    this.paneTarget.removeEventListener('scroll', this.boundUpdate);
    window.removeEventListener('resize', this.boundUpdate);
  }

  update() {
    if (window.innerWidth < 768) {
      this.fadeTarget.classList.add('hidden');
      return;
    }

    const { scrollLeft, clientWidth, scrollWidth } = this.paneTarget;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
    this.fadeTarget.classList.toggle('hidden', atEnd);
  }
}
