define([
  'marionette',
  'text!templates/coordrow.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'coord-row-item',
    template: _.template(template)
  });

});
