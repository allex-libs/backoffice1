/*jshint multiline:true*/
var roledivmarkup = {
  template: ' \
<div class = "backofficerolediv" style="display:none"> \
MENU \
</div> \
',
  replacements: {
    MENU: ''
  }
};
var menumarkups = require('../markups/menumarkups');
function createRolePrePreprocessor (execlib, applib, MenuCreator) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    menuCreator;

  function RoleMenuCreator () {
    MenuCreator.call(this);
  }
  lib.inherit(RoleMenuCreator, MenuCreator);
  RoleMenuCreator.prototype.headerTemplate = menumarkups.header;
  RoleMenuCreator.prototype.footerTemplate = menumarkups.footer;
  RoleMenuCreator.prototype.row1Template = menumarkups.row1;
  RoleMenuCreator.prototype.submenuTemplate = menumarkups.dropdown;

  menuCreator = new RoleMenuCreator();

  function RolePrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(RolePrePreprocessor, BasicProcessor);
  RolePrePreprocessor.prototype.process = function (desc) {
    if (!lib.isArray(this.config)) {
      return;
    }
    this.config.forEach(this.processRole.bind(this, desc));
  };
  RolePrePreprocessor.prototype.processRole = function (desc, roleconf) {
    var rolename = roleconf.name,
      roleelementdesc = lib.extend({
        type: 'WebElement',
        name: rolename,
        options: {
          elements: []
        }
      }, roleconf.element),
      menustring = '';
    desc.elements.push(roleelementdesc);
    desc.preprocessors.RoleRouter.basic.roles[rolename] = {
      //default_page: 'default',
      container: 'element.'+rolename,
      pages: {
      }
    };
    if (roleconf.menu) {
      roleelementdesc.options.elements.push({
        name : 'navbar-'+rolename+'-toggle',
        type : 'WebElement',
        modifiers : [
          {
            name : 'RouteController',
            options : {
              selector : 'ul li a'
            }
          }
        ]
      });
      desc.logic.push({
        triggers: 'element.'+rolename+'.navbar-'+rolename+'-toggle.$element!onSelected',
        references: 'element.basic_router, element.'+rolename+'.navbar-'+rolename+'-toggle.$element',
        handler: function (router, element, evnt) {
          console.log(element);
          console.log(evnt);
          var page;
          page = evnt[1];
          element.find ('li.active').removeClass('active');
          if (!page) {
            return;
          }
          console.log('page', page);
          element.find('a[data-route="'+page+'"]').parent('li').addClass('active');
          element.find('a[data-route="'+page+'"]').parent('li').parent('ul').parent('li').addClass('active');
          router.gotoPage(page);
        }
      });
      menustring = menuCreator.process(roleconf.menu, onRoleMenuItemPrePreProcess.bind(null, desc, roleelementdesc), onRoleMenuItem.bind(null, desc, roleelementdesc), onRoleMenuItemLink.bind(null, desc, rolename));
    }
    roleelementdesc.options.default_markup = lib.extend({}, roledivmarkup, {replacements: {
      ROLE: rolename,
      MENU: menustring
    }});
  };
  function onRoleMenuItemPrePreProcess (desc, roleelementdesc, prepre) {
    if (prepre.global) {
      doPrePreprocess(desc, prepre.global);
    }
    if (prepre.local) {
      doPrePreprocess(roleelementdesc, prepre.local);
    }
  }
  function doPrePreprocess (desc, prepres) {
    applib.prePreprocessOn(desc,prepres);  
  }

  function onRoleMenuItem (desc, roleelementdesc, item) {
    if (item.global) {
      lib.extendWithConcat(desc, item.global);
    }
    if (item.local) {
      lib.extendWithConcat(roleelementdesc, item.local);
    }
  }

  function onRoleMenuItemLink (desc, rolename, dest, routepath, isdefault, onclickeddesc) {
    var calcdest, pages;
    switch (dest.domain) {
      case 'local':
        calcdest = 'element.'+rolename+'.'+dest.name;
        break;
      case 'global':
        calcdest = 'element.'+dest.name;
        break;
      default:
        throw new Error('Menu Item link target domain must be "local" or "global"');
    }
    pages = desc.preprocessors.RoleRouter.basic.roles[rolename].pages[calcdest];
    if (pages) {
      if (lib.isString(pages)) {
        desc.preprocessors.RoleRouter.basic.roles[rolename].pages[calcdest] = [pages, routepath];
      }
      if (lib.isArray(pages)) {
        pages.push(routepath);
      }
    } else {
      desc.preprocessors.RoleRouter.basic.roles[rolename].pages[calcdest] = routepath;
    }
    if (isdefault) {
      desc.preprocessors.RoleRouter.basic.roles[rolename].default_page = routepath;
    }
    if (onclickeddesc && onclickeddesc.handler) {
      desc.logic.push({
        triggers: 'element.'+rolename+'.navbar-'+rolename+'-toggle.$element!onSelected',
        references: onclickeddesc.references,
        handler: onClickedHandlerProducer(routepath, onclickeddesc.handler)
      });
    }
  }

  function onClickedHandlerProducer (routepath, cb) {
    return function () {
      var evnt = arguments[arguments.length-1],
        page = evnt[1];
      if (page === routepath) {
        cb.apply(null, arguments);
      }
    };
  }

  applib.registerPrePreprocessor('BackofficeRole', RolePrePreprocessor);
}

module.exports = createRolePrePreprocessor;
