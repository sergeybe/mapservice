define([
  'marionette',
  'views/category'
],
function(Marionette, CategoryView) {

  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'category-list',
    childView: CategoryView,

    initialize: function() {
      console.log('init CategoryListView');
    }
  });

});
