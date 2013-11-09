define(['jquery', 'backbone', 'Handlebars', 'hbars!templates/nextRequest', 'underscore', 'PlayerQueue'], function($, Backbone, Handlebars, 
template, _, PlayerQueue) {
     var nextRequestView = Backbone.View.extend({
         events: {
         },
         initialize: function() {
             this.listenTo(this.model,'change', this.render);
         },
         
         clean: function() {
            
            var thisView = this;
            this.$el.find('.nextrequest-holder').css('transform', 'translateX(-300px)');
            setTimeout(function(){
                thisView.$el.find('.nextrequest-holder').remove();
                //thisView.model.set("id", "", {silent:true});
                thisView.model.clear();
            }, 1200);
            
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