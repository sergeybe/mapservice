define([
  'marionette',
  'leaflet',
  'behaviors/fillable',
  'text!templates/map.html'
],
function(Marionette, L, Fillable, template) {

  return Marionette.ItemView.extend({
//    template: _.template(template),
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
        'GPS points ':
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

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#content > div.wrapper'
      }
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

    initMap: function() {
      L.Icon.Default.imagePath = '/static/images/';

      this.map = L.map('map').setView([55.19, 61.44], 11);
      this.map.addLayer(this.options.layers.OpenStreetMap);
      this.map.addControl(new L.Control.Scale());
      this.map.setView([55.19, 61.44], 11);

      var control = L.control.layers(
        this.options.layers,
        this.options.overlays
      );

      this.map.addControl(control);
    }
  });

});
