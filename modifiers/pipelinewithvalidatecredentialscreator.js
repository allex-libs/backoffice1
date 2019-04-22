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
