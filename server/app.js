var  express = require ('express');
var app = express();
var templates = require('./HandlebarsTemplates');
app.configure(function(){
    app.use('/',express.static('../client/'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret:"baloze123"}));
});
app.use('/scripts/templates', express.static('templates'));
//app.use('/scripts', express.static('../client/scripts'));

var videos ={ 
    "videos":
        [
            {
            "id": "elK0jHNAcR4"
            },
            {
            "id": "AJDUHq2mJx0"
            },
            {
            "id": "R91HqTB1RIA"
            },
            {
            "id": "thclj_CDwxs"
            },
            {
            "id": "JVDFxP4XoMQ"
            },
            {
            "id": "BtMiFCHmtQ8"
            },
            {
            "id": "H9XW2v3tYfw"
            }
        ]
    };

var nextRequest = {
                "id": "SQLF8zgfocw"
            };

app.get('/requester', function(req,res){
      res.send(templates.requester());
});
app.get('/queued-videos', function(req,res){
      res.json(videos);
});

app.get('/next-request', function(req,res){
      res.json(nextRequest);
});

app.post('/next-request', function(req,res){
      nextRequest = req.body;
      res.json(nextRequest);
});

app.listen(8080);