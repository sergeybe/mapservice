define(['marionette', 'views/coord'], function(Marionette, CoordView) {

  return Marionette.CompositeView.extend({
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

});
