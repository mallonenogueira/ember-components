import Component from '@ember/component';
import { set }  from '@ember/object';
import { later } from '@ember/runloop';
import layout from './template';

export default Component.extend({
  layout,
  classNames:['offcanvas'],
  classNameBindings:['visible:offcanvas--visible'],

  init() {
    this._super(...arguments);

    later(() => {
      set(this, 'visible', true);
    }, 50);
  },
});
