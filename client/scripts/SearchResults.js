define(['jquery', 'backbone'], function($, Backbone) {
    var SearchResults = Backbone.Collection.extend({
        model: Backbone.Model,

        url: function() {
            
        },
                
        parse: function(response) {
            
        }
        
        
    });
    
    return SearchResults;
});
