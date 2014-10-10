require.config({
  baseUrl: './src/',
  paths: {
    underscore: '../bower_components/lodash/dist/lodash',
//    underscore: '../bower_components/underscore/underscore',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    leaflet: '../bower_components/leaflet/dist/leaflet-src.js',
    text: '../bower_components/requirejs-text/text'
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

requirejs([
  'backbone',
  'application',
  'collections/category',
  'collections/coord',
  'views/categorylist',
  'views/search',
  'views/coordtable'
],
function(
  Backbone,
  Application,
  CategoryCollection,
  CoordCollection,
  CategoryListView,
  SearchView,
  CoordTableView
) {

  var app = new Application({container: '#app'});

  app.addRegions({
    sidebar: '#sidebar-tabs',
    category: '#category',
    search: '#search',
    map: '#map',
    list: '#list'
  });

  app.addInitializer(function() {

    var categoryCollection = new CategoryCollection();
    categoryCollection.fetch();

    var coordCollection = new CoordCollection();

    var categoryListView = new CategoryListView({
      collection: categoryCollection
    });

    var searchView = new SearchView({
      collection: coordCollection,
      categoryCollection: categoryCollection
    });

    var coordTableView = new CoordTableView({
      collection: coordCollection
    });

    app.category.show(categoryListView);
    app.search.show(searchView);
    app.list.show(coordTableView);

    categoryListView.on('childview:category:clicked', function(view) {
      coordTableView.collection.reset(view.model.items.models);
    });

    Backbone.history.start();
  });

  app.start();
});
