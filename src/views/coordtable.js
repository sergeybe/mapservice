define([
  'marionette',
  'views/coordrow',
  'behaviors/fillable',
  'text!templates/coordtable.html'
],
function(Marionette, CoordRowView, Fillable, template) {

  return Marionette.CompositeView.extend({

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#content > div.wrapper'
      }
    },

    template: _.template(template),
    childView: CoordRowView,
    childViewContainer: 'tbody',
  });

});
