define(['jquery', 'backbone', 'PlayerQueue', 'underscore', 'hbars!templates/playList', 'jquery-nicescroll'], 
function($, Backbone, PlayerQueue, _, template, NiceScroll) {
   var playListView = Backbone.View.extend({
       events: {
            'click .playlist-holder': 'itemClicked'
       },
         
       initialize: function(options) {
           $(this.el).niceScroll();
           this.listenTo(this.model,'add', this.render);
           this.listenTo(this.model,'remove', this.renderRemove);
       },
       
       itemClicked: function(e) {
            var index = _.indexOf(this.$('.playlist-holder'), e.target);
            this.model._meta.index = index;
            Backbone.trigger('trackEnded');
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
       
       renderIndicator: function() {
            var index = this.model._meta.index;
            _.forEach(this.$('.playlist-holder'), function(item){
                    $(item).toggleClass('playlist-holder-selected', false);
                }
            );
            $(this.$('.playlist-holder')[index]).toggleClass('playlist-holder-selected', true);
       },
               
       render: function(model) {
            if(model === undefined) {
                return;
            }
            var html = template(model.toJSON());
            this.$el.append(html);
            
            setTimeout(function(){
                this.$('.playlist-holder').css('transform', 'translateY(0px)');
            }, 500);
            
            return this;
       }        
   });
    
    return playListView;
});


