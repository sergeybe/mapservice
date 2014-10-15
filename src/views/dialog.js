define([
  'marionette',
  'text!templates/dialog.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    template: _.template(template),

    ui: {
      'closeButton': '.close-button',
      'cancelButton': '.cancel-button',
      'submitButton': '.submit-button'
    },

    events: {
      'click @ui.submitButton': 'submit'
    },

    triggers: {
       // Don't use "remove" here. This is Marrionette!
      'click @ui.closeButton': 'destroy',
      'click @ui.cancelButton': 'destroy'
    },

    submit: function() {
      console.log('Dialog');
      var data = this.serializeFormData();
      this.triggerMethod('submit', data);
    },

    serializeFormData: function() {
      var items = this.$('input[name]').serializeArray();
      var data = {};
      _.each(items, function(item) {
        data[item.name] = item.value;
      });
      return data;
    },

    onShow: function() {
      this.$el.find('*:input[type!=hidden]:first').focus();
    }

  });

});
