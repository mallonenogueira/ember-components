import Component from '@ember/component';
import layout from './template';
import { get, computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['tabs__item'],
  classNameBindings: [
    'tab.disabled:tabs__item--disabled',
    'tab.isLoading:tabs__item--loading',
    'active:tabs__item--active',
  ],

  active: computed('current', function isEq() {
    return get(this, 'tab') === get(this, 'current');
  }),

  click(event) {
    if (get(this, 'onClick') && !get(this, 'tab.disabled')) {
      get(this, 'onClick')({ component: this, event });
    }
  }
});
