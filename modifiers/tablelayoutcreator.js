function createTableLayoutModifier (execlib, applib) {
  'use strict';

  var lib = execlib.lib,
    BasicModifier = applib.BasicModifier;

  function BodyLayoutModifier (options) {
    BasicModifier.call(this, options);
  }
  lib.inherit (BodyLayoutModifier, BasicModifier);

  BodyLayoutModifier.prototype.doProcess = function (name, options, links, logic, resources) {
    logic.push({
      triggers: '.:actual',
      references: '.',
      handler: function (me, actual) {
        var body = $(document.body);
        if (actual) {
          body.addClass('table_layout');
        } else {
          body.removeClass('table_layout');
        }
      }
    });
  };

  BodyLayoutModifier.prototype.DEFAULT_CONFIG = function () {
  };

  applib.registerModifier ('BackofficeBodyLayout', BodyLayoutModifier);
}

module.exports = createTableLayoutModifier;
