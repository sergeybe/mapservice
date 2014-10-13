define([
  'marionette',
  'views/coord',
  'behaviors/fillable',
  'text!templates/search.html'
],
function(Marionette, CoordView, Fillable, template) {

  return Marionette.CompositeView.extend({
    template: _.template(template),
    childViewContainer: 'ul#result',
    childView: CoordView,
    text: '',

    behaviors: {
      Fillable: {
        behaviorClass: Fillable,
        wrapper: '#sidebar > div.wrapper'
      }
    },

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

      this.collection.reset(this.categoryCollection.getCoordLikes(this.text));
    }
  });

});
