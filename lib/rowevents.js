function produceRowEventsHelpers (lib) {
  'use strict';

  function standardPipelineActivatorFilter (evnt) {
    return evnt[1];
  }

  function standardPipelineActivatorFilterFiltered (cb, evnt) {
    return cb(evnt[1]);
  }

  function standardPipelineActivator (pipelinename) {
    return {
      target: 'element.'+pipelinename+':actual',
      filter: standardPipelineActivatorFilter
    }
  }

  function standardPipelineActivatorFiltered (pipelinename, cb) {
    return {
      target: 'element.'+pipelinename+':actual',
      filter: standardPipelineActivatorFilterFiltered.bind(null, cb)
    }
  }

  return {
    standardPipelineActivator: standardPipelineActivator,
    standardPipelineActivatorFiltered: standardPipelineActivatorFiltered
  }
}

module.exports = produceRowEventsHelpers;
