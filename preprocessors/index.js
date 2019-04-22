function createPreprocessors (execlib, applib, jquerylib, templatelib, MenuCreator, markups) {
  require('./timerangepickerformcreator')(execlib, applib, jquerylib, templatelib, MenuCreator, markups); 
}

module.exports = createPreprocessors;
