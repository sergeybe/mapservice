require.config({
  baseUrl: './src/',
  paths: {
    underscore: '../bower_components/lodash/dist/lodash',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    leaflet: '../bower_components/backbone/leaflet'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    jquery: {
      exports: '$'
    }
  },
  config: {
  }
});

requirejs(['views/MainView'], function(MainView) {
});
