require.config({
  baseUrl: './src/',
  paths: {
    underscore: '../bower_components/lodash/dist/lodash',
//    underscore: '../bower_components/underscore/underscore',
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
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

requirejs([
  'backbone',
  'marionette',
  'jquery',
  'underscore'
],
function(Backbone, Marionette, $, _) {

  /* Models */

  var CoordModel = Backbone.Model.extend({
    defaults: function() {
      return {
        name: 'Name of object',
        address: 'Address',
        lon: 0,
        lat: 0
      };
    }
  });

  var CoordCollection = Backbone.Collection.extend({
    model: CoordModel
  });

  var CategoryModel = Backbone.Model.extend({
    defaults: function() {
      return {
        name: 'Category',
        items: new CoordCollection()
      };
    },
    initialize: function() {
      console.log('init CategoryModel');
      var items = this.get('items');
      if (items) {
        // It must be collection!
        this.items = new CoordCollection(items);
        this.unset('items');
      }
    }
  });

  var CategoryCollection = Backbone.Collection.extend({
    model: CategoryModel,
    url: '/tests/data.json',
    initialize: function() {
      console.log('init CategoryCollection');
    },
  });

  /* Views */

  var CoordView = Marionette.ItemView.extend({
    template: '#coord-item-template',
    tagName: 'li',
    className: 'coord-item',

    events: {
      'click': 'onCoordItemClick'
    },

    initialize: function() {
      console.log('init CoordView');
    },

    onCoordItemClick: function(e) {
      console.log('CoordView::onCoordItemClick');
      return false;
    }
  });

  var CategoryView = Marionette.CompositeView.extend({
    tagName: 'li',
    className: 'category-item collapsed',
    template: '#category-item-template',

    childView: CoordView,
    childViewContainer: 'ul',

    events: {
      'click': 'onCategoryItemClick'
    },

    initialize: function() {
      console.log('init CategoryView');
      this.collection = this.model.items;
    },

    onCategoryItemClick: function(e) {
      e.preventDefault();
      console.log('CategoryView::onCategoryItemClick');
      this.$el.toggleClass('collapsed').toggleClass('uncollapsed');
      return false;
    }

  });

  var CategoryListView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'category-list',
    childView: CategoryView,

    initialize: function() {
      console.log('init CategoryListView');
      this.collection = new CategoryCollection();
      this.collection.fetch();
    }
  });

  var App = Marionette.Application.extend({
    initialize: function(options) {
      console.log(options.container);
    }
  });

  app = new App({container: '#app'});

  app.addRegions({
    category: '#category',
    search: '#search',
    map: '#map',
    list: '#list'
  });

  app.addInitializer(function(options) {
    app.category.show(new CategoryListView());

    Backbone.history.start();
  });

  app.start();
});
