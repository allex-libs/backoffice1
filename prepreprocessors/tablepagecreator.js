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
