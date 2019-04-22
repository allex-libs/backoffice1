function createLoginPrePreprocessor (execlib, applib) {
  'use strict';

  var markup = {template: ' \
	<div class="page-container login-container"> \
		<div class="page-content"> \
			<div class="content-wrapper"> \
			</div> \
		</div> \
	</div> \
  ',
  replacements: {
  }},
  loginformmarkup = ' \
    <form novalidate style="display:none;"> \
      <div class="panel panel-body login-form"> \
        <div class="text-center"> \
          <div class="icon-object border-slate-300 text-slate-300"><i class="icon-reading"></i></div> \
          <h5 class="content-group"><span data-i18n="login.login">Login to your account</span> <small class="display-block" data-i18n="login.enter_credentials">Enter your credentials below</small></h5> \
        </div> \
        <div class="form-group has-feedback has-feedback-left"> \
          <input type="text" name="__remote__username" class="form-control" placeholder="Username" required data-i18n="[placeholder]user.username"> \
          <div class="form-control-feedback"> \
            <i class="icon-user text-muted"></i> \
          </div> \
        </div> \
        <div class="form-group has-feedback has-feedback-left"> \
          <input class="form-control" name="__remote__password" placeholder="Password" required type="password" data-i18n="[placeholder]user.password"> \
          <div class="form-control-feedback"> \
            <i class="icon-lock2 text-muted"></i> \
          </div> \
        </div> \
        <div class="form-group"> \
          <button data-ng-click="_ctrl.login()" type="submit" class="btn btn-primary btn-block btn-ladda btn-ladda-spinner backofficeloginwidgetsubmit" data-style="slide-up" data-spinner-color="#fff"><span data-i18n="login.sign_in">Sign in</span><i class="icon-circle-right2 position-right"></i></button> \
        </div> \
        <div class="text-center"> \
          <span class="text-danger backofficeloginwidgeterror" style="display:none;" data-i18n="messages.clean_credentials_invalid"></span> \
        </div> \
      </div> \
    </form> \
  ';

  var LOGIN_ERROR_TO = null;

  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor;

  function LoginPrePreprocessor () {
    BasicProcessor.call(this);
  }
  lib.inherit(LoginPrePreprocessor, BasicProcessor);
  LoginPrePreprocessor.prototype.process = function (desc) {
    desc.elements.push({
      type: 'WebElement',
      name: 'backofficelogin',
      options: {
        self_selector: '.',
        default_markup: markup,
        elements: [{
          type: 'AngularFormLogic',
          name: 'backofficeloginwidget',
          options: {
            actual: true,
            self_selector: '.',
            default_markup: loginformmarkup,
            target_on_parent: '.content-wrapper',
            elements: [{
              name : 'backofficeloginwidgetsubmit',
              type : 'WebElement',
              options : {
                self_selector: '.'
              }
            },{
              name : 'backofficeloginwidgeterror',
              type : 'WebElement',
              options : {
                self_selector: '.'
              }
            }]
          },
          logic : [
            {
              triggers : 'backofficeloginwidgetsubmit:actual',
              references : 'backofficeloginwidgeterror',
              handler : function(LoginWidgetError, SubmitActual) {
                if (!SubmitActual) return;
                if (LOGIN_ERROR_TO) {
                  ALLEX.lib.clearTimeout(LOGIN_ERROR_TO);
                  LOGIN_ERROR_TO = null;
                }
                LoginWidgetError.set('actual', false);
              }
            }
          ],
          links : [
             {
             source: 'backofficeloginwidgetsubmit.$element!click',
             target : '.>fireSubmit'
            },{
              source : '.:valid',
              target : 'backofficeloginwidgetsubmit:actual'
            }
          ]
        }]
      },
      logic : [{
        triggers: '.:actual',
        references: 'backofficeloginwidget',
        handler: function (lwidget) {
          lwidget.empty();
        }
      }]
    });
    desc.logic.push({
      triggers : 'environment.slot>login',
      references : 'element.backofficelogin.backofficeloginwidget.backofficeloginwidgeterror',
      handler : function (LoginWidgetError, data) {
        if (data.error) {
          LoginWidgetError.set('actual', true);
          LOGIN_ERROR_TO = ALLEX.lib.runNext (LoginWidgetError.set.bind(LoginWidgetError, 'actual', false), 2000);
        }
      }
    });
    desc.links.push({
      source: 'element.backofficelogin.backofficeloginwidget!submit',
      target: 'environment.slot>login'
    },
    {
      source: 'environment.slot:state',
      target: 'element.backofficelogin:actual',
      filter : function (state) {
        return state === 'loggedout' || state === 'error';
      }
    });
  };

  applib.registerPrePreprocessor('BackofficeLogin', LoginPrePreprocessor);
}

module.exports = createLoginPrePreprocessor;
