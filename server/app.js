var  express = require ('express');
var app = express();
var app = express();
app.configure(function(){
    app.use('/',express.static('../client'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret:"baloze123"}));
});

app.listen(8080);