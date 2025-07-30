import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['modal', 'content'];

  connect() {
    // Pre-bind the escape handler so we can easily add/remove it
    this.boundCloseOnEscape = this.closeOnEscape.bind(this);
  }

  open() {
    this.showModal();
    this.preventBodyScroll();
    this.enableEscapeClose();
  }

  close() {
    this.hideModal();
    this.restoreBodyScroll();
    this.disableEscapeClose();
  }

  closeOnBackdrop(event) {
    // Only close if user clicked the backdrop, not the modal content
    if (event.target === this.modalTarget) {
      this.close();
    }
  }

  closeOnEscape(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Helper methods
  showModal() {
    this.modalTarget.classList.remove('hidden');
    this.modalTarget.classList.add('flex');
  }

  hideModal() {
    this.modalTarget.classList.remove('flex');
    this.modalTarget.classList.add('hidden');
  }

  preventBodyScroll() {
    document.body.classList.add('overflow-hidden');
  }

  restoreBodyScroll() {
    document.body.classList.remove('overflow-hidden');
  }

  enableEscapeClose() {
    document.addEventListener('keydown', this.boundCloseOnEscape);
  }

  disableEscapeClose() {
    document.removeEventListener('keydown', this.boundCloseOnEscape);
  }
}
