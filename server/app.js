var  express = require ('express');
var app = express();
var templates = require('./HandlebarsTemplates');
//var mongoose = require( 'mongoose' );

app.configure(function(){
    app.use('/',express.static('../client/'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret:"baloze123"}));
});

//var teamSchema = new mongoose.Schema({
// country: String,
// GroupName: String
//});
//mongoose.model( 'Team', teamSchema );

//mongoose.connect( 'mongodb://localhost/TaskManager' );

app.use('/scripts/templates', express.static('templates'));
var videos ={ 
    "videos":
            [
  {
   "kind": "youtube#searchResult",
   "etag": "\"WD4VMEpMvsFyTbuuNulahhED0yg/Q7uKYYAkXH1MtlVjVwcRGmUJ4Bk\"",
   "id": "qkXYqUB-9NM",
   "snippet": {
    "publishedAt": "2013-04-10T23:49:59.000Z",
    "channelId": "UC9M26EHOlFj-P4v5lk9xqDg",
    "title": "Ray Charles and Betty Carter   Every Time We Say Goodbye",
    "description": "\"Ev'ry Time We Say Goodbye\" is a song with lyrics and music by Cole Porter and published by Chappell & Company. It was introduced in 1944 in Billy Rose's ...",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/qkXYqUB-9NM/default.jpg"
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/qkXYqUB-9NM/mqdefault.jpg"
     },
     "high": {
      "url": "https://i.ytimg.com/vi/qkXYqUB-9NM/hqdefault.jpg"
     }
    },
    "channelTitle": "Hkiramijyan",
    "liveBroadcastContent": "none"
   }
  },
  {
   "kind": "youtube#searchResult",
   "etag": "\"WD4VMEpMvsFyTbuuNulahhED0yg/SgOpCkuc8_n1x80WnyzoCm8lnE4\"",
   "id": "8nWZbxP-hj0",
   "snippet": {
    "publishedAt": "2012-11-18T17:03:36.000Z",
    "channelId": "UCZSgB4lREMWcXguTp9D55JA",
    "title": "What'd I Say Ray Charles Subtitulada en castellano",
    "description": "Subtitulación de un video ya existente: http://www.youtube.com/watch?v=1rggldf1c6c Unicamente con finalidad cultural, sin interferencia en copyright. Canción.",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/8nWZbxP-hj0/default.jpg"
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/8nWZbxP-hj0/mqdefault.jpg"
     },
     "high": {
      "url": "https://i.ytimg.com/vi/8nWZbxP-hj0/hqdefault.jpg"
     }
    },
    "channelTitle": "MrKKQLOPIS",
    "liveBroadcastContent": "none"
   }
  }
    ]
  };
//        [
//            {
//            "id": "elK0jHNAcR4"
//            },
//            {
//            "id": "AJDUHq2mJx0"
//            },
//            {
//            "id": "R91HqTB1RIA"
//            },
//            {
//            "id": "thclj_CDwxs"
//            },
//            {
//            "id": "JVDFxP4XoMQ"
//            },
//            {
//            "id": "BtMiFCHmtQ8"
//            },
//            {
//            "id": "H9XW2v3tYfw"
//            }
//        ]
  

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