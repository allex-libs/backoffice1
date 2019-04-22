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
