define([
  'marionette',
  'text!templates/coord.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    template: _.template(template),
    tagName: 'li',
    className: 'coord-item',

    events: {
      'click': 'onCoordItemClick'
    },

    initialize: function() {
      console.log('init CoordView');
    },

    onCoordItemClick: function(e) {
      console.log('CoordView::onCoordItemClick');
      return false;
    }
  });

});
