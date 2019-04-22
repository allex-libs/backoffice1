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
