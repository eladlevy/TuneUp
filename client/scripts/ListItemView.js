define(['jquery', 'backbone', 'Handlebars', 'hbars!templates/searchResults', 'underscore', 'PlayerQueue'], function($, Backbone, Handlebars, 
template, _, PlayerQueue) {
     var PlayerView = Backbone.View.extend({
         events: {
            'click .requester-item-wrapper': 'itemClicked'
         },
         initialize: function() {
             
         },
         
         itemClicked: function(event) {
            if(!this.options.isPlayer) {
                Backbone.ajax({
                    url: '/next-request',
                    method: 'POST',
                    data: this.model.toJSON(),
                    success: function(response){
                        alert("success!");
                    }
                });
            } else {
                this.options.playerQueue.push(this.model);
            }
             
         },
         
         render: function() {
             var html = template(this.model.toJSON());
             this.$el.html(html);
             return this;
         }
         
     });
     
     return PlayerView;
});