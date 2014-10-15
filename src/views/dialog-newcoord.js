define([
  'models/coord',
  'views/dialog',
  'text!templates/dialog-newcoord.html'
],
function(CoordModel, Dialog, template) {

  return Dialog.extend({
    template: _.template(template),

    initialize: function() {
      this.model = new CoordModel();
    },

    onSubmit: function() {
      this.destroy();
    }
  });

});
