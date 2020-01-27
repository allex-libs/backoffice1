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
        onSuccess : 'standard'
      },
      {
        element : '.>validateCredentials',
      }
    ];

  function onCheckPasswordStart (element, data, all_data) {
    element.set('actual', true);
    element.set('data', {});
  }

  function pipelineWithValidateCredentials (before, after) {
    var bisa, ret, lastbefore;
    bisa = lib.isArray(before);
    if (bisa && before.length>0) {
      lastbefore = before[before.length-1];
      if (!lastbefore.onSuccess) {
        lastbefore.onSuccess='standard';
      } else if (lastbefore.onSuccess!=='standard') {
        console.warn('PipelineWithValidateCredentials: The last element before the validateCredentials step had onSuccess', lastbefore.onSuccess);
      }
    }
    ret = bisa ? before.concat(validateCredentialsPipeline) : validateCredentialsPipeline;
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
