define(['jquery', 'backbone', 'hbars!templates/selectNamePopUp', 'underscore', 'PlayerQueue', 'fancyinput'], function($, Backbone,
template, _, PlayerQueue, FancyInput) {
     var selectNameView = Backbone.View.extend({
         events: {
            'keyup .name-input' : 'nameEntered'
         },
         initialize: function() {
             
         },
         
         nameEntered: function(event) {
            if(event.keyCode === 13){
                var name = this.$('.name-input').val();
                this.model.name = name;
                this.model.updatePlayList();
                this.popupRemove();
            }
         },
                 
        popupRemove : function() {
            this.$el.off('hidden');
            this.$el.off('shown');
            this.$el.remove();
            this.off();
        
         },
         
         render: function() {
             var html = template(this.model.toJSON());
             this.$el.html(html);
             this.$('.name-input').fancyInput();
             return this;
         }
         
     });
     
     return selectNameView;
});