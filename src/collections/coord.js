define(['backbone', 'models/coord'], function(Backbone, CoordModel) {

  return Backbone.Collection.extend({
    model: CoordModel
  });

});
