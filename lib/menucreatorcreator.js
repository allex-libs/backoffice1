/*jshint multiline:true*/
function createMenu (execlib, templatelib) {
  'use strict';

  var lib = execlib.lib;

  function MenuCreator () {
  };

  MenuCreator.prototype.process = function (menudesc, preprecb, appcb, linkcb) {
    var contents;
    if (!lib.isArray(menudesc)) {
      return '';
    }
    contents = menudesc.reduce(this.processMenuDesc.bind(this, preprecb, appcb, linkcb), '');
    return templatelib.process(lib.extend({}, this.template, {replacements: {
      HEADER: lib.extend({}, this.headerTemplate, menudesc.header || {}),
      FOOTER: lib.extend({}, this.footerTemplate, menudesc.footer || {}),
      CONTENTS: contents
    }}));
  };

  MenuCreator.prototype.processMenuDesc = function (preprecb, appcb, linkcb, str, menudesc) {
    var row, replacementsObj = {};
    if (lib.isArray(menudesc.subitems)) {
      row = templatelib.process(
        lib.extend(
          {},
          this.submenuTemplate,
          {
            replacements: lib.extend(
              {},
              menudesc.item,
              {
                SUBMENU: menudesc.subitems.reduce(this.processMenuDesc.bind(this, preprecb, appcb, linkcb), '')
              }
            )
          }
        )
      );
    } else if (menudesc.item) {
      replacementsObj = {replacements: menudesc.item};
      if (!!menudesc.default){
        replacementsObj.replacements.LICLASS = 'active';
      }
      row = templatelib.process(lib.extend({}, this.row1Template, replacementsObj));
    }
    if (row) {
      str += ('\n'+row);
    }
    if (menudesc.app) {
      appcb(menudesc.app);
    }
    if (menudesc.prepreprocessors) {
      preprecb(menudesc.prepreprocessors);
    }
    if (menudesc.target) {
      if (!(menudesc.item && menudesc.item.ROUTE)) {
        throw new Error('Menudescriptor cannot specify a target without an item.ROUTE');
      }
      if (!menudesc.target.domain) {
        throw new Error('Menudescriptor target must have a domain property');
      }
      if (!(menudesc.target.domain === 'local' || menudesc.target.domain === 'global')) {
        throw new Error ('Menudescriptor target domain property must be "local" or "global"');
      }
      if (!menudesc.target.name) {
        throw new Error ('Menudescriptor target must have a name property');
      }
      linkcb(menudesc.target, menudesc.item.ROUTE, menudesc.default, menudesc.onClicked);
    }
    return str;
  }

  MenuCreator.prototype.template = {template: ' \
    HEADER \
    CONTENTS \
    FOOTER \
  ',
  replacements: {HEADER: '', CONTENTS: '', FOOTER: ''}};
  MenuCreator.prototype.headerTemplate = {template: '', replacements: {}};
  MenuCreator.prototype.footerTemplate = {template: '', replacements: {}};
  MenuCreator.prototype.row1Template = {template: '', replacements: {}};
  MenuCreator.prototype.submenuTemplate = {template: 'SUBMENU', replacements: {SUBMENU:''}};

  return MenuCreator;
}

module.exports = createMenu;
