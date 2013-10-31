define(['jquery', 'backbone', 'PlayerQueue', 'fancyinput', 'SearchResults', 'ListItemView', 'underscore', 
    'PlayListView', 'RequestTrack', 'NextRequestView'], 
function($, Backbone, PlayerQueue, Fancyinput, SearchResults, ListItemView, _, PlayListView, RequestTrack, NextRequestView) {

    var PlayerView = Backbone.View.extend({
        model: new PlayerQueue(),
        
        apiKey: 'AIzaSyBGXqH-Z0_iamay_BQRfs76Am98WWk78Gw',
        
        events: {
            'keyup .requester-search' : 'queryChanged'
        },
        
       defaults: {
            'wmode': 'transparent',
            'height': '300',
            'width': '200',
            'volume': '40',
            'playerVars': {
                'wmode': 'transparent',
                'origin': 'http://www.youtube.com',
                'enablejsapi': 1,
                'autoplay': 0,
                'controls': 1,
                'iv_load_policy': 3,
                'showinfo': 0,
                'rel': 0,
                'allowfullscreen': 1,
                'allowtransparency': 'yes'
            }
        },

        initialize: function(options) {
            this.$('div :input').fancyInput();
            this.subViews = {};
            this.searchResults = new SearchResults();
            this.nextRequest = new RequestTrack();
            this.nextRequestView = new NextRequestView({
                model: this.nextRequest,
                el: this.$('.player-playlist-holder')
            });
            this.playListView = new PlayListView({
                model: this.model,
                el: this.$('.player-playlist-holder')
            });
            
            this.listenTo(this.searchResults,'add', this.renderResults);
            this.listenTo(Backbone, 'playerReady', this.fetchAfterPlayer);
            this.listenTo(Backbone, 'trackEnded', this.playNext);
            //bind youtubeplay event to play method
            this.model.bind('youtubePlay', this.play, this);
            //bind youtubestop to stop method
            this.model.bind('youtubeStop', this.stop, this);
            this.model.bind('onPlayerReady', this.stop, this);
            //extend this.o so the options are globally accessable
            this.o = $.extend(true, this.defaults, options);
            this.render();
            aaa = this.nextRequest;
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
                        thisView.searchResults.reset();
                        _.each(response.items, function(item, index){
                            var member = new Backbone.Model(item);
                            member.set('id', item.id.videoId);
                            var listItemView = new ListItemView({
                                model: member,
                                isPlayer: true,
                                playerQueue: thisView.model
                            });
                            thisView.subViews[member.get('id')] = listItemView;
                            thisView.searchResults.add(member, {silent: true});
                        });
                        thisView.searchResults.trigger('add');
                    }
                });
            }
            
         },
  
         renderResults: function() {
            var thisView = this;
            _.each(this.subViews, function(view) {
               this.$('.player-results').append(view.render().$el); 
            });  
         },

        render: function() {
            //create a new youtube player
           var view = this;
           this.ytplayer = new window.YT.Player('player', {
                'events': {
                    'onReady': view.onPlayerReady,
                    'onError': view.onError,
                    'onStateChange': view.onPlayerStateChange
                }
            });
            return this;
        },
        //when youtube player is ready to run
        onPlayerReady: function(e){
            Backbone.trigger('playerReady');
        },
        
        fetchAfterPlayer: function() {
            var thisView = this;
            this.ytplayer.setSize(300, 200);
            this.model.fetch({
                success: function() {
                    thisView.playFirst();
                }
            });
        }, 
        playFirst: function() {
            var nextTrack = this.model.head();
            this.ytplayer.loadVideoById(nextTrack.id);
            this.model.remove(nextTrack);
        },
        
        onPlayerStateChange: function(event) {
             if (event.data === YT.PlayerState.ENDED) {
                 Backbone.trigger('trackEnded');
            }
        },
        playNext: function() {
            if(this.nextRequest.get('id') && this.nextRequest.get('id').length > 0) {
                this.ytplayer.loadVideoById(this.nextRequest.get('id'));
                $.ajax({
                    url: 'next-request',
                    contentType: 'application/json',
                    data: JSON.stringify({id: ""}),
                    type: 'POST',
                    success: function(result) {
                        
                    }
                });
                this.nextRequestView.clean();
            } else {
                this.playListView.render();
                var nextTrack = this.model.head();
                this.ytplayer.loadVideoById(nextTrack.id);
                this.model.remove(nextTrack);                
            }
            
        }
    });
    
    return PlayerView;
});