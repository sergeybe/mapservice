define([
  'backbone',
  'models/category'
],
function(Backbone) {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        name: 'Name of object',
        address: 'Address',
        lon: 0,
        lat: 0,
        category: ''
      };
    },

    getLatLon: function() {
      return [this.get('lat'), this.get('lon')];
    },

    getLonLat: function() {
      return [this.get('lon'), this.get('lat')];
    }
  });

});
