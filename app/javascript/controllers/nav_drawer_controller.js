import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['panel', 'backdrop', 'closeButton', 'menuContent'];

  connect() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // Auto-close mobile nav when navigating to prevent flash
    document.addEventListener('turbo:before-visit', () => {
      if (window.innerWidth < 768) {
        this.close();
      }
    });

    // Remember the last collapsed state and check if we're on desktop
    this.lastDesktopCollapsedState = window.sidebarCollapsed || false;
    this.wasDesktop = window.innerWidth >= 768;

    // If we're on desktop and sidebar was collapsed, restore that state
    if (this.wasDesktop && this.lastDesktopCollapsedState) {
      this.applySidebarCollapse();
    }
  }

  disconnect() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const isDesktop = window.innerWidth >= 768;

    // Switching from mobile to desktop
    if (isDesktop && !this.wasDesktop) {
      this.close(); // Close mobile drawer first

      if (this.lastDesktopCollapsedState) {
        this.applySidebarCollapse();
      } else {
        this.applySidebarExpansion();
      }
    }
    // Switching from desktop to mobile
    else if (!isDesktop && this.wasDesktop) {
      // Remember current desktop state before switching
      this.lastDesktopCollapsedState = this.panelTarget.classList.contains('collapsed-sidebar');

      // Disable transitions temporarily for smooth mobile switch
      if (this.lastDesktopCollapsedState) {
        this.panelTarget.style.transition = 'none';
        this.panelTarget.offsetHeight; // Force reflow
      }

      this.applySidebarExpansion();

      // Re-enable transitions
      if (this.lastDesktopCollapsedState) {
        requestAnimationFrame(() => {
          this.panelTarget.style.transition = '';
        });
      }
    }
    // Already mobile, make sure drawer is closed
    else if (!isDesktop) {
      this.close();
    }

    this.wasDesktop = isDesktop;
  }

  // Mobile drawer controls
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
    this.closeButtonTarget.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.panelTarget.classList.add('-translate-x-full');
    this.backdropTarget.classList.add('hidden');
    this.closeButtonTarget.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  // Desktop sidebar controls
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
    this.applySidebarExpansion();
    this.lastDesktopCollapsedState = false;
    window.sidebarCollapsed = false;
  }

  collapseSidebar() {
    this.applySidebarCollapse();
    this.lastDesktopCollapsedState = true;
    window.sidebarCollapsed = true;
  }

  // Helper methods to keep the class manipulation DRY
  applySidebarCollapse() {
    this.panelTarget.classList.add('collapsed-sidebar');
    this.hideMenuContent();
    document.body.classList.add('sidebar-collapsed');
  }

  applySidebarExpansion() {
    this.panelTarget.classList.remove('collapsed-sidebar');
    this.showMenuContent();
    document.body.classList.remove('sidebar-collapsed');
  }

  hideMenuContent() {
    this.menuContentTargets.forEach((element) => {
      element.classList.add('hidden');
    });
  }

  showMenuContent() {
    this.menuContentTargets.forEach((element) => {
      element.classList.remove('hidden');
    });
  }
}
