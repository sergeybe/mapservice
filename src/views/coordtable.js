define(['marionette', 'views/coordrow'], function(Marionette, CoordRowView) {

  return Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'coord-table',
    template: '#coord-table-template',
    childView: CoordRowView,
    childViewContainer: 'tbody',

    initialize: function(options) {
    }
  });

});
