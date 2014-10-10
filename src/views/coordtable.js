define([
  'marionette',
  'views/coordrow',
  'text!templates/coordtable.html'
],
function(Marionette, CoordRowView, template) {

  return Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'coord-table',
    template: _.template(template),
    childView: CoordRowView,
    childViewContainer: 'tbody',

    initialize: function(options) {
    }
  });

});
