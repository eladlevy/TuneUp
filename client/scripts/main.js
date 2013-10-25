requirejs.config({
   baseUrl: '/scripts/',
    paths: {
        'jquery' : 'libs/jquery-1.10.2',
        'backbone' : 'libs/backbone',
        'underscore' : 'libs/underscore',
        'Handlebars' : 'libs/handlebars',
        'swfobject' : 'libs/swfobject',
        'hbars': 'libs/hbars',
        'text': 'libs/text.2.0.5',
        'fancyinput': 'libs/fancyInput'
    },
    shim: {
        'fancyinput': {
          exports: 'fancyinput'  
        },
        'swfobject' : {
            exports: 'swfobject'
        },
        'underscore' : {
            exports: '_'
        },
        'backbone' : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }       
    }
});

