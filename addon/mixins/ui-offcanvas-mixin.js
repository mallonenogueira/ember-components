import Mixin from '@ember/object/mixin';
import { set, get } from '@ember/object';

export default Mixin.create({
  outletsArray: [],

  getOutlets() {
    const outlets = get(this, 'outletsArray') || [];

    if (!get(this, 'outletsArray')) {
      set(this, 'outletsArray', outlets);
    }

    return outlets;
  },

  showCanvas(template) {
    const outlets = this.getOutlets();

    outlets.pushObject(template);

    this.render(template, {
      into: 'application',
      outlet: `outlet-canvas-${outlets.length - 1}`
    });
  },

  closeCanvas() {
    const outlets = this.getOutlets();

    if (outlets && outlets.length > 0) {
      const offcanvas = document
        .querySelector('.offcanvas:last-child');

      offcanvas.addEventListener('transitionend', () => {
        outlets.popObject();
        this.disconnectOutlet(`outlet-canvas-${outlets.length}`);
      });

      offcanvas.classList.remove('offcanvas--visible');
    }
  },

  actions: {
    showOffCanvas(template) {
      this.showCanvas(template);
    },

    closeOffCanvas() {
      this.closeCanvas();
    },
  }
});
