function createLib (execlib, applib, jquerylib, templatelib, htmltemplatelib, bootstraptemplatelib) {
  'use strict';

  var globals = require('./globals')(execlib, applib, jquerylib, templatelib),
    pagemarkups = require('./markups/pagemarkups')(execlib.lib, templatelib, htmltemplatelib, bootstraptemplatelib),
    markups = {
      form: require('./markups/formmarkups'),
      page: pagemarkups,
      checkpassword: require('./markups/checkpassword')(templatelib, pagemarkups)
    },
    elementslib = require('./lib/elements')(execlib, markups, templatelib),
    MenuCreator = require('./lib/menucreatorcreator')(execlib, templatelib);
  require('./modifiers')(execlib, applib, jquerylib, templatelib, MenuCreator, markups);
  require('./preprocessors')(execlib, applib, jquerylib, templatelib, MenuCreator, markups);
  require('./prepreprocessors')(execlib, applib, jquerylib, templatelib, MenuCreator, markups);

  return {
    globals: globals,
    markups: markups,
    elementslib: elementslib,
    createTableReferences: require('./lib/tablereferencescreator')(execlib.lib, pagemarkups, templatelib),
    createSettingsMenu: require('./lib/settingsmenucreator')(execlib.lib, pagemarkups, templatelib),
    rowEvents: require('./lib/rowevents')(execlib.lib)
  };
}

module.exports = createLib;
