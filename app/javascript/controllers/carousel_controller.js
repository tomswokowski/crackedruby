import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['pane', 'fade', 'leftBtn', 'rightBtn'];

  connect() {
    this.pointerQuery = window.matchMedia('(pointer: coarse)');
    this.isCoarse = this.pointerQuery.matches;
    this.pointerListener = (e) => {
      this.isCoarse = e.matches;
      this.update();
    };
    this.pointerQuery.addEventListener?.('change', this.pointerListener);

    this.boundUpdate = this.update.bind(this);
    this.paneTarget.addEventListener('scroll', this.boundUpdate, { passive: true });
    window.addEventListener('resize', this.boundUpdate);

    this.boundKeydown = this.handleKeydown.bind(this);
    this.paneTarget.addEventListener('keydown', this.boundKeydown);

    this.update();
  }

  disconnect() {
    this.paneTarget.removeEventListener('scroll', this.boundUpdate);
    window.removeEventListener('resize', this.boundUpdate);
    this.paneTarget.removeEventListener('keydown', this.boundKeydown);
    this.pointerQuery?.removeEventListener?.('change', this.pointerListener);
  }

  update() {
    const { scrollLeft, clientWidth, scrollWidth } = this.paneTarget;
    const atStart = scrollLeft <= 5;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 5;

    if (this.hasFadeTarget) {
      this.fadeTarget.classList.toggle('hidden', this.isCoarse || atEnd);
    }

    const showLeft = !this.isCoarse && !atStart;
    const showRight = !this.isCoarse && !atEnd;

    if (this.hasLeftBtnTarget) this.leftBtnTarget.classList.toggle('hidden', !showLeft);
    if (this.hasRightBtnTarget) this.rightBtnTarget.classList.toggle('hidden', !showRight);
  }

  scrollLeft() {
    this.paneTarget.scrollBy({ left: -this.getCardWidth(), behavior: 'smooth' });
  }

  scrollRight() {
    this.paneTarget.scrollBy({ left: this.getCardWidth(), behavior: 'smooth' });
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
        this.paneTarget.scrollTo({ left: this.paneTarget.scrollWidth, behavior: 'smooth' });
        break;
    }
  }

  getCardWidth() {
    const firstCard = this.paneTarget.querySelector('.snap-start');
    return firstCard ? firstCard.offsetWidth + 16 : 320;
  }
}
