import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['modal'];

  open() {
    this.modalTarget.classList.remove('hidden');
    this.modalTarget.classList.add('flex');
  }

  close() {
    this.modalTarget.classList.remove('flex');
    this.modalTarget.classList.add('hidden');
  }
}
