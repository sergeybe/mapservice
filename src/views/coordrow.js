define(['marionette'], function(Marionette) {

  return Marionette.ItemView.extend({
    tagName: 'tr',
    className: 'coord-row-item',
    template: '#coord-row-template'
  });

});
