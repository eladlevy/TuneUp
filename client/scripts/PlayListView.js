define(['jquery', 'backbone', 'PlayerQueue', 'underscore', 'hbars!templates/playList'], 
function($, Backbone, PlayerQueue, _, template) {
   var playListView = Backbone.View.extend({
       initialize: function(options) {
           this.listenTo(this.model,'add', this.render);
           this.listenTo(this.model,'remove', this.renderRemove);
       },
               
       renderRemove: function(model) {
            if(model === undefined) {
                return;
            }
            $(this.$el.find('.playlist-holder')[0]).css('transform', 'translateY(-50px)');
            var thisView = this;
            setTimeout(function(){
                thisView.$el.find('.playlist-holder')[0].remove();
            },500);
            
       },
               
       render: function(model) {
            //var tracks = {tracks: this.model.toJSON()};
            if(model === undefined) {
                return;
            }
            var html = template(model.toJSON());
            this.$el.append(html);
            
            setTimeout(function(){
                this.$('.playlist-holder').css('transform', 'translateY(0px)')
            }, 500);
            
            return this;
       }        
   });
    
    return playListView;
});


