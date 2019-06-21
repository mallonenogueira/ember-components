import Component from '@ember/component';
import layout from './template';
import { get, set } from '@ember/object';
import { getOwner } from '@ember/application';

export default Component.extend({
  layout,

  init() {
    this._super(...arguments);

    if (!get(this, 'outlets')) {
      set(this, 'outlets', getOwner(this).lookup('route:application').outletsArray);
    }
  },
});
