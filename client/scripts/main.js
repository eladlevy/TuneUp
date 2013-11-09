requirejs.config({
   baseUrl: '/scripts/',
    paths: {
        'jquery' : 'libs/jquery-1.10.2',
        'jquery-nicescroll': 'libs/jquery.nicescroll.min',
        'backbone' : 'libs/backbone',
        'underscore' : 'libs/underscore',
        'Handlebars' : 'libs/handlebars',
        'swfobject' : 'libs/swfobject',
        'hbars': 'libs/hbars',
        'text': 'libs/text.2.0.5',
        'fancyinput': 'libs/fancyInput',
        'jquery-cookie': 'libs/jquery.cookie',
    },
    shim: {
        'jquery-cookie': ['jquery'],
        'jquery-nicescroll': ['jquery']
    }
});

