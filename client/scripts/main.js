requirejs.config({
   baseUrl: '/scripts/',
    paths: {
        'jquery' : 'libs/jquery-1.10.2',
        'backbone' : 'libs/backbone',
        'underscore' : 'libs/underscore',
        'handlebars' : 'libs/handlebars'
    },
    shim: {
        'underscore' : {
            exports: '_'
        },
        'backbone' : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }       
    }
});

require(['test'], function () {
    
});
