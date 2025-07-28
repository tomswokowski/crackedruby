import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    this.lastScroll = window.scrollY;
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
    this.threshold = 100;
  }

  disconnect() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll <= this.threshold) {
      this.element.classList.remove('-translate-y-full');
      return;
    }

    if (currentScroll > this.lastScroll) {
      this.element.classList.add('-translate-y-full');
    } else {
      this.element.classList.remove('-translate-y-full');
    }

    this.lastScroll = currentScroll;
  }
}
