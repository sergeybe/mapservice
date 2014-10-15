define([
  'models/category',
  'views/dialog',
  'text!templates/dialog-newcategory.html'
],
function(CategoryModel, Dialog, template) {

  return Dialog.extend({
    template: _.template(template),

    initialize: function() {
      this.model = new CategoryModel({name: ''});
    },

    onSubmit: function(data) {
      if (!this.collection.findWhere({name: data.name})) {
        var model = new CategoryModel(data);
        this.collection.add(model);
        this.destroy();
      }
    }
  });

});
