define(['marionette'], function(Marionette) {

  return Marionette.ItemView.extend({
    template: '#coord-item-template',
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
