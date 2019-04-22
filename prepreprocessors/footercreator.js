function createFooterPrePreprocessor (execlib, applib, templateslib, markups){
  var lib = execlib.lib,
    BasicProcessor = applib.BasicProcessor,
    o = templateslib.override,
    m = markups.page;

  function createFooterMarkup(){
    return o(m.div,
      'CLASS', 'footer text-muted',
      'CONTENTS', [
        '&copy; 2018.',
        o(m.a,
          'CONTENTS', 'System administration'
        ),
        ' by ',
        o(m.a,
          'ATTRS', 'target="_blank" data-toggle="tooltip" data-placement="top"',
          'CONTENTS', 'Hers'
        )
      ]
    )
  }
  
  function FooterPrePreprocessor(){
    BasicProcessor.call(this);
  }
  lib.inherit(FooterPrePreprocessor, BasicProcessor);
  FooterPrePreprocessor.prototype.process = function(desc){
    desc.elements.push({
      type: 'WebElement',
      name: 'backofficefooter',
      options: {
        actual: true,
        self_selector: 'attrib:name',
        default_markup: createFooterMarkup()
      }
    });
  }

  applib.registerPrePreprocessor('BackofficeFooter', FooterPrePreprocessor);

}

module.exports = createFooterPrePreprocessor;
