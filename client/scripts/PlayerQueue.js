define(['jquery', 'backbone', 'jquery-cookie'], function($, Backbone, jqueryCookie) {
    var PlayerQueue = Backbone.Collection.extend({
        model: Backbone.Model,
        
        initialize: function() {
          this._meta = {'next-track': "",
                  'name': $.cookie('tuneUp-name')
                    };
        },
        url: function() {
            return '/play/queued-videos';
        },
                
        parse: function(response) {
            return response.tracks || response;
        },
        
        updatePlayList: function() {
            var data = {
                'name': this.name || this._meta.name,
                'tracks' : this.models        
            };
            var thisModel = this;
            Backbone.ajax({
                    url: 'updatePlayList',
                    contentType: 'application/json',
                    method: 'POST',
                    data: JSON.stringify(data),
                    success: function(response){
                                $.cookie('tuneUp-name', thisModel.name);
                                console.log(response);
                            }
                        });
            console.log(this.toJSON());
        }

    });
    
    return PlayerQueue;
});
