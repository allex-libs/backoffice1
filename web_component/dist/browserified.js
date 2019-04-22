(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
ALLEX.execSuite.libRegistry.register('allex_backoffice1lib',require('./libindex')(ALLEX, ALLEX.execSuite.libRegistry.get('allex_applib'), ALLEX.execSuite.libRegistry.get('allex_jqueryelementslib'), ALLEX.execSuite.libRegistry.get('allex_templateslitelib'), ALLEX.execSuite.libRegistry.get('allex_htmltemplateslib'), ALLEX.execSuite.libRegistry.get('allex_bootstraptemplateslib')));

},{"./libindex":9}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
function createElementsLib (execlib, markups, templatelib) {
  'use strict';

  var m = markups.page,
    o = templatelib.override;

  function infoPanel (options) {
    var contents = o(m.div,
      'CLASS', 'panel-heading',
      'CONTENTS', [
        o(m.h6,
          'CLASS', 'panel-title',
          'ATTRS', options.titlei18n ? 'data-i18n="'+options.titlei18n+'"' : '',
          'CONTENTS', options.title
        ),
        o(m.div,
          'CLASS', 'heading-elements',
          'CONTENTS', options.headingelements||''
        )
      ]
    );
    if (options.row) {
      contents = [contents, o(m.div,
        'CLASS', 'container-fluid',
        'CONTENTS', o(m.div,
          'CLASS', 'row text-center',
          'CONTENTS', options.row
        )
      )];
    }
    return o(m.div,
      'CLASS', 'panel panel-flat panel-ico-fix' + (options.class ? ' '+options.class : ''),
      'CONTENTS', contents
    );
  }

  function infoBox (options) {
    return o(m.div,
      'CLASS', 'media content-group',
      'CONTENTS', {
        template: 'BIGICON\nINFO',
        replacements: {
          BIGICON: o(m.div,
            'CLASS', 'media-left media-middle',
            'CONTENTS', o(m.a,
              'CLASS', 'btn border-'+options.bigiconcolor+' text-'+(options.bigtextcolor || options.bigiconcolor)+' btn-flat btn-rounded btn-xs btn-icon',
              'CONTENTS', o(m.italic,
                'CLASS', 'icon-'+options.bigicon + (options.bigiconclass ? ' ' + options.bigiconclass : '')
              )
            )
          ),
          INFO: o(m.div,
            'CLASS', 'media-body text-left',
            'CONTENTS', {
              template: 'INFO\nEXPLANATION',
              replacements: {
                INFO: o(m.h5,
                  'CLASS', 'text-semibold no-margin'+(options.biginfoclass ? ' '+options.biginfoclass : ''),
                  'CONTENTS', {
                    template: '{{_ctrl.data.DATAFIELD}}SMALL',
                    replacements: {
                      DATAFIELD: options.datafield,
                      SMALL: o(m.small,
                        'CLASS', 'text-'+options.dataiconcolor+' text-size-base',
                        'CONTENTS', [
                          o(m.italic,
                            'CLASS', 'icon-'+options.dataicon
                          ),
                          options.titleextra || ' '
                        ]
                      ) 
                    }
                  }
                ),
                EXPLANATION: o(m.ul,
                  'CLASS', 'list-inline list-inline-condensed no-margin',
                  'CONTENTS', [
                    o(m.li,
                      'CONTENTS', o(m.span,
                        'CLASS', 'status-mark border-'+(options.dotcolor || options.dataiconcolor)
                      )
                    ),
                    o(m.li,
                      'CONTENTS', o(m.span,
                        'CLASS', 'text-muted',
                        'CONTENTS', o(m.span,
                          'ATTRS', options.captioni18n ? 'data-i18n="'+options.captioni18n+'"' : '',
                          'CONTENTS', options.caption+':'
                        )
                      )
                    )
                  ]
                )
              }
            }
          )
        }
      }
    );
  }

  function smallInfoBox (options) {
    return o(m.div,
      'CLASS', 'content-group',
      'CONTENTS', [
        o(m.h6,
          'CLASS', 'text-semibold no-margin',
          'CONTENTS', [
            o(m.italic,
              'CLASS', 'icon-'+options.icon+' position-left text-'+options.iconcolor,
              'ATTRS', options.titlei18n ? 'data-i18n="'+options.titlei18n+'"' : ''
            ),
            '{{_ctrl.data.'+options.datafield+'}}', //options.title
            options.dataextra ? options.dataextra : ''
          ]
        ),
        o(m.span,
          'CLASS', 'text-muted text-size-small',
          'ATTRS', options.captioni18n ? 'data-i18n="'+options.captioni18n+'"' : '',
          'CONTENTS', options.caption || ''
        )
      ]
    );
  }

  return {
    infoPanel: infoPanel,
    infoBox: infoBox,
    smallInfoBox: smallInfoBox
  };
}

module.exports = createElementsLib;

},{}],4:[function(require,module,exports){
/*jshint multiline:true*/
function createMenu (execlib, templatelib) {
  'use strict';

  var lib = execlib.lib;

  function MenuCreator () {
  };

  MenuCreator.prototype.process = function (menudesc, preprecb, appcb, linkcb) {
    var contents;
    if (!lib.isArray(menudesc)) {
      return '';
    }
    contents = menudesc.reduce(this.processMenuDesc.bind(this, preprecb, appcb, linkcb), '');
    return templatelib.process(lib.extend({}, this.template, {replacements: {
      HEADER: lib.extend({}, this.headerTemplate, menudesc.header || {}),
      FOOTER: lib.extend({}, this.footerTemplate, menudesc.footer || {}),
      CONTENTS: contents
    }}));
  };

  MenuCreator.prototype.processMenuDesc = function (preprecb, appcb, linkcb, str, menudesc) {
    var row, replacementsObj = {};
    if (lib.isArray(menudesc.subitems)) {
      row = templatelib.process(
        lib.extend(
          {},
          this.submenuTemplate,
          {
            replacements: lib.extend(
              {},
              menudesc.item,
              {
                SUBMENU: menudesc.subitems.reduce(this.processMenuDesc.bind(this, preprecb, appcb, linkcb), '')
              }
            )
          }
        )
      );
    } else if (menudesc.item) {
      replacementsObj = {replacements: menudesc.item};
      if (!!menudesc.default){
        replacementsObj.replacements.LICLASS = 'active';
      }
      row = templatelib.process(lib.extend({}, this.row1Template, replacementsObj));
    }
    if (row) {
      str += ('\n'+row);
    }
    if (menudesc.app) {
      appcb(menudesc.app);
    }
    if (menudesc.prepreprocessors) {
      preprecb(menudesc.prepreprocessors);
    }
    if (menudesc.target) {
      if (!(menudesc.item && menudesc.item.ROUTE)) {
        throw new Error('Menudescriptor cannot specify a target without an item.ROUTE');
      }
      if (!menudesc.target.domain) {
        throw new Error('Menudescriptor target must have a domain property');
      }
      if (!(menudesc.target.domain === 'local' || menudesc.target.domain === 'global')) {
        throw new Error ('Menudescriptor target domain property must be "local" or "global"');
      }
      if (!menudesc.target.name) {
        throw new Error ('Menudescriptor target must have a name property');
      }
      linkcb(menudesc.target, menudesc.item.ROUTE, menudesc.default, menudesc.onClicked);
    }
    return str;
  }

  MenuCreator.prototype.template = {template: ' \
    HEADER \
    CONTENTS \
    FOOTER \
  ',
  replacements: {HEADER: '', CONTENTS: '', FOOTER: ''}};
  MenuCreator.prototype.headerTemplate = {template: '', replacements: {}};
  MenuCreator.prototype.footerTemplate = {template: '', replacements: {}};
  MenuCreator.prototype.row1Template = {template: '', replacements: {}};
  MenuCreator.prototype.submenuTemplate = {template: 'SUBMENU', replacements: {SUBMENU:''}};

  return MenuCreator;
}

module.exports = createMenu;

},{}],5:[function(require,module,exports){
function produceRowEventsHelpers (lib) {
  'use strict';

  function standardPipelineActivatorFilter (evnt) {
    return evnt[1];
  }

  function standardPipelineActivatorFilterFiltered (cb, evnt) {
    return cb(evnt[1]);
  }

  function standardPipelineActivator (pipelinename) {
    return {
      target: 'element.'+pipelinename+':actual',
      filter: standardPipelineActivatorFilter
    }
  }

  function standardPipelineActivatorFiltered (pipelinename, cb) {
    return {
      target: 'element.'+pipelinename+':actual',
      filter: standardPipelineActivatorFilterFiltered.bind(null, cb)
    }
  }

  return {
    standardPipelineActivator: standardPipelineActivator,
    standardPipelineActivatorFiltered: standardPipelineActivatorFiltered
  }
}

module.exports = produceRowEventsHelpers;

},{}],6:[function(require,module,exports){
function createSettingsMenuCreator (lib, pagemarkups, templatelib) {
  'use strict';
  var o = templatelib.override,
    i = templatelib.inherit,
    p = templatelib.process,
    m = pagemarkups;

  function createSettingsMenu (options) {
    var collapsiblemenuid = lib.uid();
    return o(m.div,
      'CLASS', 'slNavbar navbar navbar-default',
      'CONTENTS', [
        o(m.ul,
          'CLASS', 'nav navbar-nav no-border visible-xs-block',
          'CONTENTS', o(m.li,
            'CONTENTS', o(m.a,
              'CLASS', 'text-center collapsed',
              'ATTRS', 'data-toggle="collapse" data-target="#'+collapsiblemenuid+'"',
              'CONTENTS', o(m.italic,
                'CLASS', 'icon-menu7'
              )
            )
          )
        ),
        o(m.div,
          'CLASS', 'navbar-collapse collapse',
          'ATTRS', 'id="'+collapsiblemenuid+'"',
          'CONTENTS', o(m.ul,
            'CLASS', 'nav navbar-nav navbar-right backofficecollapsiblemenulist'
          )
        )
      ]
    );
  }

  return createSettingsMenu;
}

module.exports = createSettingsMenuCreator;

},{}],7:[function(require,module,exports){
function createTablePageLib (execlib, markups, templateslib) {
  'use strict';

  var lib = execlib.lib,
    m = markups.page,
    o = templateslib.override;

  function tablePage (options) {
    return o(m.div, 
      'CLASS', 'page-container' + (lib.isString(options.tablepageclass) ? ' ' + options.tablepageclass : ''),
      'ATTRS', 'style="display:none"',
      'CONTENTS', o(m.div,
        'CLASS', 'page-content',
        'CONTENTS', [
          o(m.div,
            'CLASS', 'panel-heading',
            'CONTENTS', [
              o(m.h5,
                'CONTENTS', [
                  o(m.italic,
                    'CLASS', options.icon+' position-left'
                  ),
                  o(m.span,
                    'CLASS', 'text-semibold',
                    'ATTRS', 'data-i18n="'+options.titlei18n+'"',
                    'CONTENTS', options.title
                  )
                ]
              ),
              o(m.div,
                'CLASS', 'heading-elements'+ (options.headingelementsclass ? ' '+options.headingelementsclass : ''),
                'CONTENTS', o(m.ul,
                  'CLASS', 'icons-list' + (options.iconslistclass ? ' '+options.iconslistclass : ''),
                  'CONTENTS', [m.fullscreencombo].concat(options.headingelements||[])
                )
              )
            ]
          ),
          o(m.div,
            'CLASS', 'content-wrapper',
            'CONTENTS', o(m.div, 
              //'CLASS', options.colorablerows ? 'table table-bordered colorablerows' : 'table table-bordered',
              'CLASS', 'table table-bordered'+(options.colorablerows?' colorablerows':'')+(options.tableclass?' '+options.tableclass:''),
              'ATTRS', 'tablepage="tableelement"'
            )
          )
        ]
      )
    );
  }

  return {
    tablePage: tablePage
  };
}

module.exports = createTablePageLib;

},{}],8:[function(require,module,exports){
function createTableReferencesCreator (lib, pagemarkups, templatelib) {
  'use strict';
  var o = templatelib.override,
    i = templatelib.inherit,
    p = templatelib.process,
    m = pagemarkups;

  var refdivmarkup = i(m.div, {
    prereplacements: [{
      'ATTRS': 'data-title="Actions" ATTRS'
    }]
  });

  var refbuttmarkup = i(m.a, {
    prereplacements: [{
      'CLASS': 'btn border-BORDERTYPE text-TEXTTYPE-TEXTWEIGHT btn-flat btn-icon btn-rounded CLASS',
      'ATTRS': 'data-ng-click="grid.appScope._ctrl.raiseEvent(\'EVENTNAME\', row.entity)" data-toggle="tooltip" title="TITLE" ng-i18next="[title]TITLEi18n" data-ng-show="SHOWCONDITION"'
    }],
    replacements: {
      TEXTWEIGHT: 600,
      SHOWCONDITION: 'true',
      CONTENTS: o(m.italic,
        'CLASS', 'ICON'
      )
    }
  });
  //replacements for refbuttmarkup:
  //{
  //  BORDERTYPE: 'success|warning|danger|primary|...'
  //  TEXTTYPE: 'success|warning|danger|primary|...'
  //  TITLE
  //  TITLEi18n
  //  ICON: e.g. 'icon-cross2'
  //  TEXTWEIGHT: 600 is the default
  //  EVENTNAME: for the rowEvents, like 'cancel_reservation'
  //  SHOWCONDITION: e.g. 'row.entity.enableRemove' for a Remove button, but true is the default
  //}

  function createRefButt (refbuttdesc) {
    return p(lib.extend({}, refbuttmarkup, {
      replacements: refbuttdesc
    }));
  }

  function createTableReferences (refbuttdescs) {
    console.log('butts', refbuttdescs.map(createRefButt));
    return o(refdivmarkup,
      'CONTENTS', refbuttdescs.map(createRefButt)
    );
  }

  return createTableReferences;

}

module.exports = createTableReferencesCreator;

},{}],9:[function(require,module,exports){
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

},{"./globals":2,"./lib/elements":3,"./lib/menucreatorcreator":4,"./lib/rowevents":5,"./lib/settingsmenucreator":6,"./lib/tablereferencescreator":8,"./markups/checkpassword":10,"./markups/formmarkups":11,"./markups/pagemarkups":13,"./modifiers":14,"./prepreprocessors":19,"./preprocessors":25}],10:[function(require,module,exports){
function createCheckPasswordMarkup (templatelib, pagemarkups) {
  'use strict';

  var o = templatelib.override, m = pagemarkups;
  
  return o(m.div,
    'CLASS', 'modal fade',
    'ATTRS', 'data-size="sm"',
    'CONTENTS', o(m.div,
      'CLASS', 'modal-dialog',
      'ATTRS', 'role="document"',
      'CONTENTS', o(m.div,
        'CLASS', 'modal-content',
        'CONTENTS', [
          o(m.div,
            'CLASS', 'modal-header',
            'CONTENTS', [
              o(m.button,
                'CLASS', 'close',
                'ATTRS', 'type="button" data-dismiss="modal" aria-label="Close"',
                'CONTENTS', o(m.span,
                  'ATTRS', 'aria-hidden="true"',
                  'CONTENTS', '&times;'
                )
              ),
              o(m.h4,
                'CLASS', 'modal-title',
                'ATTRS', 'data-i18n="headers.enter_password"',
                'CONTENTS', 'Please enter password'
              )
            ]
          ),
          o(m.form,
            'CONTENTS', o(m.div,
              'CLASS', 'modal-body clearfix',
              'CONTENTS', o(m.div,
                'CLASS', 'form-group required',
                'CONTENTS', [
                  o(m.label,
                    'ATTRS', 'data-i18n="user.password"',
                    'CONTENTS', 'Password'
                  ),
                  o(m.passwordinput,
                    'CLASS', 'form-control',
                    'NAME', 'password',
                    'ATTRS', 'placeholder="Password" required data-i18n="[placeholder]user.password" data-allex-on-enter-submit="#CheckPasswordSubmit"', 
                  )
                ]
              )
            )
          ),
          o(m.div,
            'CLASS', 'modal-footer',
            'CONTENTS', [
              o(m.button,
                'CLASS', 'btn btn-default',
                'ATTRS', 'data-dismiss="modal" data-i18n="close" type="button"',
                'CONTENTS', 'Close'
              ),
              o(m.button,
                'CLASS', 'btn btn-primary',
                'ATTRS', 'data-i18n="ok" type="button" id="CheckPasswordSubmit"',
                'CONTENTS', 'Ok'
              )
            ]
          )
        ]
      )
    )
  );
}

module.exports = createCheckPasswordMarkup;

},{}],11:[function(require,module,exports){
/*jshint multiline:true*/

var inputWithLabel = {
  template: ' \
<div class="form-group"> \
  <label data-i18n="LABELi18n">LABEL</label> \
  <input type="TYPE" placeholder="LABEL" class="form-control" name="NAME" REQUIRED data-i18n="[placeholder]LABELi18n"> \
</div> \
',
  replacements: {
    LABEL: '',
    NAME: '',
    LABELi18n: '',
    TYPE: 'text',
    REQUIRED: 'required'
  }
};

var rowLabel4Data8 = {
  template: ' \
  <div class="row"> \
    <span class="col-md-4" data-i18n="LABELi18n">LABEL</span> \
    <span class="col-md-8" class="text-left">{{ANGULARDATA}}</span> \
  </div> \
  ',
  replacements: {
    LABEL: '',
    LABELi18n: '',
    ANGULARDATA: ''
  }
};

module.exports = {
  inputWithLabel: inputWithLabel,
  rowLabel4Data8: rowLabel4Data8
};


},{}],12:[function(require,module,exports){
/*jshint multiline:true*/
var headermarkup = {
  template:' \
  <div class="navbar navbar-default" id="navbar-ROLE"> \
    <ul class="nav navbar-nav no-border visible-xs-block"> \
      <li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-ROLE-toggle"><i class="icon-menu7"></i></a></li> \
    </ul> \
    <div class="navbar-collapse collapse" id="navbar-ROLE-toggle"> \
      <ul class="nav navbar-nav"> \
',
  replacements: {
    ROLE: 'ROLE'
  }
};
var footermarkup = {
  template: ' \
      </ul> \
    </div> \
',
  replacements: {
  }
};
var row1markup = {
  template: '<li class="LICLASS"><a href="#" data-route="ROUTE"><i class="ICON POSITION"></i><span data-i18n="CAPTIONi18n">CAPTION</span></a></li>',
  replacements: {
    ROUTE: '',
    CAPTION: '',
    CAPTIONi18n: '',
    ICON: '',
    POSITION: 'position-left',
    LICLASS: ''
  }
};

var dropdownmarkup = {
  template: '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="ICON POSITION"></i><span data-i18n="CAPTIONi18n">CAPTION</span><span class="caret"></span></a><ul class="dropdown-menu width-200">SUBMENU</ul></li>',
  replacements: {
    CAPTION: '',
    CAPTIONi18n: '',
    ICON: '',
    POSITION: 'position-left',
    SUBMENU: ''
  }
};

module.exports = {
  header: headermarkup,
  footer: footermarkup,
  row1: row1markup,
  dropdown: dropdownmarkup
};


},{}],13:[function(require,module,exports){
/*jshint multiline:true*/
function createPageMarkups (lib, templatelib, htmltlib, btstrptlib) {
  'use strict';

  var i = templatelib.inherit,
    o = templatelib.override,
    divmarkup = htmltlib.div;

  var pagecontainerheader = ' \
      <div class="page-container"> \
        <div class="page-content"> \
          <div class="content-wrapper"> \
  ';
  var pagecontainerfooter = '</div></div></div';
  var pagecontainermarkup = {
    template: '\n HEADER \n CONTENTS \n FOOTER \n',
    replacements: {
      HEADER: pagecontainerheader,
      FOOTER: pagecontainerfooter,
      CONTENTS: ''
    }
  };

  var rowmarkup = i(divmarkup,
    {
      prereplacements: [{
        CLASS: 'row CLASS'
      }]
    }
  );

  var anypaneldivmarkup = i(divmarkup, 
    {
      prereplacements: {
        CLASS: 'panel-PANELTYPE CLASS'
      }
    }
  );

  var panelflatmarkup = i(anypaneldivmarkup,
    {
      prereplacements: {
        PANELTYPE: 'flat',
        CLASS: 'panel CLASS'
      }
    }
  );

  var panelheadingmarkup = i(anypaneldivmarkup,
    {
      prereplacements: {
        PANELTYPE: 'heading'
      }
    }
  );

  /*
  var paneltitlemarkup = i(anypaneldivmarkup,
    {
      prereplacements: {
        PANELTYPE: 'title'
      }
    }
  );
  */

  var paneltitlemarkup = i(htmltlib.h6, 
    {
      prereplacements: {
        CLASS: 'panel-title'
      }
    }
  );

  var anyheadingdivmarkup = i(divmarkup, 
    {
      prereplacements: {
        CLASS: 'heading-HEADINGTYPE CLASS'
      }
    }
  );

  var headingelementsmarkup = i(anyheadingdivmarkup, 
    {
      prereplacements: {
        HEADINGTYPE: 'elements'
      }
    }
  );

  var containerfluidmarkup = i(divmarkup,
    {
      prereplacements: {
        CLASS: 'container-fluid CLASS'
      }
    }
  );

  var reportheadermarkup = {
    template: o(divmarkup,
      'CLASS', 'page-header',
      'CONTENTS', o(divmarkup,
        'CLASS', 'page-header-content',
        'CONTENTS', o(divmarkup,
          'CLASS', 'page-title',
          'CONTENTS', o(htmltlib.h4,
            'CONTENTS', [
              o(htmltlib.italic,
                'CLASS', 'icon-arrow-left52 position-left'
              ),
              o(htmltlib.span,
                'CLASS', 'text-semibold',
                'ATTRS', 'data-i18n="TITLEi18n"',
                'CONTENTS', 'TITLE'
              ),
              /* not necessary
              ' - ',
              o(htmltlib.span,
                'ATTRS', 'data-i18n="nav.view"',
                'CONTENTS', 'View'
              ),
              */
              o(divmarkup,
                'CLASS', 'heading-elements',
                'CONTENTS', 'HEADINGELEMENTS'
              )
            ]
          )
        )
      )
    ),
    replacements: {
      TITLEi18n: '',
      TITLE: '',
      HEADINGELEMENTS: ''
    }
  };

  var fullscreencombomarkup = [
    o(htmltlib.li,
      'CLASS', 'fullscreenicon',
      'CONTENTS', o(htmltlib.a,
        'ATTRS', 'data-action="fullscreen" onclick="$(this).closest(\'div.page-container\').addClass(\'full\');"'
      )
    ),
    o(htmltlib.li,
      'CLASS', 'fullscreenicon',
      'CONTENTS', o(htmltlib.a,
        'ATTRS', 'data-action="exitfullscreen" onclick="$(this).closest(\'div.page-container\').removeClass(\'full\');"'
      )
    )
  ];

  var tablereportmarkup = {
    template: o(divmarkup,
      'CLASS', 'page-container',
      'CONTENTS', o(divmarkup,
        'CLASS', 'page-content',
        'CONTENTS', [
          o(divmarkup,
            'CLASS', 'panel-heading',
            'CONTENTS', [
              o(htmltlib.h5,
                'CONTENTS', [
                  o(htmltlib.italic,
                    'CLASS', 'ICON'
                  ),
                  o(htmltlib.span,
                    'CLASS', 'text-semibold',
                    'ATTRS', 'data-i18n="CAPTIONi18n"',
                    'CONTENTS', 'CAPTION'
                  )/*,
                  ' - ',
                  o(htmltlib.span,
                    'ATTRS', 'data-i18n="nav.view"',
                    'CONTENTS', 'View'
                  )
                  */
                ]
              ),
              o(divmarkup,
                'CLASS', 'heading-elements',
                'CONTENTS', o(htmltlib.ul,
                  'CLASS', 'icons-list',
                  'CONTENTS',fullscreencombomarkup
                )
              )
            ]
          ),
          o(divmarkup,
            'CLASS', 'panel-heading2',
            'CONTENTS', o(divmarkup,
              'CLASS', 'tablereport-header2',
              'CONTENTS', 'TABLEREPORTHEADERCONTENTS'
            )
          ),
          'ADDITIONALHEADER', 
          o(divmarkup,
            'CLASS', 'content-wrapper content-wrapper2 tablereportcontainer TABLECONTAINERCLASS',
          )
        ]
      )
    ),
    replacements: {
      ICON: 'icon-stats-bars2',
      CAPTIONi18n: 'nav.clubadmin_daily_report',
      CAPTION: 'Daily report',
      TABLECONTAINERCLASS: '',
      TABLEREPORTHEADERCONTENTS: '',
      ADDITIONALHEADER: ''
    }
  };

  var addbuttonmarkup = {
    template : o(htmltlib.li,
      'CONTENTS', o(htmltlib.a,
        'CONTENTS', o(htmltlib.italic,
          'CLASS', 'icon-add CLASS'
        )
      )
    ),
    replacements: {
      'CLASS' : ''
    }
  };

  var addwithtextbuttonmarkup = {
    template : o(htmltlib.li,
      'CONTENTS', o(htmltlib.a,
        'CLASS', 'btn btn-primary heading-btn CLASS',
        'ATTRS', 'style="display:block;"',
        'CONTENTS', [o(htmltlib.italic,
          'CLASS', 'icon-add'
        ),
        o(htmltlib.span,
          'ATTRS', 'data-i18n="basic.add_new"',
          'CONTENTS', 'Add new'
        )]
      )
    ),
    replacements: {
      'CLASS' : ''
    }
  };

  var resetpasswordmodalmarkup = {
    template : o(divmarkup,
      'CLASS', 'modal fade',
      'ATTRS', 'data-size="sm"',
      'CONTENTS', o(divmarkup,
        'CLASS', 'modal-dialog',
        'ATTRS', 'role="document"',
        'CONTENTS', o(divmarkup,
          'CLASS', 'modal-content',
          'CONTENTS', [
            o(divmarkup,
              'CLASS', 'modal-header',
              'CONTENTS', [
                o(htmltlib.button,
                  'CLASS', 'close',
                  'ATTRS', 'type="button" data-dismiss="modal" aria-label="Close"',
                  'CONTENTS', o(htmltlib.span,
                    'ATTRS', 'aria-hidden="true"',
                    'CONTENTS', '&times;'
                  )
                ),
                o(htmltlib.h4,
                  'CLASS', 'modal-title',
                  'ATTRS', 'data-i18n="headers.reset_password"',
                  'CONTENTS', 'Reset password'
                )
              ]
            ),
            o(htmltlib.form,
              'CONTENTS', o(divmarkup,
                'CLASS', 'modal-body clearfix',
                'CONTENTS', [
                  o(divmarkup,
                    'CLASS', 'form-group required',
                    'CONTENTS', [
                      o(htmltlib.label,
                        'ATTRS', 'data-i18n="user.new_password"',
                        'CONTENTS', 'New password'
                      ),
                      o(htmltlib.passwordinput,
                        'CLASS', 'form-control',
                        'NAME', 'password',
                        'ATTRS', 'placeholder="New password" required data-i18n="[placeholder]user.new_password"'
                      )
                    ]
                  ),
                  o(divmarkup,
                    'CLASS', 'form-group required',
                    'CONTENTS', [
                      o(htmltlib.label,
                        'ATTRS', 'data-i18n="user.confirm_pass"',
                        'CONTENTS', 'Confirm new password'
                      ),
                      o(htmltlib.passwordinput,
                        'CLASS', 'form-control',
                        'NAME', 'confirm_pass',
                        'ATTRS', 'placeholder="Confirm new password" required data-i18n="[placeholder]user.confirm_pass" allex-angular-match-validate="_ctrl.data.password"'
                      )
                    ]
                  )
                ]
              )
            ),
            o(divmarkup,
              'CLASS', 'modal-footer',
              'CONTENTS', [
                o(htmltlib.button,
                  'CLASS', 'btn btn-default',
                  'ATTRS', 'type="button" data-dismiss="modal" data-i18n="close"',
                  'CONTENTS', 'Close'
                ),
                o(htmltlib.button,
                  'CLASS', 'btn btn-primary ResetPasswordSubmit',
                  'ATTRS', 'type="button" data-i18n="ok"',
                  'CONTENTS', 'Ok'
                )
              ]
            )
          ]
        )
      )
    ),
    replacements : {}
  };

  return lib.extend({}, htmltlib, btstrptlib,{
    pagecontainer: pagecontainermarkup,
    row: rowmarkup,
    panelflat: panelflatmarkup,
    panelheading: panelheadingmarkup,
    paneltitle: paneltitlemarkup,
    headingelements: headingelementsmarkup,
    containerfluid: containerfluidmarkup,
    reportheader: reportheadermarkup,
    fullscreencombo: fullscreencombomarkup,
    tablereport: tablereportmarkup,
    addbutton: addbuttonmarkup,
    addwithtextbutton: addwithtextbuttonmarkup,
    resetpasswordmodal: resetpasswordmodalmarkup
  });
}

module.exports = createPageMarkups;

},{}],14:[function(require,module,exports){
function createModifiers (execlib, applib, jquerylib, templatelib, MenuCreator, markups) {
  'use strict';
  require('./pipelinewithvalidatecredentialscreator')(execlib, applib);
  require('./tablelayoutcreator')(execlib, applib);
}

module.exports = createModifiers;

},{"./pipelinewithvalidatecredentialscreator":15,"./tablelayoutcreator":16}],15:[function(require,module,exports){
function createPipelineWithValidateCredentials (execlib, applib) {
  'use strict';

  var lib = execlib.lib,
    Pipeline = applib.getModifier('Pipeline'),
    validateCredentialsPipeline = [
      {
        element : 'element.CheckPassword',
        success : '!submit',
        error : ':actual',
        onStart : onCheckPasswordStart,
        onSuccess : standardPipelineFormSuccess
      },
      {
        element : '.>validateCredentials',
      }
    ];

  function onCheckPasswordStart (element, data, all_data) {
    element.set('actual', true);
    element.set('data', {});
  }

  function standardPipelineFormSuccess (element, data, all_data) {
    element.set('actual', false);
  }

  function pipelineWithValidateCredentials (before, after) {
    var ret = lib.isArray(before) ? before.concat(validateCredentialsPipeline) : validateCredentialsPipeline;
    return lib.isArray(after) ? ret.concat(after) : ret;
  }

  function PipelineWithValidateCredentials (options) {
    Pipeline.call(this, {
      element_name: options.element_name,
      pipeline: pipelineWithValidateCredentials(options.before, options.after)
    });
  }
  lib.inherit(PipelineWithValidateCredentials, Pipeline);

  applib.registerModifier('PipelineWithValidateCredentials', PipelineWithValidateCredentials);
  applib.getPreprocessor('Pipeline').pipelineNames.push('PipelineWithValidateCredentials');
}

module.exports = createPipelineWithValidateCredentials;

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
function createFooterPrePreprocessor (execlib, applib, templateslib, markups){
  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    o = templateslib.override,
    m = markups.page;

  function createFooterMarkup(){
    return o(m.div,
      'CLASS', 'footer text-muted',
      'CONTENTS', [
        '&copy; 2018.',
        o(m.a,
          'CONTENTS', 'System administration'
        ),
        ' by ',
        o(m.a,
          'ATTRS', 'target="_blank" data-toggle="tooltip" data-placement="top"',
          'CONTENTS', 'Hers'
        )
      ]
    )
  }
  
  function FooterPrePreprocessor(){
    BasicProcessor.call(this);
  }
  lib.inherit(FooterPrePreprocessor, BasicProcessor);
  FooterPrePreprocessor.prototype.process = function(desc){
    desc.elements.push({
      type: 'WebElement',
      name: 'backofficefooter',
      options: {
        actual: true,
        self_selector: 'attrib:name',
        default_markup: createFooterMarkup()
      }
    });
  }

  applib.registerPrePreprocessor('BackofficeFooter', FooterPrePreprocessor);

}

module.exports = createFooterPrePreprocessor;

},{}],18:[function(require,module,exports){
/*jshint multiline:true*/

var formmarkups = require('../markups/formmarkups.js');
var _strongRegExString = "^(?=.*[\\w])(?=.*[\\W])(?=.*[0-9])(?=.*[!\\.,:;\\-@#\\$%\\^&\\*\\(\\)\\~\\`\\+\\=\\>\\<\\/\\\\\|\\?])(?=.{8,})";

function createHeaderPrePreprocessor (execlib, applib) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    descriptorApi = applib.descriptorApi;

  var headermarkup = {template: ' \
	<div class="navbar navbar-inverse"> \
		<div class="navbar-header"> \
			<a class="navbar-brand" href="MAIN_LINK"><img src="HEADER_LOGO" alt=""></a> \
			<ul class="nav navbar-nav pull-right visible-xs-block"> \
				<li><a data-toggle="collapse" data-target="#backoffice-header-navbar"><i class="icon-tree5"></i></a></li> \
			</ul> \
		</div> \
		<div class="navbar-collapse collapse" id="backoffice-header-navbar"> \
			<ul class="nav navbar-nav navbar-right"> \
				<li class="dropdown dropdown-user" backofficeheader="usermenu" style="display:none;"> \
					<a class="dropdown-toggle" data-toggle="dropdown"> \
						<img src="USER_LOGO" alt=""> \
						<span backofficeheader="username">{{_ctrl.data}}</span> \
						<i class="caret"></i> \
					</a> \
					<ul class="dropdown-menu dropdown-menu-right"> \
						<li><a backofficeheader="myprofile" href="#"><i class="icon-user-plus"></i><span data-i18n="user.myprofile">My profile</span></a></li> \
						<li class="divider"></li> \
						<li><a href="#" backofficeheader="logout"><i class="icon-switch2"></i><span data-i18n="user.logout">Logout</span></a></li> \
					</ul> \
				</li> \
			</ul> \
		</div> \
	</div> \
    ',
    replacements: {
      HEADER_LOGO: null, //'assets/images/logo_light.png'
      USER_LOGO: null, //'assets/images/placeholder.jpg'
      MAIN_LINK: '#', //not needed for a WebApp
    }
  },
  myprofilemarkup = {template: ' \
  <div style="display:none;"> \
    <div class="navbar navbar-default" id="navbar-myprofilepage"> \
      <ul class="nav navbar-nav no-border visible-xs-block"> \
        <li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-myprofilepage-toggle"><i class="icon-menu7"></i></a></li> \
      </ul> \
      <div class="navbar-collapse collapse" id="navbar-myprofilepage-toggle"> \
        <ul class="nav navbar-nav"> \
          <li><a href="#" data-route="MyProfileContent"><i class="icon-profile position-left"></i><span data-i18n="user.mydata">My data</span></a></li> \
          <li><a href="#" data-route="ChangePassword"><i class="icon-lock2 position-left"></i><span data-i18n="user.changepass">Change password</span></a></li> \
        </ul> \
        <ul class="nav navbar-nav navbar-right"> \
          <li><a backofficeprofile="leave_myprofile" href="#"><i class="icon-cross3"></i><span data-i18n="close">Close</span></a></li> \
        </ul> \
      </div> \
    </div> \
    <div id="MyProfileHead" class="page-header" style="display:none;"> \
      <div class="page-header-content"> \
        <div class="page-title"> \
          <h4><i class="icon-arrow-left52 position-left"></i><span class="text-semibold" data-i18n="user.mydata">My profile</span></h4> \
        </div> \
      </div> \
    </div> \
    <div id="MyProfilePassHead" class="page-header" style="display:none;"> \
      <div class="page-header-content"> \
        <div class="page-title"> \
          <h4><i class="icon-arrow-left52 position-left"></i><span class="text-semibold" data-i18n="user.changepass">Change password</span></h4> \
        </div> \
      </div> \
    </div> \
    <div id="MyProfilePassContent" class="page-container" style="display:none;"> \
      <div class="page-content"> \
        <div class="content-wrapper"> \
          <div id="ChangePassword"> \
            <form> \
              OLDPASSWORDINPUT \
              NEWPASSWORDINPUT \
              CONFIRMNEWPASSWORDINPUT \
            </form> \
            <div class="row"> \
              <button type="button" class="btn btn-primary col-md-1 col-md-offset-11" id="ChangePasswordSubmit" data-i18n="save">Submit</button> \
            </div> \
          </div> \
        </div> \
      </div> \
    </div> \
    <div backofficeprofile="MyProfileContent" class="page-container" style="display:none;"> \
      <div class="page-content"> \
        <div class="content-wrapper"> \
          <div id="EditMyProfile"> \
            <form> \
              NAMEINPUT \
              PHONEINPUT \
              EMAILINPUT \
              <div class="checkbox"> \
                <label> \
                  <input type="checkbox" data-ng-true-value="\'sms\'" data-ng-false-value="null" name="secondphaseauth"> \
                  <span data-i18n="user.sms">Allow second phase</span> \
                </label> \
              </div> \
              REGISTEREDBY \
              REGISTEREDON \
            </form> \
            <div class="row"> \
              <button type="button" class="btn btn-primary col-md-1 col-md-offset-11" id="EditMyProfileSubmit" data-i18n="save">Submit</button> \
            </div> \
          </div> \
        </div> \
      </div> \
    </div> \
  </div> \
  ',
  prereplacements: [{
    OLDPASSWORDINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Old password',
          NAME: 'opassword',
          LABELi18n: 'user.old_password',
          TYPE: 'password'
        }
      }
    ),
    NEWPASSWORDINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'New password',
          NAME: 'npassword',
          LABELi18n: 'user.new_password',
          TYPE: 'password'
        }
      }
    ),
    CONFIRMNEWPASSWORDINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Confirm new password',
          NAME: 'cnpassword',
          LABELi18n: 'user.confirm_pass',
          TYPE: 'password'
        }
      }
    ),
    NAMEINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Full name',
          NAME: 'name',
          LABELi18n: 'user.full_name',
          TYPE: 'text'
        }
      }
    ),
    PHONEINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Phone number',
          NAME: 'phone',
          LABELi18n: 'user.phone',
          TYPE: 'phone'
        }
      }
    ),
    EMAILINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'e-mail',
          NAME: 'email',
          LABELi18n: 'user.email',
          TYPE: 'email'
        }
      }
    ),
    REGISTEREDBY: lib.extend({},
      formmarkups.rowLabel4Data8,
      {
        replacements: {
          LABEL: 'Registered by:',
          LABELi18n: 'user.registered_by',
          ANGULARDATA: '_ctrl.data.registered_by'
        }
      }
    ),
    REGISTEREDON: lib.extend({},
      formmarkups.rowLabel4Data8,
      {
        replacements: {
          LABEL: 'Registered:',
          LABELi18n: 'user.registered_timestamp',
          ANGULARDATA: "_ctrl.data.created | date:'dd.MM.yyyy / HH:mm'"
        }
      }
    )
  }],
  replacements: {
  }};

  function HeaderPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(HeaderPrePreprocessor, BasicProcessor);
  HeaderPrePreprocessor.prototype.process = function (desc) {
    var targetenv = descriptorApi.ensureDescriptorArrayElementByName(desc, 'environments', this.config.environmentName);
    targetenv.options.datasources.push({
      name: 'username',
      type: 'allexstate',
      options: {
        path : 'profile_username',
        sink : '.'
      }
    },
    {
      name: 'username',
      type: 'allexstate',
      options: {
        path : 'profile_username',
        sink : '.'
      }
    },
    {
      name : 'secondphaseauth',
      type : 'allexstate',
      options : {
        path : 'profile_secondphaseauth',
        sink : '.'
      }
    },
    {
      name : 'first_name',
      type : 'allexstate',
      options : {
        path : 'profile_name',
        sink : '.'
      }
    },
    {
      name : 'lastname',
      type : 'allexstate',
      options : {
        path : 'profile_lastname',
        sink : '.'
      }
    },
    {
      name : 'fname',
      type : 'allexstate',
      options : {
        path : 'profile_fname',
        sink : '.'
      }
    },
    {
      name : 'phone',
      type : 'allexstate',
      options : {
        path : 'profile_phone',
        sink : '.'
      }
    },
    {
      name : 'email',
      type : 'allexstate',
      options : {
        path : 'profile_email',
        sink : '.'
      }
    },
    {
      name : 'registered_by',
      type : 'allexstate',
      options : {
        path : 'profile_registered_by',
        sink : '.'
      }
    },
    {
      name : 'admin_created',
      type : 'allexstate',
      options : {
        sink : '.',
        path : 'profile_created'
      }
    },
    {
      name: 'clubid',
      type: 'allexstate',
      options : {
        path : 'profile_clubid',
        sink : '.'
      }
    });
    targetenv.options.commands.push({
      name : 'updateProfile',
      options : {
        sink : '.',
        name : 'updateProfile'
      }
    },{
      name : 'changePassword',
      options : {
        sink : '.',
        name : 'changePassword'
      }
    });
    desc.datasources.push({
      name: 'username',
      environment: this.config.environmentName
    },{
      name: 'secondphaseauth',
      environment: this.config.environmentName
    },{
      name: 'first_name',
      environment: this.config.environmentName
    },{
      name: 'lastname',
      environment: this.config.environmentName
    },{
      name: 'fname',
      environment: this.config.environmentName
    },{
      name: 'phone',
      environment: this.config.environmentName
    },{
      name: 'email',
      environment: this.config.environmentName
    },{
      name: 'registered_by',
      environment: this.config.environmentName
    },{
      name: 'admin_created',
      environment: this.config.environmentName
    },{
      name: 'clubid',
      environment: this.config.environmentName
    });
    desc.commands.push({
      command: 'updateProfile',
      environment: this.config.environmentName
    },{
      command: 'changePassword',
      environment: this.config.environmentName
    });
    desc.elements.push({
      type: 'WebElement',
      name: 'backofficeheader',
      options: {
        actual: true,
        self_selector: 'attrib:name',
        default_markup: lib.extend({}, headermarkup, {replacements:{
          HEADER_LOGO: this.config.HEADER_LOGO,
          USER_LOGO: this.config.USER_LOGO
        }}),
        elements: [{
          type: 'WebElement',
          name: 'usermenu',
          options: {
            self_selector: 'attrib:backofficeheader',
            elements: [{
              type: 'AngularElement',
              name: 'username',
              options: {
                actual: true,
                self_selector: 'attrib:backofficeheader'
              }
            },{
              type: 'WebElement',
              name: 'myprofile',
              options: {
                actual: true,
                self_selector: 'attrib:backofficeheader'
              }
            },{
              type: 'WebElement',
              name: 'logout',
              options: {
                actual: true,
                self_selector: 'attrib:backofficeheader'
              }
            }]
          }
        }]
      }
    },{
      name : 'myprofilepage',
      type : 'WebElement',
      links : [
        {
          source : '.ChangePassword:actual',
          target : '.MyProfilePassHead:actual, .MyProfilePassContent:actual'
        },
        {
          source : '.EditMyProfile:actual',
          target : '.MyProfileContent:actual, .MyProfileHead:actual'
        }
      ],
      options : {
        self_selector: 'attrib:backoffice',
        default_markup: myprofilemarkup,
        elements : [
          {
            name : 'MyProfileContent',
            type : 'WebElement',
            options: {
              self_selector: 'attrib:backofficeprofile'
            }
          },
          {
            name : 'MyProfilePassContent',
            type : 'WebElement'
          },
          {
            name : 'MyProfileHead',
            type : 'WebElement',
          },
          {
            name : 'MyProfilePassHead',
            type : 'WebElement'
          },
          {
            name : 'EditMyProfile',
            type : 'AngularFormLogic',
            modifiers : [
              'AngularFormLogic.submit'
            ]
          },
          {
            name : 'ChangePassword',
            type : 'AngularFormLogic',
            options : {
              clearOnSuccess : true,
              confirmationfields: {
                cnpassword: 'npassword'
              },
              validation: {
                npassword: {
                  regex: _strongRegExString
                }
              }
            },
            modifiers : [
              'AngularFormLogic.submit'
            ]
          },
          {
            name : 'navbar-myprofilepage-toggle',
            type : 'WebElement',
            modifiers : [
              {
                name : 'RouteController',
                options : {
                  selector : 'ul li a'
                }
              }
            ]
          },
          {
            name : 'leave_myprofile',
            type : 'WebElement',
            options: {
              actual : true,
              self_selector: 'attrib:backofficeprofile'
            }
          }
        ]
      }
    });
    desc.logic.push({
      triggers : 'environment.slot:state',                                                  
      references : 'datasource.username',                                                   
      handler : function (username_ds, state) {                                             
        if ('established' !== state) {                                                      
          username_ds.set('data', null);                                                    
        }                                                                                   
      }                                                                                     
    },{
      triggers : 'element.backofficeheader.usermenu.myprofile.$element!click',
      references : 'element.basic_router',
      handler : function (RoleRouter) {
        RoleRouter.gotoUniversalRolePage ('profile');
      }
    },{
      triggers : 'element.myprofilepage.leave_myprofile.$element!click',
      references : 'element.basic_router',
      handler : function (RoleRouter) {
        RoleRouter.resetToRole();
      }
    },{
      triggers : 'element.myprofilepage.navbar-myprofilepage-toggle.$element!onSelected',
      references : 'element.basic_router',
      handler : function (RoleRouter, evnt) {
        RoleRouter.gotoPage(evnt[1]);
      }
    });
    desc.links.push({
      source: 'datasource.username:data',
      target: 'element.backofficeheader.usermenu.username:data',
    },{
      source : 'datasource.username:data',
      target : 'element.backofficeheader.usermenu:actual',
      filter : function (val) {
        return val && val.length > 0;
      }
    },{
      source: 'element.backofficeheader.usermenu.logout.$element!click',
      target: 'environment.slot>logout',
      filter: function () {
        return true;
      }
    },{
      source : 'datasource.email:data, datasource.phone:data, datasource.fname:data, datasource.lastname:data, datasource.first_name:data, datasource.admin_created:data, datasource.registered_by:data, datasource.secondphaseauth:data',
      target : 'element.myprofilepage.EditMyProfile:data',
      filter : function (email, phone, fname, lastname, first_name, admin_created, registered_by, secondphaseauth){
        return {
          email : email,
          phone : phone,
          fname : fname,
          lastname : lastname,
          name : first_name,
          created : admin_created,
          registered_by : registered_by,
          secondphaseauth : secondphaseauth
        };
      }
    });
    desc.preprocessors.RoleRouter.basic.anyRole.profile = {
      container : 'element.myprofilepage',
      default_page : 'MyProfileContent',
      pages : {
        'element.myprofilepage.ChangePassword' : 'ChangePassword',
        'element.myprofilepage.EditMyProfile' : 'MyProfileContent'
      }
    };
    /*
    */
    descriptorApi.ensureDescriptorArrayElementByPropertyName('notification', desc.preprocessors, 'AngularNotification.FromFunction', 'notification').functions.push('updateProfile', 'changePassword');
    desc.modifiers.push({
      name : 'SubmissionModifier', options : {
        cbs : [
          {
            ftion : '.>changePassword',
            filter : function (data) {
              return [data.opassword, data.npassword];
            }
          }],
        form : 'element.myprofilepage.ChangePassword'
      }
    },
    {
      name : 'SubmissionModifier', options : {
        cbs : [
          {ftion : '.>updateProfile'}
        ],
        form : 'element.myprofilepage.EditMyProfile'
      }
    });
  };
  HeaderPrePreprocessor.prototype.neededConfigurationNames = ['HEADER_LOGO', 'USER_LOGO', 'environmentName'];

  applib.registerPrePreprocessor('BackofficeHeader', HeaderPrePreprocessor);
}

module.exports = createHeaderPrePreprocessor;

},{"../markups/formmarkups.js":11}],19:[function(require,module,exports){
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

},{"./footercreator":17,"./headercreator":18,"./initcreator":20,"./logincreator":21,"./rolecreator":22,"./tablepagecreator":23,"./tablereportwithrangepickercreator":24}],20:[function(require,module,exports){
/*jshint multiline:true*/

var notificationmarkup = ' \
<div class="modal" data-ng-class="_ctrl.notificationClass" style="display:none;"> \
  <div class="modal-dialog modal-sm"> \
    <div class="modal-content"> \
      <div class="modal-header"> \
        <h5 class="modal-title">{{_ctrl.title | i18next}}</h5> \
      </div> \
      <div class="modal-body clearfix"> \
      </div> \
      <div class="modal-footer"> \
        <button type="button" class="btn btn-link" data-dismiss="modal" data-i18n="close">Close</button> \
      </div> \
    </div> \
  </div> \
</div> \
';

function createInitPrePreprocessor (execlib, applib, jquerylib, markups) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor;

  function InitPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(InitPrePreprocessor, BasicProcessor);
  InitPrePreprocessor.prototype.process = function (desc) {
    if (!desc.environments) {
      desc.environments = [];
    }
    if (!desc.datasources) {
      desc.datasources = [];
    }
    if (!desc.commands) {
      desc.commands = [];
    }
    if (!desc.elements) {
      desc.elements = [];
    }
    if (!desc.links) {
      desc.links = [];
    }
    if (!desc.logic) {
      desc.logic = [];
    }
    if (!desc.resources) {
      desc.resources = [];
    }
    if (!desc.modifiers) {
      desc.modifiers = [];
    }
    if (!desc.preprocessors) {
      desc.preprocessors = {};
    }
    desc.preprocessors.Pipeline = null;
    desc.preprocessors.RoleRouter = {
      basic: {
        roleSource : 'datasource.role:data',
        sttusSource: 'environment.'+this.config.environmentName+':state',
        anyRole: {
        },
        roles: {
        }
      }
    };
    desc.preprocessors['AngularNotification.FromFunction'] = [{
      notification: 'notification',
      functions: []
    }];
    desc.preprocessors.i18PreProcessor = {
      element_name : 'i18LanguageSelector',
      onLanguageChanged : function (langcode) {
        jQuery('body').addClass('language_'+langcode);
      }
    };
    desc.preprocessors.DataSource = [{
      environment: this.config.environmentName,
      entity: {
        name: 'role',
        type: 'allexstate',
        options : {
          path : 'profile_role',
          sink: '.'
        }
      }
    }];
    desc.preprocessors.DataCommand = [];
    desc.preprocessors.Command = [{
      environment: this.config.environmentName,
      entity: {
        name : 'validateCredentials',
        options : {
          sink : '.',
          name : 'validateCredentials'
        }
      }
    }];
    desc.environments.push({
      type: 'allexremote',
      name: this.config.environmentName,
      options: lib.extend({}, this.config.environmentOptions, {datasources: [],
      commands:[],
      datacommands:[]})
    });
    desc.resources.push({
      name : 'AngularBootstrapper',
      type: 'AngularBootstrapper',
      options : {
        'angular_dependencies' : ['allex__web_moneystringmanipulationcomponent', 'jm.i18next'/*, 'bcs.backoffice'*/].concat(this.config.angular_dependencies || [])
      }
    });
    desc.logic.push({
      triggers : 'element.basic_router:path, datasource.role:data',
      references : 'element.basic_router',
      handler : function (basic_router, path, role) {
        console.log('here comes the routing', basic_router, path, role);
        /*
        var prefix = basic_router.get('path_prefix'), $container = null;
        if (prefix) {
          $container = $('#navbar-myprofilepage');
        }else{
          switch (role) {
            case 'gameadmin' : $container = $('#navbar-second'); break;
            case 'systemadmin' : $container = $('#navbar-systemadmin'); break;
            case 'clubadmin' : $container = $('#navbar-clubadmin'); break;
            case 'agentadmin' : $container = $('#navbar-agentadmin'); break;
          }
        }
        if (!$container) {
          $container = $('.navbar.navbar-default');
        }
        updateActive ($container, path);
        */
      }
    });
    jquerylib.jQueryCreate(jQuery(document.body), '<div id="references" style="display:none"></div>');
    jquerylib.jQueryCreate('#references', '<div id="default_error_template"><div>{{_ctrl.data}}</div></div>');
    jquerylib.jQueryCreate('#references', '<div id="default_success_template"><div><span data-i18n="messages.successfully_done"></span></div></div>');
    desc.elements.push({
      name : 'notification',
      type : 'AngularNotification',
      options : {
        self_selector: 'attrib:backofficeglobal',
        default_markup: notificationmarkup,
        defaultErrorTitle : 'Error',
        defaultProgressTitle : null,
        defaultSuccessTitle : 'Success',
        onPreShow : function (notification) {
          notification.$element.localize(); //will not work without i18PreProcessor
        },
        defaultTemplate : {
          error : 'default_error_template',
          success : 'default_success_template'
        },
        errorProc : function (error) {
          return {
            caption: 'Error',
            message: 'Error'
          };
        }
      },
      modifiers : ['AngularElements.BootstrapModal']
    },{
      name : 'CheckPassword',
      type : 'AngularFormLogic',
      options: {
        self_selector: 'attrib:backofficeglobal',
        default_markup: markups.checkpassword
      },
      modifiers : ['AngularFormLogic.submit','AngularElements.BootstrapModal']
    });
  };
  InitPrePreprocessor.prototype.neededConfigurationNames = ['environmentName', 'environmentOptions'];

  applib.registerPrePreprocessor('BackofficeInit', InitPrePreprocessor);
}

module.exports = createInitPrePreprocessor;

},{}],21:[function(require,module,exports){
function createLoginPrePreprocessor (execlib, applib) {
  'use strict';

  var markup = {template: ' \
	<div class="page-container login-container"> \
		<div class="page-content"> \
			<div class="content-wrapper"> \
			</div> \
		</div> \
	</div> \
  ',
  replacements: {
  }},
  loginformmarkup = ' \
    <form novalidate style="display:none;"> \
      <div class="panel panel-body login-form"> \
        <div class="text-center"> \
          <div class="icon-object border-slate-300 text-slate-300"><i class="icon-reading"></i></div> \
          <h5 class="content-group"><span data-i18n="login.login">Login to your account</span> <small class="display-block" data-i18n="login.enter_credentials">Enter your credentials below</small></h5> \
        </div> \
        <div class="form-group has-feedback has-feedback-left"> \
          <input type="text" name="__remote__username" class="form-control" placeholder="Username" required data-i18n="[placeholder]user.username"> \
          <div class="form-control-feedback"> \
            <i class="icon-user text-muted"></i> \
          </div> \
        </div> \
        <div class="form-group has-feedback has-feedback-left"> \
          <input class="form-control" name="__remote__password" placeholder="Password" required type="password" data-i18n="[placeholder]user.password"> \
          <div class="form-control-feedback"> \
            <i class="icon-lock2 text-muted"></i> \
          </div> \
        </div> \
        <div class="form-group"> \
          <button data-ng-click="_ctrl.login()" type="submit" class="btn btn-primary btn-block btn-ladda btn-ladda-spinner backofficeloginwidgetsubmit" data-style="slide-up" data-spinner-color="#fff"><span data-i18n="login.sign_in">Sign in</span><i class="icon-circle-right2 position-right"></i></button> \
        </div> \
        <div class="text-center"> \
          <span class="text-danger backofficeloginwidgeterror" style="display:none;" data-i18n="messages.clean_credentials_invalid"></span> \
        </div> \
      </div> \
    </form> \
  ';

  var LOGIN_ERROR_TO = null;

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor;

  function LoginPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(LoginPrePreprocessor, BasicProcessor);
  LoginPrePreprocessor.prototype.process = function (desc) {
    desc.elements.push({
      type: 'WebElement',
      name: 'backofficelogin',
      options: {
        self_selector: '.',
        default_markup: markup,
        elements: [{
          type: 'AngularFormLogic',
          name: 'backofficeloginwidget',
          options: {
            actual: true,
            self_selector: '.',
            default_markup: loginformmarkup,
            target_on_parent: '.content-wrapper',
            elements: [{
              name : 'backofficeloginwidgetsubmit',
              type : 'WebElement',
              options : {
                self_selector: '.'
              }
            },{
              name : 'backofficeloginwidgeterror',
              type : 'WebElement',
              options : {
                self_selector: '.'
              }
            }]
          },
          logic : [
            {
              triggers : 'backofficeloginwidgetsubmit:actual',
              references : 'backofficeloginwidgeterror',
              handler : function(LoginWidgetError, SubmitActual) {
                if (!SubmitActual) return;
                if (LOGIN_ERROR_TO) {
                  ALLEX.lib.clearTimeout(LOGIN_ERROR_TO);
                  LOGIN_ERROR_TO = null;
                }
                LoginWidgetError.set('actual', false);
              }
            }
          ],
          links : [
             {
             source: 'backofficeloginwidgetsubmit.$element!click',
             target : '.>fireSubmit'
            },{
              source : '.:valid',
              target : 'backofficeloginwidgetsubmit:actual'
            }
          ]
        }]
      },
      logic : [{
        triggers: '.:actual',
        references: 'backofficeloginwidget',
        handler: function (lwidget) {
          lwidget.empty();
        }
      }]
    });
    desc.logic.push({
      triggers : 'environment.slot>login',
      references : 'element.backofficelogin.backofficeloginwidget.backofficeloginwidgeterror',
      handler : function (LoginWidgetError, data) {
        if (data.error) {
          LoginWidgetError.set('actual', true);
          LOGIN_ERROR_TO = ALLEX.lib.runNext (LoginWidgetError.set.bind(LoginWidgetError, 'actual', false), 2000);
        }
      }
    });
    desc.links.push({
      source: 'element.backofficelogin.backofficeloginwidget!submit',
      target: 'environment.slot>login'
    },
    {
      source: 'environment.slot:state',
      target: 'element.backofficelogin:actual',
      filter : function (state) {
        return state === 'loggedout' || state === 'error';
      }
    });
  };

  applib.registerPrePreprocessor('BackofficeLogin', LoginPrePreprocessor);
}

module.exports = createLoginPrePreprocessor;

},{}],22:[function(require,module,exports){
/*jshint multiline:true*/
var roledivmarkup = {
  template: ' \
<div class = "backofficerolediv" style="display:none"> \
MENU \
</div> \
',
  replacements: {
    MENU: ''
  }
};
var menumarkups = require('../markups/menumarkups');
function createRolePrePreprocessor (execlib, applib, MenuCreator) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    menuCreator;

  function RoleMenuCreator () {
    MenuCreator.call(this);
  }
  lib.inherit(RoleMenuCreator, MenuCreator);
  RoleMenuCreator.prototype.headerTemplate = menumarkups.header;
  RoleMenuCreator.prototype.footerTemplate = menumarkups.footer;
  RoleMenuCreator.prototype.row1Template = menumarkups.row1;
  RoleMenuCreator.prototype.submenuTemplate = menumarkups.dropdown;

  menuCreator = new RoleMenuCreator();

  function RolePrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(RolePrePreprocessor, BasicProcessor);
  RolePrePreprocessor.prototype.process = function (desc) {
    if (!lib.isArray(this.config)) {
      return;
    }
    this.config.forEach(this.processRole.bind(this, desc));
  };
  RolePrePreprocessor.prototype.processRole = function (desc, roleconf) {
    var rolename = roleconf.name,
      roleelementdesc = lib.extend({
        type: 'WebElement',
        name: rolename,
        options: {
          elements: []
        }
      }, roleconf.element),
      menustring = '';
    desc.elements.push(roleelementdesc);
    desc.preprocessors.RoleRouter.basic.roles[rolename] = {
      //default_page: 'default',
      container: 'element.'+rolename,
      pages: {
      }
    };
    if (roleconf.menu) {
      roleelementdesc.options.elements.push({
        name : 'navbar-'+rolename+'-toggle',
        type : 'WebElement',
        modifiers : [
          {
            name : 'RouteController',
            options : {
              selector : 'ul li a'
            }
          }
        ]
      });
      desc.logic.push({
        triggers: 'element.'+rolename+'.navbar-'+rolename+'-toggle.$element!onSelected',
        references: 'element.basic_router, element.'+rolename+'.navbar-'+rolename+'-toggle.$element',
        handler: function (router, element, evnt) {
          console.log(element);
          console.log(evnt);
          var page;
          page = evnt[1];
          element.find ('li.active').removeClass('active');
          if (!page) {
            return;
          }
          console.log('page', page);
          element.find('a[data-route="'+page+'"]').parent('li').addClass('active');
          element.find('a[data-route="'+page+'"]').parent('li').parent('ul').parent('li').addClass('active');
          router.gotoPage(page);
        }
      });
      menustring = menuCreator.process(roleconf.menu, onRoleMenuItemPrePreProcess.bind(null, desc, roleelementdesc), onRoleMenuItem.bind(null, desc, roleelementdesc), onRoleMenuItemLink.bind(null, desc, rolename));
    }
    roleelementdesc.options.default_markup = lib.extend({}, roledivmarkup, {replacements: {
      ROLE: rolename,
      MENU: menustring
    }});
  };
  function onRoleMenuItemPrePreProcess (desc, roleelementdesc, prepre) {
    if (prepre.global) {
      doPrePreprocess(desc, prepre.global);
    }
    if (prepre.local) {
      doPrePreprocess(roleelementdesc, prepre.local);
    }
  }
  function doPrePreprocess (desc, prepres) {
    applib.prePreprocessOn(desc,prepres);  
  }

  function onRoleMenuItem (desc, roleelementdesc, item) {
    if (item.global) {
      lib.extendWithConcat(desc, item.global);
    }
    if (item.local) {
      lib.extendWithConcat(roleelementdesc, item.local);
    }
  }

  function onRoleMenuItemLink (desc, rolename, dest, routepath, isdefault, onclickeddesc) {
    var calcdest, pages;
    switch (dest.domain) {
      case 'local':
        calcdest = 'element.'+rolename+'.'+dest.name;
        break;
      case 'global':
        calcdest = 'element.'+dest.name;
        break;
      default:
        throw new Error('Menu Item link target domain must be "local" or "global"');
    }
    pages = desc.preprocessors.RoleRouter.basic.roles[rolename].pages[calcdest];
    if (pages) {
      if (lib.isString(pages)) {
        desc.preprocessors.RoleRouter.basic.roles[rolename].pages[calcdest] = [pages, routepath];
      }
      if (lib.isArray(pages)) {
        pages.push(routepath);
      }
    } else {
      desc.preprocessors.RoleRouter.basic.roles[rolename].pages[calcdest] = routepath;
    }
    if (isdefault) {
      desc.preprocessors.RoleRouter.basic.roles[rolename].default_page = routepath;
    }
    if (onclickeddesc && onclickeddesc.handler) {
      desc.logic.push({
        triggers: 'element.'+rolename+'.navbar-'+rolename+'-toggle.$element!onSelected',
        references: onclickeddesc.references,
        handler: onClickedHandlerProducer(routepath, onclickeddesc.handler)
      });
    }
  }

  function onClickedHandlerProducer (routepath, cb) {
    return function () {
      var evnt = arguments[arguments.length-1],
        page = evnt[1];
      if (page === routepath) {
        cb.apply(null, arguments);
      }
    };
  }

  applib.registerPrePreprocessor('BackofficeRole', RolePrePreprocessor);
}

module.exports = createRolePrePreprocessor;

},{"../markups/menumarkups":12}],23:[function(require,module,exports){
function createTablePage (execlib, applib, templateslib, markups) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    descriptorApi = applib.descriptorApi,
    pagemarkups = markups.page,
    tproc = templateslib.process,
    tovrd = templateslib.override,
    tablepagelib = require('../lib/tablepage')(execlib, markups, templateslib);

  function unityTransformer (thingy) {
    return thingy;
  }

  function datasourcedataer (dsname) {
    return 'datasource.'+dsname+':data';
  }

  function TablePagePrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(TablePagePrePreprocessor, BasicProcessor);
  TablePagePrePreprocessor.prototype.process = function (desc) {
    var rolename = this.config.role,
      envname = this.config.environment,
      datasourcenames = this.config.datasource.name,
      datatransformer = this.config.datasource.transformer || this.config.datatransformer || unityTransformer,
      targetelement = descriptorApi.ensureDescriptorArrayElementByName(desc, 'elements', rolename),
      targetenvironment = descriptorApi.ensureDescriptorArrayElementByName(desc, 'environments', envname),
      elementdescriptor = {
        name: this.config.elemname,
        type: 'WebElement',
        options: {
          self_selector: 'attrib:backofficetablepage',
          default_markup: tablepagelib.tablePage(
            this.config.tablepage
          )
        },
        modifiers: ['BackofficeBodyLayout']
      };
    if (this.config.descriptor_addendum) {
      lib.extendWithConcat(elementdescriptor, this.config.descriptor_addendum);
    }
    if (!lib.isArray(datasourcenames)) {
      datasourcenames = [datasourcenames];
    }
    targetenvironment.options.datasources.push(
    );
    desc.logic.push({
      triggers: datasourcenames.map(datasourcedataer)+', datasource.role:data',
      references: 'element.'+rolename+'.'+this.config.elemname+'.tableelement',
      handler: function (table) { //varargs
        table.set('data', datatransformer.apply(null, Array.prototype.slice.call(arguments,1)));
      }
    });
    targetelement.options.elements.push(elementdescriptor);
    desc.preprocessors.DataView.views[rolename+'.'+this.config.elemname+'.tableelement'] = {
      requires: this.config.tablerequires||null,
      config: {
        actual: true,
        self_selector: 'attrib:tablepage',
        reference_markups: {
          actions: this.config.actionsmarkup
        },
        grid: this.config.grid
      },
      rowEvents: this.config.rowEvents
    };
  };
  applib.registerPrePreprocessor('BackofficeTablePage', TablePagePrePreprocessor);
}

module.exports = createTablePage;

},{"../lib/tablepage":7}],24:[function(require,module,exports){
function createTableReportWithRangePickerPrePreProcessor (execlib, applib, templateslib, markups) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    BasicElement = applib.getElementType('BasicElement'),
    pagemarkups = markups.page,
    i = templateslib.inherit,
    o = templateslib.override,
    m = markups.page;

  
  function RowEventEmitter (id, options) {
    BasicElement.call(this, id, options);
    this.rowEvent = new lib.HookCollection();
  }
  lib.inherit(RowEventEmitter, BasicElement);
  RowEventEmitter.prototype.destroy = function () {
    if (this.rowEvent) {
      this.rowEvent.destroy();
    }
    this.rowEvent = null;
    BasicElement.prototype.destroy.call(this);
  };
  applib.registerElementType('TableReportWithRangePickerRowEventableElement', RowEventEmitter);

  function makeRowEvents (bubblerowevents) {
    var ret = {};
    if (!bubblerowevents) {
      return ret;
    }
    lib.traverseShallow(bubblerowevents, makeRowEvent.bind(null, ret));
    return ret;
  }

  function rowEventFilter (filter, roweventname, evnt) {
    return {
      name: roweventname,
      data: filter(evnt)
    };
  }

  function makeRowEvent (result, filter, roweventname) {
    result[roweventname] = {
      target: 'RowEvent!rowEvent',
      filter: rowEventFilter.bind(null, filter, roweventname)
    };
  }

  function addString(total, header){
    return total + header;
  }

  function TableReportWithRangePickerPrePreProcessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(TableReportWithRangePickerPrePreProcessor, BasicProcessor);
  TableReportWithRangePickerPrePreProcessor.prototype.process = function (desc) {
    var postform = this.config.report.postform;
    var additionalHeader = this.config.report.additionalHeader;
    var fullAdditionalHeaders = '';
    this.config.report.templatereplacements.TABLEREPORTHEADERCONTENTS = postform ? '<div class="col-md-8 nopad tablereportformcontainer"></div><div class="col-md-4 nopad' + (this.config.report.postformclass ? ' ' + this.config.report.postformclass : '') + '">'+postform+'</div>' : '';
    if (lib.isArray(additionalHeader)){
      fullAdditionalHeaders = additionalHeader.reduce(addString,'');
      additionalHeader = fullAdditionalHeaders;
    }
    this.config.report.templatereplacements.ADDITIONALHEADER = additionalHeader || '';
    var elementArry = [{
      type: 'TableReportWithRangePickerRowEventableElement',
      name: 'RowEvent'
    }]
    var elemObj;
    if (this.config.additional_elements) {
      elementArry = elementArry.concat(this.config.additional_elements);
    }
    elemObj = {
      name: this.config.report.name,
      type: this.config.report.type || 'WebElement',
      options: {
        elements: elementArry,
        self_selector: 'attrib:backofficeelement',
        default_markup: o(i(m.tablereport, {
          replacements: this.config.report.templatereplacements
        }))
      },
      modifiers: ['BackofficeBodyLayout'],
      preprocessors: {
        DataView: {
          views: {
            'Table' : {
              type: 'AngularDataTable',
              config : {
                actual: true,
                self_selector: 'attrib:backofficeelement',
                default_markup: o(m.div, 'CLASS', 'table'),
                target_on_parent: '.tablereportcontainer',
                defaultHeaderCellFilter : 'i18next',
                reference_markups: {
                  actions: this.config.actionsmarkup
                },
                grid : this.config.grid
              },
              rowEvents: makeRowEvents(this.config.bubbleRowEvents)
            }
          }
        },
        TimeRangePickerForm: {
          form: {
            name: 'Range',
            options: {
              actual: true,
              target_on_parent: postform ? '.tablereportformcontainer' : '.tablereport-header2'
            }
          },
          formextras: {replacements: this.config.picker.extras},
          format: this.config.picker.format,
          interval: {
            options: {
              maxDateOffset: [-1, 'minutes'],
              options: {
                locale: this.config.picker.locale
              }
            }
          }
        }
      }
    };
    this.elementsOf(desc).push(elemObj);
  };

  applib.registerPrePreprocessor('BackofficeTableReportWithRangePicker', TableReportWithRangePickerPrePreProcessor);
}

module.exports = createTableReportWithRangePickerPrePreProcessor;

},{}],25:[function(require,module,exports){
function createPreprocessors (execlib, applib, jquerylib, templatelib, MenuCreator, markups) {
  require('./timerangepickerformcreator')(execlib, applib, jquerylib, templatelib, MenuCreator, markups); 
}

module.exports = createPreprocessors;

},{"./timerangepickerformcreator":26}],26:[function(require,module,exports){
function createTimeRangePickerFormPreprocessor (execlib, applib, jquerylib, templatelib, MenuCreator, markups) {
  'use strict';

  var lib = execlib.lib,
    AngularFormLogic = applib.getElementType('AngularFormLogic'),
    BasicProcessor = applib.BasicProcessor,
    o = templatelib.override,
    i = templatelib.inherit,
    m = markups.page;

  function TimeRangePickerAngularFormLogic (id, options) {
    AngularFormLogic.call(this, id, options);
  }
  lib.inherit(TimeRangePickerAngularFormLogic, AngularFormLogic);
  function momenter (data, format, fieldnames, val, name) {
    if (lib.isArray(fieldnames) && fieldnames.indexOf(name)<0) {
      data[name] = val;
      return;
    }
    data[name] = moment(val, format).valueOf();
  }
  TimeRangePickerAngularFormLogic.prototype.dataForFireSubmit = function () {
    var data = AngularFormLogic.prototype.dataForFireSubmit.call(this),
      format = this.getConfigVal('format'),
      mydata;
    if (format) {
      mydata = {};
      lib.traverseShallow(data, momenter.bind(null, mydata, format, ['to', 'from'].concat(this.getConfigVal('datefields')||[])));
    }
    return mydata || data;
  };
  applib.registerElementType('TimeRangePickerAngularFormLogic', TimeRangePickerAngularFormLogic);
  var afls = applib.getModifier('AngularFormLogic.submit');
  applib.getModifier('AngularFormLogic.submit').ALLOWED_ON.push('TimeRangePickerAngularFormLogic');

  var markup = o(m.form,
    'CLASS', 'form-inline',
    'CONTENTS', [
      'PREPICKERELEMENTS',
      o(m.div,
        'CLASS', 'input-group backofficetimepickergroupfrom',
        'CONTENTS', [
          o(m.textinput,
            'CLASS', 'form-control mb-2 mr-sm-2 mb-sm-0',
            'ATTRS', 'data-i18n="[placeholder]basic.start_date_from" required',
            'NAME', 'from'
          ),
          o(m.span,
            'CLASS', 'input-group-addon',
            'CONTENTS', o(m.span,
              'CLASS', 'glyphicon glyphicon-calendar'
            )
          )
        ]
      ),
      o(m.div,
        'CLASS', 'input-group backofficetimepickergroupto',
        'CONTENTS', [
          o(m.textinput,
            'CLASS', 'form-control mb-2 mr-sm-2 mb-sm-0',
            'ATTRS', 'data-i18n="[placeholder]basic.start_date_to" required',
            'NAME', 'to'
          ),
          o(m.span,
            'CLASS', 'input-group-addon',
            'CONTENTS', o(m.span,
              'CLASS', 'glyphicon glyphicon-calendar'
            )
          )
        ]
      ),
      o(m.button,
        'CLASS', 'btn btn-default',
        'ATTRS', 'data-i18n="basic.clear_filter" timerangepickerform="clear"',
        'CONTENTS', 'Clear'
      ),
      'POSTPICKERELEMENTS',
      o(m.button,
        'CLASS', 'btn btn-primary',
        'ATTRS', 'data-i18n="basic.submit_filter" timerangepickerform="submit"',
        'CONTENTS', 'Submit'
      )
    ]
  );

  function TimeRangePickerFormPreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(TimeRangePickerFormPreprocessor, BasicProcessor);

  TimeRangePickerFormPreprocessor.prototype.process = function (desc) {
    console.log('TimeRangePickerFormPreprocessor!', desc);
    desc.options.elements.push(lib.extend({}, {options:{format:this.config.format||''}}, this.config.form, {
      type: 'TimeRangePickerAngularFormLogic',
      options: {
        self_selector: 'attrib:timerangepickerform',
        default_markup: o(i(
          i(markup, {
            replacements: {
              PREPICKERELEMENTS: '',
              POSTPICKERELEMENTS: ''
            }
          }),this.config.formextras || {}
        )),
        elements: [{
          name: 'clear',
          type: 'WebElement',
          options: {
            actual: true,
            self_selector: 'attrib:timerangepickerform'
          }
        }]
      },
      modifiers: [
        {
          name: 'AngularFormLogic.submit',
          options: {
            name: 'submit',
            options: {
              self_selector: 'attrib:timerangepickerform'
            }
          }
        },
        lib.extend({}, {
          name: 'TimeInterval',
          options: {
            from: '.backofficetimepickergroupfrom',
            to: '.backofficetimepickergroupto',
            maxDateOffset : [-1, 'minutes'],
            options : {
              inline : false,
              format : this.config.format,
              locale : "en"
            }
          }
        }, this.config.interval),
        {
          name : 'TimeIntervalReset',
          options : {
            elements : ['.backofficetimepickergroupfrom', '.backofficetimepickergroupto'],
            trigger : 'clear'
          }
        }
      ]
    }));
  };

  applib.registerPreprocessor('TimeRangePickerForm', TimeRangePickerFormPreprocessor);
}

module.exports = createTimeRangePickerFormPreprocessor;

},{}]},{},[1]);
