import layout from './template';
import Component from '@ember/component';
import { getOwner }  from '@ember/application';
import { scheduleOnce }  from '@ember/runloop';
import { get, set, computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['tabs'],
  classNameBindings: ['vertical:tabs--vertical'],
  route: 'application',

  init() {
    this._super(...arguments);
    const { items, template } = get(this, 'tabs') || {};

    if (items) {
      items.forEach((item) => {
        if (item.visible === undefined) {
          set(item, 'visible', true);
        }

        if (item.tabs && !item.tabs.template) {
          set(item.tabs, 'template', template);
        }
      });
    }
  },

  didInsertElement() {
    const tabs = get(this, 'tabs');
    const current = tabs.currentTab || tabs.items[0];

    scheduleOnce('afterRender', () => {
      this.send('showTab', current);
    });
  },

  outlet: computed('tabs.template', function getOutlet() {
    return this.tabs.template.replace(new RegExp('.', 'g'), '-');
  }),

  didDestroyElement() {
    getOwner(this)
      .lookup(`route:${this.route}`)
      .disconnectOutlet(this.outlet);

    set(this, 'tabs.currentTab', null);
  },

  renderOutlet(template, model) {
    getOwner(this)
      .lookup(`route:${this.route}`)
      .render(template, {
        into: this.tabs.template,
        outlet: this.outlet,
        model
      });
  },

  actions: {
    async showTab(tab) {
      if (get(this, 'tabs.currentTab') === tab) {
        return;
      }

      const onClick = tab.onClick || (() => {});
      set(tab, 'isLoading', true);
      set(tab, 'erro', false);

      try {
        const result = await onClick({ component: this });

        set(this, 'tabs.currentTab', tab);

        if (!tab.tabs) {
          this.renderOutlet(tab.template, {
            result,
            tab,
          });
        }

      } catch(err) {
        set(tab, 'erro', true);
      }

      set(tab, 'isLoading', false);
    },
  }
});
