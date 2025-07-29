import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    this.lastScroll = window.scrollY;
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
    this.threshold = 100;
    this.tolerance = 5;
    this.ticking = false;
  }

  disconnect() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateHeader();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateHeader() {
    const currentScroll = window.scrollY;
    const scrollDifference = Math.abs(currentScroll - this.lastScroll);

    if (scrollDifference < this.tolerance) {
      return;
    }

    if (currentScroll <= this.threshold) {
      this.element.classList.remove('-translate-y-full');
      this.lastScroll = currentScroll;
      return;
    }

    if (currentScroll > this.lastScroll && scrollDifference > this.tolerance) {
      this.element.classList.add('-translate-y-full');
    } else if (currentScroll < this.lastScroll && scrollDifference > this.tolerance) {
      this.element.classList.remove('-translate-y-full');
    }

    this.lastScroll = currentScroll;
  }
}
