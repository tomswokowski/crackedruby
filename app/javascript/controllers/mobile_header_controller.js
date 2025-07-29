import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    this.lastScroll = window.scrollY;
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
    this.threshold = 100;
    this.tolerance = 10;
  }

  disconnect() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentScroll = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const distanceFromBottom = documentHeight - (currentScroll + windowHeight);
    const scrollDifference = Math.abs(currentScroll - this.lastScroll);

    if (currentScroll <= this.threshold) {
      this.element.classList.remove('-translate-y-full');
      this.lastScroll = currentScroll;
      return;
    }

    if (distanceFromBottom <= this.threshold) {
      this.element.classList.remove('-translate-y-full');
      this.lastScroll = currentScroll;
      return;
    }

    if (scrollDifference < this.tolerance) {
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
