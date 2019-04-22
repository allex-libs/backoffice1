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
