/*jshint multiline:true*/

var formmarkups = require('../markups/formmarkups.js');
var _strongRegExString = "^(?=.*[\\w])(?=.*[\\W])(?=.*[0-9])(?=.*[!\\.,:;\\-@#\\$%\\^&\\*\\(\\)\\~\\`\\+\\=\\>\\<\\/\\\\\|\\?])(?=.{8,})";

function createHeaderPrePreprocessor (execlib, applib) {
  'use strict';

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    descriptorApi = applib.descriptorApi;

  var headermarkup = {template: ' \
	<div class="navbar navbar-inverse"> \
		<div class="navbar-header"> \
			<a class="navbar-brand" href="MAIN_LINK"><img src="HEADER_LOGO" alt=""></a> \
			<ul class="nav navbar-nav pull-right visible-xs-block"> \
				<li><a data-toggle="collapse" data-target="#backoffice-header-navbar"><i class="icon-tree5"></i></a></li> \
			</ul> \
		</div> \
		<div class="navbar-collapse collapse" id="backoffice-header-navbar"> \
			<ul class="nav navbar-nav navbar-right"> \
				<li class="dropdown dropdown-user" backofficeheader="usermenu" style="display:none;"> \
					<a class="dropdown-toggle" data-toggle="dropdown"> \
						<img src="USER_LOGO" alt=""> \
						<span backofficeheader="username">{{_ctrl.data}}</span> \
						<i class="caret"></i> \
					</a> \
					<ul class="dropdown-menu dropdown-menu-right"> \
						<li><a backofficeheader="myprofile" href="#"><i class="icon-user-plus"></i><span data-i18n="user.myprofile">My profile</span></a></li> \
						<li class="divider"></li> \
						<li><a href="#" backofficeheader="logout"><i class="icon-switch2"></i><span data-i18n="user.logout">Logout</span></a></li> \
					</ul> \
				</li> \
			</ul> \
		</div> \
	</div> \
    ',
    replacements: {
      HEADER_LOGO: null, //'assets/images/logo_light.png'
      USER_LOGO: null, //'assets/images/placeholder.jpg'
      MAIN_LINK: '#', //not needed for a WebApp
    }
  },
  myprofilemarkup = {template: ' \
  <div style="display:none;"> \
    <div class="navbar navbar-default" id="navbar-myprofilepage"> \
      <ul class="nav navbar-nav no-border visible-xs-block"> \
        <li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-myprofilepage-toggle"><i class="icon-menu7"></i></a></li> \
      </ul> \
      <div class="navbar-collapse collapse" id="navbar-myprofilepage-toggle"> \
        <ul class="nav navbar-nav"> \
          <li><a href="#" data-route="MyProfileContent"><i class="icon-profile position-left"></i><span data-i18n="user.mydata">My data</span></a></li> \
          <li><a href="#" data-route="ChangePassword"><i class="icon-lock2 position-left"></i><span data-i18n="user.changepass">Change password</span></a></li> \
        </ul> \
        <ul class="nav navbar-nav navbar-right"> \
          <li><a backofficeprofile="leave_myprofile" href="#"><i class="icon-cross3"></i><span data-i18n="close">Close</span></a></li> \
        </ul> \
      </div> \
    </div> \
    <div id="MyProfileHead" class="page-header" style="display:none;"> \
      <div class="page-header-content"> \
        <div class="page-title"> \
          <h4><i class="icon-arrow-left52 position-left"></i><span class="text-semibold" data-i18n="user.mydata">My profile</span></h4> \
        </div> \
      </div> \
    </div> \
    <div id="MyProfilePassHead" class="page-header" style="display:none;"> \
      <div class="page-header-content"> \
        <div class="page-title"> \
          <h4><i class="icon-arrow-left52 position-left"></i><span class="text-semibold" data-i18n="user.changepass">Change password</span></h4> \
        </div> \
      </div> \
    </div> \
    <div id="MyProfilePassContent" class="page-container" style="display:none;"> \
      <div class="page-content"> \
        <div class="content-wrapper"> \
          <div id="ChangePassword"> \
            <form> \
              OLDPASSWORDINPUT \
              NEWPASSWORDINPUT \
              CONFIRMNEWPASSWORDINPUT \
            </form> \
            <div class="row"> \
              <button type="button" class="btn btn-primary col-md-1 col-md-offset-11" id="ChangePasswordSubmit" data-i18n="save">Submit</button> \
            </div> \
          </div> \
        </div> \
      </div> \
    </div> \
    <div backofficeprofile="MyProfileContent" class="page-container" style="display:none;"> \
      <div class="page-content"> \
        <div class="content-wrapper"> \
          <div id="EditMyProfile"> \
            <form> \
              NAMEINPUT \
              PHONEINPUT \
              EMAILINPUT \
              <div class="checkbox"> \
                <label> \
                  <input type="checkbox" data-ng-true-value="\'sms\'" data-ng-false-value="null" name="secondphaseauth"> \
                  <span data-i18n="user.sms">Allow second phase</span> \
                </label> \
              </div> \
              REGISTEREDBY \
              REGISTEREDON \
            </form> \
            <div class="row"> \
              <button type="button" class="btn btn-primary col-md-1 col-md-offset-11" id="EditMyProfileSubmit" data-i18n="save">Submit</button> \
            </div> \
          </div> \
        </div> \
      </div> \
    </div> \
  </div> \
  ',
  prereplacements: [{
    OLDPASSWORDINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Old password',
          NAME: 'opassword',
          LABELi18n: 'user.old_password',
          TYPE: 'password'
        }
      }
    ),
    NEWPASSWORDINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'New password',
          NAME: 'npassword',
          LABELi18n: 'user.new_password',
          TYPE: 'password'
        }
      }
    ),
    CONFIRMNEWPASSWORDINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Confirm new password',
          NAME: 'cnpassword',
          LABELi18n: 'user.confirm_pass',
          TYPE: 'password'
        }
      }
    ),
    NAMEINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Full name',
          NAME: 'name',
          LABELi18n: 'user.full_name',
          TYPE: 'text'
        }
      }
    ),
    PHONEINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'Phone number',
          NAME: 'phone',
          LABELi18n: 'user.phone',
          TYPE: 'phone'
        }
      }
    ),
    EMAILINPUT: lib.extend({},
      formmarkups.inputWithLabel,
      {
        replacements: {
          LABEL: 'e-mail',
          NAME: 'email',
          LABELi18n: 'user.email',
          TYPE: 'email'
        }
      }
    ),
    REGISTEREDBY: lib.extend({},
      formmarkups.rowLabel4Data8,
      {
        replacements: {
          LABEL: 'Registered by:',
          LABELi18n: 'user.registered_by',
          ANGULARDATA: '_ctrl.data.registered_by'
        }
      }
    ),
    REGISTEREDON: lib.extend({},
      formmarkups.rowLabel4Data8,
      {
        replacements: {
          LABEL: 'Registered:',
          LABELi18n: 'user.registered_timestamp',
          ANGULARDATA: "_ctrl.data.created | date:'dd.MM.yyyy / HH:mm'"
        }
      }
    )
  }],
  replacements: {
  }};

  function HeaderPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(HeaderPrePreprocessor, BasicProcessor);
  HeaderPrePreprocessor.prototype.process = function (desc) {
    var targetenv = descriptorApi.ensureDescriptorArrayElementByName(desc, 'environments', this.config.environmentName);
    targetenv.options.datasources.push({
      name: 'username',
      type: 'allexstate',
      options: {
        path : 'profile_username',
        sink : '.'
      }
    },
    {
      name: 'username',
      type: 'allexstate',
      options: {
        path : 'profile_username',
        sink : '.'
      }
    },
    {
      name : 'secondphaseauth',
      type : 'allexstate',
      options : {
        path : 'profile_secondphaseauth',
        sink : '.'
      }
    },
    {
      name : 'first_name',
      type : 'allexstate',
      options : {
        path : 'profile_name',
        sink : '.'
      }
    },
    {
      name : 'lastname',
      type : 'allexstate',
      options : {
        path : 'profile_lastname',
        sink : '.'
      }
    },
    {
      name : 'fname',
      type : 'allexstate',
      options : {
        path : 'profile_fname',
        sink : '.'
      }
    },
    {
      name : 'phone',
      type : 'allexstate',
      options : {
        path : 'profile_phone',
        sink : '.'
      }
    },
    {
      name : 'email',
      type : 'allexstate',
      options : {
        path : 'profile_email',
        sink : '.'
      }
    },
    {
      name : 'registered_by',
      type : 'allexstate',
      options : {
        path : 'profile_registered_by',
        sink : '.'
      }
    },
    {
      name : 'admin_created',
      type : 'allexstate',
      options : {
        sink : '.',
        path : 'profile_created'
      }
    },
    {
      name: 'clubid',
      type: 'allexstate',
      options : {
        path : 'profile_clubid',
        sink : '.'
      }
    });
    targetenv.options.commands.push({
      name : 'updateProfile',
      options : {
        sink : '.',
        name : 'updateProfile'
      }
    },{
      name : 'changePassword',
      options : {
        sink : '.',
        name : 'changePassword'
      }
    });
    desc.datasources.push({
      name: 'username',
      environment: this.config.environmentName
    },{
      name: 'secondphaseauth',
      environment: this.config.environmentName
    },{
      name: 'first_name',
      environment: this.config.environmentName
    },{
      name: 'lastname',
      environment: this.config.environmentName
    },{
      name: 'fname',
      environment: this.config.environmentName
    },{
      name: 'phone',
      environment: this.config.environmentName
    },{
      name: 'email',
      environment: this.config.environmentName
    },{
      name: 'registered_by',
      environment: this.config.environmentName
    },{
      name: 'admin_created',
      environment: this.config.environmentName
    },{
      name: 'clubid',
      environment: this.config.environmentName
    });
    desc.commands.push({
      command: 'updateProfile',
      environment: this.config.environmentName
    },{
      command: 'changePassword',
      environment: this.config.environmentName
    });
    desc.elements.push({
      type: 'WebElement',
      name: 'backofficeheader',
      options: {
        actual: true,
        self_selector: 'attrib:name',
        default_markup: lib.extend({}, headermarkup, {replacements:{
          HEADER_LOGO: this.config.HEADER_LOGO,
          USER_LOGO: this.config.USER_LOGO
        }}),
        elements: [{
          type: 'WebElement',
          name: 'usermenu',
          options: {
            self_selector: 'attrib:backofficeheader',
            elements: [{
              type: 'AngularElement',
              name: 'username',
              options: {
                actual: true,
                self_selector: 'attrib:backofficeheader'
              }
            },{
              type: 'WebElement',
              name: 'myprofile',
              options: {
                actual: true,
                self_selector: 'attrib:backofficeheader'
              }
            },{
              type: 'WebElement',
              name: 'logout',
              options: {
                actual: true,
                self_selector: 'attrib:backofficeheader'
              }
            }]
          }
        }]
      }
    },{
      name : 'myprofilepage',
      type : 'WebElement',
      links : [
        {
          source : '.ChangePassword:actual',
          target : '.MyProfilePassHead:actual, .MyProfilePassContent:actual'
        },
        {
          source : '.EditMyProfile:actual',
          target : '.MyProfileContent:actual, .MyProfileHead:actual'
        }
      ],
      options : {
        self_selector: 'attrib:backoffice',
        default_markup: myprofilemarkup,
        elements : [
          {
            name : 'MyProfileContent',
            type : 'WebElement',
            options: {
              self_selector: 'attrib:backofficeprofile'
            }
          },
          {
            name : 'MyProfilePassContent',
            type : 'WebElement'
          },
          {
            name : 'MyProfileHead',
            type : 'WebElement',
          },
          {
            name : 'MyProfilePassHead',
            type : 'WebElement'
          },
          {
            name : 'EditMyProfile',
            type : 'AngularFormLogic',
            modifiers : [
              'AngularFormLogic.submit'
            ]
          },
          {
            name : 'ChangePassword',
            type : 'AngularFormLogic',
            options : {
              clearOnSuccess : true,
              confirmationfields: {
                cnpassword: 'npassword'
              },
              validation: {
                npassword: {
                  regex: _strongRegExString
                }
              }
            },
            modifiers : [
              'AngularFormLogic.submit'
            ]
          },
          {
            name : 'navbar-myprofilepage-toggle',
            type : 'WebElement',
            modifiers : [
              {
                name : 'RouteController',
                options : {
                  selector : 'ul li a'
                }
              }
            ]
          },
          {
            name : 'leave_myprofile',
            type : 'WebElement',
            options: {
              actual : true,
              self_selector: 'attrib:backofficeprofile'
            }
          }
        ]
      }
    });
    desc.logic.push({
      triggers : 'environment.slot:state',                                                  
      references : 'datasource.username',                                                   
      handler : function (username_ds, state) {                                             
        if ('established' !== state) {                                                      
          username_ds.set('data', null);                                                    
        }                                                                                   
      }                                                                                     
    },{
      triggers : 'element.backofficeheader.usermenu.myprofile.$element!click',
      references : 'element.basic_router',
      handler : function (RoleRouter) {
        RoleRouter.gotoUniversalRolePage ('profile');
      }
    },{
      triggers : 'element.myprofilepage.leave_myprofile.$element!click',
      references : 'element.basic_router',
      handler : function (RoleRouter) {
        RoleRouter.resetToRole();
      }
    },{
      triggers : 'element.myprofilepage.navbar-myprofilepage-toggle.$element!onSelected',
      references : 'element.basic_router',
      handler : function (RoleRouter, evnt) {
        RoleRouter.gotoPage(evnt[1]);
      }
    });
    desc.links.push({
      source: 'datasource.username:data',
      target: 'element.backofficeheader.usermenu.username:data',
    },{
      source : 'datasource.username:data',
      target : 'element.backofficeheader.usermenu:actual',
      filter : function (val) {
        return val && val.length > 0;
      }
    },{
      source: 'element.backofficeheader.usermenu.logout.$element!click',
      target: 'environment.slot>logout',
      filter: function () {
        return true;
      }
    },{
      source : 'datasource.email:data, datasource.phone:data, datasource.fname:data, datasource.lastname:data, datasource.first_name:data, datasource.admin_created:data, datasource.registered_by:data, datasource.secondphaseauth:data',
      target : 'element.myprofilepage.EditMyProfile:data',
      filter : function (email, phone, fname, lastname, first_name, admin_created, registered_by, secondphaseauth){
        return {
          email : email,
          phone : phone,
          fname : fname,
          lastname : lastname,
          name : first_name,
          created : admin_created,
          registered_by : registered_by,
          secondphaseauth : secondphaseauth
        };
      }
    });
    desc.preprocessors.RoleRouter.basic.anyRole.profile = {
      container : 'element.myprofilepage',
      default_page : 'MyProfileContent',
      pages : {
        'element.myprofilepage.ChangePassword' : 'ChangePassword',
        'element.myprofilepage.EditMyProfile' : 'MyProfileContent'
      }
    };
    /*
    */
    descriptorApi.ensureDescriptorArrayElementByPropertyName('notification', desc.preprocessors, 'AngularNotification.FromFunction', 'notification').functions.push('updateProfile', 'changePassword');
    desc.modifiers.push({
      name : 'SubmissionModifier', options : {
        cbs : [
          {
            ftion : '.>changePassword',
            filter : function (data) {
              return [data.opassword, data.npassword];
            }
          }],
        form : 'element.myprofilepage.ChangePassword'
      }
    },
    {
      name : 'SubmissionModifier', options : {
        cbs : [
          {ftion : '.>updateProfile'}
        ],
        form : 'element.myprofilepage.EditMyProfile'
      }
    });
  };
  HeaderPrePreprocessor.prototype.neededConfigurationNames = ['HEADER_LOGO', 'USER_LOGO', 'environmentName'];

  applib.registerPrePreprocessor('BackofficeHeader', HeaderPrePreprocessor);
}

module.exports = createHeaderPrePreprocessor;
