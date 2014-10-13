define([
  'marionette',
  'behaviors/fillable',
  'text!templates/map.html'
],
function(Marionette, Fillable, template) {

  return Marionette.ItemView.extend({
    className: 'map',
    template: _.template(template),

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#content > div.wrapper'
      }
    }
  });

});
