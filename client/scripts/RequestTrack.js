define(['jquery', 'backbone', 'jquery-cookie'], function($, Backbone, jqueryCookie) {
    var PlayerQueue = Backbone.Model.extend({
        initialize: function() {
            this.queuePoll(); 
        },
                
        queuePoll: function() {
            var thisModel = this;
            var url;
            if ($.cookie('tuneUp-name')) {
                url = $.cookie('tuneUp-name') + '/next-request';
            } else {
                url = window.location.pathname + 'next-request'
            }
            setTimeout(function(){
            $.ajax({
                    url: url,
                    contentType: 'application/json',
                    type: 'GET',
                    success: function(result) {
                        thisModel.set(JSON.parse(result));
                    }
             });
            thisModel.queuePoll();
            }, 5000);
        }
    });
    
    return PlayerQueue;
});

