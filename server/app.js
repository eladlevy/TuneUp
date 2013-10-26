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
   "kind": "youtube#searchResult",
   "etag": "\"iqhxZrClbEyBShCvV0oqU2l98lA/IMapK_SBMS7sbQROtKe9s032ZFw\"",
   "id": "xEhaVhta7sI",
   "snippet": {
    "publishedAt": "2013-03-05T21:16:46.000Z",
    "channelId": "UCcz_5aVIagGz46J0_dvdzaw",
    "title": "Cats Compilation",
    "description": "More funny Videos on http://webfail.com Courtesy of CutiesNFuzzies http://bit.ly/CutiesNFuzziesClips Do yourself a favor and just watch it, okay? You won't b...",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/xEhaVhta7sI/default.jpg"
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/xEhaVhta7sI/mqdefault.jpg"
     },
     "high": {
      "url": "https://i.ytimg.com/vi/xEhaVhta7sI/hqdefault.jpg"
     }
    },
    "channelTitle": "CompilarizTVi",
    "liveBroadcastContent": "none"
   }
  },
  {
   "kind": "youtube#searchResult",
   "etag": "\"iqhxZrClbEyBShCvV0oqU2l98lA/klkt1aMelhCsIMEC3093C-vcBOk\"",
   "id": "Kdgt1ZHkvnM",
   "snippet": {
    "publishedAt": "2013-02-06T13:37:46.000Z",
    "channelId": "UCb91Zl2MxLmUwriNocKeYnQ",
    "title": "Epic Funny Cats 20 Minutes",
    "description": "More funny cats -- http://bit.ly/Catsbook_co Epic Funny Cats 20 Minutes http://www.catsbook.co http://www.facebook.com/Catsbook.co ...",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/default.jpg"
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/mqdefault.jpg"
     },
     "high": {
      "url": "https://i.ytimg.com/vi/Kdgt1ZHkvnM/hqdefault.jpg"
     }
    },
    "channelTitle": "CrazyCats2020",
    "liveBroadcastContent": "none"
   }
  }  ]
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