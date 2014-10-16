define([
  'marionette',
  'leaflet',
  'behaviors/fillable',
  'collections/coord'
],
function(Marionette, L, Fillable, CoordCollection) {

  return Marionette.ItemView.extend({
    id: 'map',
    template: false,

    options: {
      layers: {
        'OpenStreetMap':
          L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {maxZoom: 18}
          ),
        'OpenCycleMap':
          L.tileLayer(
            'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
            {maxZoom: 18}
          ),
        'Hike and bike':
          L.tileLayer(
            'http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png',
            {maxZoom: 18}
          )
      },
      overlays: {
        'GPS points':
          L.tileLayer(
            'http://zverik.osm.rambler.ru/gps/tiles/{z}/{x}/{y}.png',
            {maxZoom: 18}
          ),
        'GPS routes':
          L.tileLayer(
            'http://{s}.gps-tile.openstreetmap.org/lines/{z}/{x}/{y}.png',
            {maxZoom: 18}
          ),
        'Рельеф':
          L.tileLayer(
            'http://toolserver.org/~cmarqu/hill/{z}/{x}/{y}.png',
            {maxZoom: 18}
          )
      }
    },

    collectionEvents: {
      'reset': 'onResetCollection'
    },

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#content > div.wrapper'
      }
    },

    initialize: function() {
      this.collection = new CoordCollection();
    },

    onResize: function() {
      this.map.invalidateSize(false);
    },

    onShow: function() {
      if (!this.map) {
        this.initMap();
      }
      this.map.invalidateSize(false);
    },

    onResetCollection: function() {
      if (this.markers) {
        this.map.removeLayer(this.markers);
      }

      this.markers = this.collection.getMarkers();
      this.map.addLayer(this.markers);
    },

    initMap: function() {
      L.Icon.Default.imagePath = '/static/images/';

      this.map = new L.Map('map');
      this.map.addLayer(this.options.layers.OpenStreetMap);
      this.map.setView([55.19, 61.44], 11);
      this.map.addControl(new L.Control.Scale());

      var controlLayers = new L.Control.Layers(
        this.options.layers,
        this.options.overlays
      );

      this.map.addControl(controlLayers);

    }

  });

});
