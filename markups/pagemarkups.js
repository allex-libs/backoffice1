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
