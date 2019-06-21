import EmberObject from '@ember/object';
import UiOffcanvasMixinMixin from 'm-components/mixins/ui-offcanvas-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | ui-offcanvas-mixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let UiOffcanvasMixinObject = EmberObject.extend(UiOffcanvasMixinMixin);
    let subject = UiOffcanvasMixinObject.create();
    assert.ok(subject);
  });
});
