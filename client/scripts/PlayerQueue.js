define(['jquery', 'backbone'], function($, Backbone) {
    var PlayerQueue = Backbone.Collection.extend({
        model: Backbone.Model,
        
        initialize: function() {
          this.queuePoll(); 
          this._meta = {'next-track': ""};
        },
        url: function() {
            return '/queued-videos';
        },
                
        parse: function(response) {
            return response.videos || response;
        },
        
        queuePoll: function() {
        var thisModel = this;
            setTimeout(function(){
            $.ajax({
                    url: 'next-request',
                    contentType: 'application/json',
                    type: 'GET',
                    success: function(result) {
                        thisModel._meta['next-track'] = result.id;
                    }
             });
            thisModel.queuePoll();
            }, 5000);
        }        
    });
    
    return PlayerQueue;
});
