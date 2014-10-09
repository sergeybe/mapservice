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

    getCoordLikes: function(str) {
      var tmp = [];
      if (str) {
        var pattern = new RegExp(str, 'i');

        this.each(function(category) {
          category.items.each(function(coord) {
            var name = coord.get('name');
            if (pattern.test(name)) {
              tmp.push(coord);
            }
          });
        });
      }
      return tmp;
    }
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

      this.trigger('category:clicked');

      return false;
    }

  });

  var CategoryListView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'category-list',
    childView: CategoryView,

    initialize: function() {
      console.log('init CategoryListView');
    }
  });

  var SearchView = Marionette.CompositeView.extend({
    template: '#search-template',
    childViewContainer: 'ul#result',
    childView: CoordView,
    text: '',

    ui: {
      'input': 'input[type="text"]'
    },

    events: {
      'keyup @ui.input': 'onDebounceChanged'
    },

    initialize: function(options) {
      this.categoryCollection = options.categoryCollection;

      // I guess it must be in behaviors. Let's do it later.
      this.onDebounceChanged = _.debounce(function() {
        this.onChanged();
      }, 500).bind(this);
    },

    onChanged: function() {
      this.text = this.ui.input.val();
      console.log(this.text);

      this.collection.reset(this.categoryCollection.getCoordLikes(this.text));
      console.log(this.collection);
    }
  });

  var CoordRowView = Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'coord-row-item',
    template: '#coord-row-template'
  });

  var CoordTableView = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'coord-table',
    template: '#coord-table-template',
    childView: CoordRowView,
    childViewContainer: 'tbody',

    initialize: function(options) {
    }
  });

  var App = Marionette.Application.extend({
    initialize: function(options) {
    }
  });

  app = new App({container: '#app'});

  app.addRegions({
    sidebar: '#sidebar-tabs',
    category: '#category',
    search: '#search',
    map: '#map',
    list: '#list'
  });

  app.addInitializer(function(options) {

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
