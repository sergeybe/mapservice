require.config({
  baseUrl: './src/',
  paths: {
    underscore: '../bower_components/lodash/dist/lodash',
//    underscore: '../bower_components/underscore/underscore',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    leaflet: '../bower_components/leaflet/dist/leaflet-src',
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
  'views/map',
  'views/coordtable',
  'views/tabs-sidebar',
  'views/tabs-content',
  'views/dialog',
  'views/dialog-newcategory',
  'views/dialog-newcoord'
],
function(
  Backbone,
  Application,
  CategoryCollection,
  CoordCollection,
  CategoryListView,
  SearchView,
  MapView,
  CoordTableView,
  SidebarTabsView,
  ContentTabsView,
  Dialog,
  NewCategoryDialog,
  NewCoordDialog
) {

  app = new Application({container: '#app'});

  app.addRegions({
    sidebarTabs: '#sidebar-tabs',
    contentTabs: '#content-tabs',
    categoryPane: '#category-pane',
    searchPane: '#search-pane',
    mapPane: '#map-pane',
    tablePane: '#table-pane',
    modal: '#modal'
  });

  app.addInitializer(function() {

    /* Views of tabs */
    var sidebarTabsView = new SidebarTabsView();
    var contentTabsView = new ContentTabsView();

    /* Show pane for tabs */
    app.sidebarTabs.show(sidebarTabsView);
    app.contentTabs.show(contentTabsView);

    /* Collections */
    var categoryCollection = new CategoryCollection();
    categoryCollection.fetch();

    var coordCollection = new CoordCollection();

    /* Views */
    var categoryListView = new CategoryListView({
      collection: categoryCollection
    });

    var searchView = new SearchView({
      collection: coordCollection,
      categoryCollection: categoryCollection
    });

    var mapView = new MapView();

    var coordTableView = new CoordTableView({
      collection: coordCollection
    });

    app.categoryPane.show(categoryListView);
    app.searchPane.show(searchView);
    app.mapPane.show(mapView);
    app.tablePane.show(coordTableView);

    app.mapPane.currentView.map.invalidateSize(false);

    /* Events */

    categoryListView.on('childview:category:clicked', function(args) {
      coordTableView.collection.reset(args.model.items.models);
    });

    /* Events for tabs */

    sidebarTabsView.on('sidebar-tabs:clicked', function(args) {
      console.log('Category click');
      // Hack: Because we have only two tabs
      args.view.$el.find('li').toggleClass('active');
      $('#category-pane, #search-pane').toggle();
      // For resize panel height
      categoryListView.triggerMethod('show');
      searchView.triggerMethod('show');
    });

    contentTabsView.on('content-tabs:clicked', function(args) {
      console.log('Category click');
      // Hack: Because we have only two tabs
      args.view.$el.find('li').toggleClass('active');
      $('#map-pane, #table-pane').toggle();
      // For resize panel height
      mapView.triggerMethod('show');
      coordTableView.triggerMethod('show');
    });

    /* Events for table */

    coordTableView.on('show:dialog:newcategory', function(args) {
      var dialog = new NewCategoryDialog({collection: categoryCollection});
      app.modal.show(dialog);
    });

    coordTableView.on('show:dialog:newcoord', function(args) {
      var dialog = new NewCoordDialog();
      app.modal.show(dialog);
    });

    Backbone.history.start();
  });

  app.start();
});
