/*jshint multiline:true*/

var inputWithLabel = {
  template: ' \
<div class="form-group"> \
  <label data-i18n="LABELi18n">LABEL</label> \
  <input type="TYPE" placeholder="LABEL" class="form-control" name="NAME" REQUIRED data-i18n="[placeholder]LABELi18n"> \
</div> \
',
  replacements: {
    LABEL: '',
    NAME: '',
    LABELi18n: '',
    TYPE: 'text',
    REQUIRED: 'required'
  }
};

var rowLabel4Data8 = {
  template: ' \
  <div class="row"> \
    <span class="col-md-4" data-i18n="LABELi18n">LABEL</span> \
    <span class="col-md-8" class="text-left">{{ANGULARDATA}}</span> \
  </div> \
  ',
  replacements: {
    LABEL: '',
    LABELi18n: '',
    ANGULARDATA: ''
  }
};

module.exports = {
  inputWithLabel: inputWithLabel,
  rowLabel4Data8: rowLabel4Data8
};

