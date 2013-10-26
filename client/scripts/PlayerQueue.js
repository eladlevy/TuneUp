define(['jquery', 'backbone'], function($, Backbone) {
    var PlayerQueue = Backbone.Collection.extend({
        model: Backbone.Model,
        
        initialize: function() {
          this._meta = {'next-track': ""};
        },
        url: function() {
            return '/queued-videos';
        },
                
        parse: function(response) {
            return response.videos || response;
        }        
    });
    
    return PlayerQueue;
});
