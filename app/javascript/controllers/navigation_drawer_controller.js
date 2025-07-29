import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['panel', 'backdrop', 'closeButton', 'menuContent'];

  connect() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
    this.lastDesktopCollapsedState = false;
    this.wasDesktop = window.innerWidth >= 768;
  }

  disconnect() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop && !this.wasDesktop) {
      this.close();

      if (this.lastDesktopCollapsedState) {
        this.panelTarget.classList.add('collapsed-sidebar');
        this.menuContentTargets.forEach((element) => {
          element.classList.add('hidden');
        });
        document.body.classList.add('sidebar-collapsed');
      } else {
        this.panelTarget.classList.remove('collapsed-sidebar');
        this.menuContentTargets.forEach((element) => {
          element.classList.remove('hidden');
        });
        document.body.classList.remove('sidebar-collapsed');
      }
    } else if (!isDesktop && this.wasDesktop) {
      this.lastDesktopCollapsedState = this.panelTarget.classList.contains('collapsed-sidebar');

      this.panelTarget.classList.remove('collapsed-sidebar');
      this.menuContentTargets.forEach((element) => {
        element.classList.remove('hidden');
      });
      document.body.classList.remove('sidebar-collapsed');
    } else if (!isDesktop) {
      this.close();
    }

    this.wasDesktop = isDesktop;
  }

  toggle() {
    if (this.panelTarget.classList.contains('-translate-x-full')) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.panelTarget.classList.remove('-translate-x-full');
    this.backdropTarget.classList.remove('hidden');
    this.closeButtonTarget.style.left = '260px';
    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.panelTarget.classList.add('-translate-x-full');
    this.backdropTarget.classList.add('hidden');
    this.closeButtonTarget.style.left = '-28px';
    document.body.classList.remove('overflow-hidden');
  }

  toggleDesktop() {
    if (window.innerWidth < 768) return;

    const isCollapsed = this.panelTarget.classList.contains('collapsed-sidebar');

    if (isCollapsed) {
      this.expandSidebar();
    } else {
      this.collapseSidebar();
    }
  }

  expandSidebar() {
    this.panelTarget.classList.remove('collapsed-sidebar');
    this.menuContentTargets.forEach((element) => {
      element.classList.remove('hidden');
    });
    document.body.classList.remove('sidebar-collapsed');
    this.lastDesktopCollapsedState = false;
  }

  collapseSidebar() {
    this.panelTarget.classList.add('collapsed-sidebar');
    this.menuContentTargets.forEach((element) => {
      element.classList.add('hidden');
    });
    document.body.classList.add('sidebar-collapsed');
    this.lastDesktopCollapsedState = true;
  }
}
