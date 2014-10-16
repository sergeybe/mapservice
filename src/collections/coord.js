define([
  'backbone',
  'leaflet',
  'models/coord'
],
function(Backbone, L, CoordModel) {

  return Backbone.Collection.extend({
    model: CoordModel,

    getMarkers: function() {
      var markers = new L.FeatureGroup();
      this.each(function(item) {
        var marker = new L.Marker(item.getLatLon());
        markers.addLayer(marker);
      });
      return markers;
    }
  });

});
