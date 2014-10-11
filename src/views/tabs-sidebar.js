define([
  'marionette',
  'text!templates/tabs-sidebar.html'
],
function(Marionette, template) {

  return Marionette.ItemView.extend({
    tagName: 'ul',
    className: 'nav-tabs',
    template: _.template(template),
    triggers: {
      'click li:not(.active) > a': 'sidebar-tabs:clicked',
    }
  });

});
