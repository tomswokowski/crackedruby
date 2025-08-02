import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['pane', 'fade', 'leftBtn', 'rightBtn'];

  connect() {
    // Pre-bind handlers for efficient add/remove
    this.boundUpdate = this.update.bind(this);

    this.paneTarget.addEventListener('scroll', this.boundUpdate, { passive: true });
    window.addEventListener('resize', this.boundUpdate);

    // Keyboard navigation
    this.boundKeydown = this.handleKeydown.bind(this);
    this.paneTarget.addEventListener('keydown', this.boundKeydown);

    this.update(); // Check initial state
  }

  disconnect() {
    this.paneTarget.removeEventListener('scroll', this.boundUpdate);
    window.removeEventListener('resize', this.boundUpdate);
    this.paneTarget.removeEventListener('keydown', this.boundKeydown);
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

    // Update button states for desktop navigation
    this.updateButtonStates();
  }

  scrollLeft() {
    const cardWidth = this.getCardWidth();
    this.paneTarget.scrollBy({
      left: -cardWidth, // Scroll by 1 card
      behavior: 'smooth',
    });
  }

  scrollRight() {
    const cardWidth = this.getCardWidth();
    this.paneTarget.scrollBy({
      left: cardWidth, // Scroll by 1 card
      behavior: 'smooth',
    });
  }

  handleKeydown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.scrollLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.scrollRight();
        break;
      case 'Home':
        event.preventDefault();
        this.paneTarget.scrollTo({ left: 0, behavior: 'smooth' });
        break;
      case 'End':
        event.preventDefault();
        this.paneTarget.scrollTo({
          left: this.paneTarget.scrollWidth,
          behavior: 'smooth',
        });
        break;
    }
  }

  updateButtonStates() {
    const { scrollLeft, clientWidth, scrollWidth } = this.paneTarget;

    // Show/hide left button
    if (this.hasLeftBtnTarget) {
      const atStart = scrollLeft <= 5;
      this.leftBtnTarget.classList.toggle('md:hidden', atStart);
    }

    // Show/hide right button
    if (this.hasRightBtnTarget) {
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;
      this.rightBtnTarget.classList.toggle('md:hidden', atEnd);
    }
  }

  getCardWidth() {
    const firstCard = this.paneTarget.querySelector('.snap-start');
    if (firstCard) {
      return firstCard.offsetWidth + 16; // Include gap between cards
    }
    return 320; // Fallback width
  }
}
