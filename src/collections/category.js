define(['backbone', 'models/category'], function(Backbone, CategoryModel) {

  return Backbone.Collection.extend({
    model: CategoryModel,
    url: '/tests/data.json',

    getCoordLikes: function(str) {
      var tmp = [];
      if (str) {
        var pattern = new RegExp(str, 'i');

        this.each(function(category) {
          category.items.each(function(coord) {
            var name = coord.get('name');
            if (pattern.test(name)) {
              tmp.push(coord);
            }
          });
        });
      }
      return tmp;
    }
  });

});
