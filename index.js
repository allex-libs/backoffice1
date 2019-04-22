function createLib (execlib) {
  return execlib.loadDependencies('client', ['allex:app:lib', 'allex:jqueryelements:lib', 'allex:templateslite:lib', 'allex:htmltemplates:lib', 'allex:bootstraptemplates:lib'], require('./libindex').bind(null, execlib));
}

module.exports = createLib;
