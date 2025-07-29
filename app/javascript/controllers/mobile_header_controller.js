import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    this.lastScroll = window.scrollY;
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
    this.topThreshold = 20;
    this.bottomBuffer = 50;
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

    // Always show when near top
    if (currentScroll <= this.topThreshold) {
      this.element.classList.remove('-translate-y-full');
      this.lastScroll = currentScroll;
      return;
    }

    // Hide when within bottom buffer zone
    if (distanceFromBottom <= this.bottomBuffer) {
      this.element.classList.add('-translate-y-full');
      this.lastScroll = currentScroll;
      return;
    }

    // Handle edge case: if page is too short, always show header
    if (documentHeight - windowHeight < this.topThreshold + this.bottomBuffer) {
      this.element.classList.remove('-translate-y-full');
      this.lastScroll = currentScroll;
      return;
    }

    // Only react to scroll changes greater than tolerance
    if (scrollDifference < this.tolerance) {
      return;
    }

    // Normal scroll behavior in the middle section
    if (currentScroll > this.lastScroll) {
      this.element.classList.add('-translate-y-full');
    } else {
      this.element.classList.remove('-translate-y-full');
    }

    this.lastScroll = currentScroll;
  }
}
