define([
  'marionette',
  'views/coord',
  'text!templates/category.html'
],
function(Marionette, CoordView, template) {

  return Marionette.CompositeView.extend({
    tagName: 'li',
    className: 'category-item collapsed',
    template: _.template(template),

    childView: CoordView,
    childViewContainer: 'ul',

    events: {
      'click': 'onCategoryItemClick'
    },

    initialize: function() {
      console.log('init CategoryView');
      this.collection = this.model.items;
    },

    onCategoryItemClick: function(e) {
      e.preventDefault();
      console.log('CategoryView::onCategoryItemClick');
      this.$el.toggleClass('collapsed').toggleClass('uncollapsed');

      this.trigger('category:clicked');

      return false;
    }
  });

});
