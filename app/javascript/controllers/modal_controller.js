import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['modal', 'content'];

  connect() {
    this.boundCloseOnEscape = this.closeOnEscape.bind(this);
  }

  open() {
    this.modalTarget.classList.remove('hidden');
    this.modalTarget.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', this.boundCloseOnEscape);
  }

  close() {
    this.modalTarget.classList.remove('flex');
    this.modalTarget.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', this.boundCloseOnEscape);
  }

  closeOnBackdrop(event) {
    if (event.target === this.modalTarget) {
      this.close();
    }
  }

  closeOnEscape(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}
