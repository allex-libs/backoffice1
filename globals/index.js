function createGlobals (execlib, applib, jquerylib, templatelib) {
  'use strict';

  var WebElement = applib.getElementType('WebElement');

  WebElement.jqueryDecorators.push (requireer);

  function requireer (element) {
    element.find("[required]").parent().addClass('required');
  }

  return {};
}

module.exports = createGlobals;
