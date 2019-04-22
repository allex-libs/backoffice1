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
