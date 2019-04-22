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
