define([
  'marionette',
],
function(Marionette) {

  return Marionette.Behavior.extend({

    defaults: {
      debonceTime: 100,
      wrapper: '.wrapper'
    },

    initialize: function() {
      $(window).on('resize', _.debounce(
        this.onResize.bind(this),
        this.options.debonceTime)
      );
    },

    onResize: function() {
      this.triggerMethod('show', this);
    },

    onShow: function() {
      console.log('Fillable::onShow');
      var windowHeight = window.innerHeight;
      var wrapperHeight = $(this.options.wrapper).height();
      var height =  this.$el.height();
      this.$el.height(height + windowHeight - wrapperHeight);
    }
  });

});
