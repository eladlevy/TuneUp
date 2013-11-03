define(['jquery', 'backbone', 'Handlebars', 'hbars!templates/searchResults', 'underscore', 'PlayerQueue'], function($, Backbone, Handlebars, 
template, _, PlayerQueue) {
     var listItemView = Backbone.View.extend({
         events: {
            'click .requester-item-wrapper': 'itemClicked'
         },
         initialize: function() {
             
         },
         
         itemClicked: function(event) {
            if(!this.options.isPlayer) {
                Backbone.ajax({
                    url: window.location.pathname + '/next-request',
                    contentType: 'application/json',
                    method: 'POST',
                    data: JSON.stringify(this.model.toJSON()),
                    success: function(response){
                       
                    }
                });
            } else {
                this.options.playerQueue.push(this.model);
                this.options.playerQueue.updatePlayList();
            }
             
         },
         
         render: function() {
             var html = template(this.model.toJSON());
             this.$el.html(html);
             return this;
         }
         
     });
     
     return listItemView;
});