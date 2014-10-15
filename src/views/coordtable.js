define([
  'marionette',
  'views/coordrow',
  'views/dialog',
  'behaviors/fillable',
  'text!templates/coordtable.html'
],
function(Marionette, CoordRowView, Dialog, Fillable, template) {

  return Marionette.CompositeView.extend({

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#content > div.wrapper'
      }
    },

    triggers: {
      'click .new-category': 'show:dialog:newcategory',
      'click .new-coord': 'show:dialog:newcoord'
    },

    template: _.template(template),
    childView: CoordRowView,
    childViewContainer: 'tbody'
  });

});
