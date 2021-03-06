define(['jquery', 'backbone', 'Handlebars', 'hbars!templates/searchResults', 'fancyinput', 'SearchResults', 'underscore', 
    'ListItemView', 'NextRequestView', 'RequestTrack'], function($, Backbone, Handlebars, 
template, FancyInput, SearchResults, _, ListItemView, NextRequestView, RequestTrack) {
     var PlayerView = Backbone.View.extend({
         el: this.$('.requester-wrapper'),
         
         model: new SearchResults(),
         
         apiKey: 'AIzaSyBGXqH-Z0_iamay_BQRfs76Am98WWk78Gw',
         
         events: {
            'keyup .requester-search' : 'queryChanged',
            'click .requester-item-wrapper': 'itemClicked'
         },
         
         initialize: function() {
             this.$('div :input').fancyInput();
             this.listenTo(this.model,'add', this.render);
             this.nextRequest = new RequestTrack();
             this.nextRequestView = new NextRequestView({
                 el: this.$('.requester-next'),
                 model: this.nextRequest
             });
             this.subViews = {};
         },
         
         queryChanged: function(event) {
            var baseUrl = 'https://www.googleapis.com/youtube/v3';
            var thisView = this;
            if(event.keyCode === 13){
                var apiRequest = '/search?part=snippet&maxResults=20&q='+ this.$('.requester-search').val() + '&key=' + this.apiKey;
                 Backbone.ajax({
                    url: baseUrl + apiRequest,
                    method: 'GET',
                    success: function(response){
                        _.each(thisView.subViews, function(item) {
                            item.remove();
                            delete item; 
                        });
                        
                        thisView.subViews = {};
                        thisView.model.reset();
                        _.each(response.items, function(item, index){
                            var member = new Backbone.Model(item);
                            member.set('id', item.id.videoId);
                            var listItemView = new ListItemView({
                                model: member
                            });
                            thisView.subViews[member.get('id')] = listItemView;
                            thisView.model.add(member, {silent: true});
                        });
                        thisView.model.trigger('add');
                    }
                });
            }
            
         },
         
         itemClicked: function(event) {
             
         },
         
         render: function() {
            var thisView = this;
            _.each(this.subViews, function(view) {
               thisView.$el.append(view.render().$el); 
            });
         }
         
     });
     
     return PlayerView;
});