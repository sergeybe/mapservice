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

    onRender: function() {
      var category = this.$el.find('select[name=category]');

      this.collection.each(function(item) {
        category.append(
          $('<option></option>').text(item.get('name'))
        );
      });
    },

    onSubmit: function(data) {
      var category = this.collection.findWhere({name: data.category});
      category.items.add(data);
      this.destroy();
    }
  });

});
