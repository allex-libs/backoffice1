function createModifiers (execlib, applib, jquerylib, templatelib, MenuCreator, markups) {
  'use strict';
  require('./pipelinewithvalidatecredentialscreator')(execlib, applib);
  require('./tablelayoutcreator')(execlib, applib);
}

module.exports = createModifiers;
