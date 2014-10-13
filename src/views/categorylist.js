define([
  'marionette',
  'views/category',
  'behaviors/fillable'
],
function(Marionette, CategoryView, Fillable) {

  return Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'category-list',
    childView: CategoryView,

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#sidebar > div.wrapper'
      }
    }
  });

});
