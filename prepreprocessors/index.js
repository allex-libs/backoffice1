function createPrePreprocessors (execlib, applib, jquerylib, templatelib, MenuCreator, markups) {
  'use strict';

  require('./initcreator')(execlib, applib, jquerylib, markups);
  require('./logincreator')(execlib, applib);
  require('./headercreator')(execlib, applib);
  require('./footercreator')(execlib, applib, templatelib, markups);
  require('./rolecreator')(execlib, applib, MenuCreator);
  require('./tablepagecreator')(execlib, applib, templatelib, markups);
  require('./tablereportwithrangepickercreator')(execlib, applib, templatelib, markups);
}

module.exports = createPrePreprocessors;
