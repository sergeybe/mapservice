define(['backbone', 'collections/coord'], function(Backbone, CoordCollection) {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        name: 'Category',
        items: new CoordCollection()
      };
    },

    initialize: function() {
      var items = this.get('items');
      if (items) {
        // It must be collection!
        this.items = new CoordCollection(items);
        this.unset('items');
      }
    }
  });

});
