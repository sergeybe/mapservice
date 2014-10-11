define([
  'marionette',
  'text!templates/map.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    className: 'map',
    template: _.template(template)
  });

});
