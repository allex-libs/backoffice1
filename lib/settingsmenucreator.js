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
