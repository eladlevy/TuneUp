define(['jquery', 'backbone'], function($, Backbone) {
    var PlayerQueue = Backbone.Model.extend({
        initialize: function() {
            this.queuePoll(); 
        },
                
        queuePoll: function() {
            var thisModel = this;
            setTimeout(function(){
            $.ajax({
                    url: 'next-request',
                    contentType: 'application/json',
                    type: 'GET',
                    success: function(result) {
                        thisModel.set(result);
                    }
             });
            thisModel.queuePoll();
            }, 5000);
        }
    });
    
    return PlayerQueue;
});

