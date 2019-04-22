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
