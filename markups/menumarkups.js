/*jshint multiline:true*/
var headermarkup = {
  template:' \
  <div class="navbar navbar-default" id="navbar-ROLE"> \
    <ul class="nav navbar-nav no-border visible-xs-block"> \
      <li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-ROLE-toggle"><i class="icon-menu7"></i></a></li> \
    </ul> \
    <div class="navbar-collapse collapse" id="navbar-ROLE-toggle"> \
      <ul class="nav navbar-nav"> \
',
  replacements: {
    ROLE: 'ROLE'
  }
};
var footermarkup = {
  template: ' \
      </ul> \
    </div> \
',
  replacements: {
  }
};
var row1markup = {
  template: '<li class="LICLASS"><a href="#" data-route="ROUTE"><i class="ICON POSITION"></i><span data-i18n="CAPTIONi18n">CAPTION</span></a></li>',
  replacements: {
    ROUTE: '',
    CAPTION: '',
    CAPTIONi18n: '',
    ICON: '',
    POSITION: 'position-left',
    LICLASS: ''
  }
};

var dropdownmarkup = {
  template: '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="ICON POSITION"></i><span data-i18n="CAPTIONi18n">CAPTION</span><span class="caret"></span></a><ul class="dropdown-menu width-200">SUBMENU</ul></li>',
  replacements: {
    CAPTION: '',
    CAPTIONi18n: '',
    ICON: '',
    POSITION: 'position-left',
    SUBMENU: ''
  }
};

module.exports = {
  header: headermarkup,
  footer: footermarkup,
  row1: row1markup,
  dropdown: dropdownmarkup
};

