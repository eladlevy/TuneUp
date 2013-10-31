define(['jquery', 'backbone', 'Handlebars', 'hbars!templates/nextRequest', 'underscore', 'PlayerQueue'], function($, Backbone, Handlebars, 
template, _, PlayerQueue) {
     var nextRequestView = Backbone.View.extend({
         events: {
         },
         initialize: function() {
             this.listenTo(this.model,'change', this.render);
         },
         
         render: function() {
             var html = template(this.model.toJSON());
             this.$el.find('.nextrequest-holder').remove();
             this.$el.prepend(html);
             return this;
         }
         
     });
     
     return nextRequestView;
});