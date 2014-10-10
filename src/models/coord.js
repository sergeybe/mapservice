define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        name: 'Name of object',
        address: 'Address',
        lon: 0,
        lat: 0
      };
    }
  });

});
