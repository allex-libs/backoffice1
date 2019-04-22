/*jshint multiline:true*/

var notificationmarkup = ' \
<div class="modal" data-ng-class="_ctrl.notificationClass" style="display:none;"> \
  <div class="modal-dialog modal-sm"> \
    <div class="modal-content"> \
      <div class="modal-header"> \
        <h5 class="modal-title">{{_ctrl.title | i18next}}</h5> \
      </div> \
      <div class="modal-body clearfix"> \
      </div> \
      <div class="modal-footer"> \
        <button type="button" class="btn btn-link" data-dismiss="modal" data-i18n="close">Close</button> \
      </div> \
    </div> \
  </div> \
</div> \
';

function createInitPrePreprocessor (execlib, applib, jquerylib, markups) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor;

  function InitPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(InitPrePreprocessor, BasicProcessor);
  InitPrePreprocessor.prototype.process = function (desc) {
    if (!desc.environments) {
      desc.environments = [];
    }
    if (!desc.datasources) {
      desc.datasources = [];
    }
    if (!desc.commands) {
      desc.commands = [];
    }
    if (!desc.elements) {
      desc.elements = [];
    }
    if (!desc.links) {
      desc.links = [];
    }
    if (!desc.logic) {
      desc.logic = [];
    }
    if (!desc.resources) {
      desc.resources = [];
    }
    if (!desc.modifiers) {
      desc.modifiers = [];
    }
    if (!desc.preprocessors) {
      desc.preprocessors = {};
    }
    desc.preprocessors.Pipeline = null;
    desc.preprocessors.RoleRouter = {
      basic: {
        roleSource : 'datasource.role:data',
        sttusSource: 'environment.'+this.config.environmentName+':state',
        anyRole: {
        },
        roles: {
        }
      }
    };
    desc.preprocessors['AngularNotification.FromFunction'] = [{
      notification: 'notification',
      functions: []
    }];
    desc.preprocessors.i18PreProcessor = {
      element_name : 'i18LanguageSelector',
      onLanguageChanged : function (langcode) {
        jQuery('body').addClass('language_'+langcode);
      }
    };
    desc.preprocessors.DataSource = [{
      environment: this.config.environmentName,
      entity: {
        name: 'role',
        type: 'allexstate',
        options : {
          path : 'profile_role',
          sink: '.'
        }
      }
    }];
    desc.preprocessors.DataCommand = [];
    desc.preprocessors.Command = [{
      environment: this.config.environmentName,
      entity: {
        name : 'validateCredentials',
        options : {
          sink : '.',
          name : 'validateCredentials'
        }
      }
    }];
    desc.environments.push({
      type: 'allexremote',
      name: this.config.environmentName,
      options: lib.extend({}, this.config.environmentOptions, {datasources: [],
      commands:[],
      datacommands:[]})
    });
    desc.resources.push({
      name : 'AngularBootstrapper',
      type: 'AngularBootstrapper',
      options : {
        'angular_dependencies' : ['allex__web_moneystringmanipulationcomponent', 'jm.i18next'/*, 'bcs.backoffice'*/].concat(this.config.angular_dependencies || [])
      }
    });
    desc.logic.push({
      triggers : 'element.basic_router:path, datasource.role:data',
      references : 'element.basic_router',
      handler : function (basic_router, path, role) {
        console.log('here comes the routing', basic_router, path, role);
        /*
        var prefix = basic_router.get('path_prefix'), $container = null;
        if (prefix) {
          $container = $('#navbar-myprofilepage');
        }else{
          switch (role) {
            case 'gameadmin' : $container = $('#navbar-second'); break;
            case 'systemadmin' : $container = $('#navbar-systemadmin'); break;
            case 'clubadmin' : $container = $('#navbar-clubadmin'); break;
            case 'agentadmin' : $container = $('#navbar-agentadmin'); break;
          }
        }
        if (!$container) {
          $container = $('.navbar.navbar-default');
        }
        updateActive ($container, path);
        */
      }
    });
    jquerylib.jQueryCreate(jQuery(document.body), '<div id="references" style="display:none"></div>');
    jquerylib.jQueryCreate('#references', '<div id="default_error_template"><div>{{_ctrl.data}}</div></div>');
    jquerylib.jQueryCreate('#references', '<div id="default_success_template"><div><span data-i18n="messages.successfully_done"></span></div></div>');
    desc.elements.push({
      name : 'notification',
      type : 'AngularNotification',
      options : {
        self_selector: 'attrib:backofficeglobal',
        default_markup: notificationmarkup,
        defaultErrorTitle : 'Error',
        defaultProgressTitle : null,
        defaultSuccessTitle : 'Success',
        onPreShow : function (notification) {
          notification.$element.localize(); //will not work without i18PreProcessor
        },
        defaultTemplate : {
          error : 'default_error_template',
          success : 'default_success_template'
        },
        errorProc : function (error) {
          return {
            caption: 'Error',
            message: 'Error'
          };
        }
      },
      modifiers : ['AngularElements.BootstrapModal']
    },{
      name : 'CheckPassword',
      type : 'AngularFormLogic',
      options: {
        self_selector: 'attrib:backofficeglobal',
        default_markup: markups.checkpassword
      },
      modifiers : ['AngularFormLogic.submit','AngularElements.BootstrapModal']
    });
  };
  InitPrePreprocessor.prototype.neededConfigurationNames = ['environmentName', 'environmentOptions'];

  applib.registerPrePreprocessor('BackofficeInit', InitPrePreprocessor);
}

module.exports = createInitPrePreprocessor;
