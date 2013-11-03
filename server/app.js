var  express = require ('express');
var app = express();
var templates = require('./HandlebarsTemplates');
var mongoose = require( 'mongoose' );

app.configure(function(){
    app.use('/',express.static('../client/'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret:"baloze123"}));
});

mongoose.connect( 'mongodb://ec2-54-200-178-60.us-west-2.compute.amazonaws.com:27017/' );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var trackSchema = mongoose.Schema({
   "kind": String,
   "etag": String,
   "id": String,
   "snippet": {
    "publishedAt": String,
    "channelId": String,
    "title": String,
    "description": String,
    "thumbnails": {
     "default": {
      "url": String
     },
     "medium": {
      "url": String
     },
     "high": {
      "url": String
     }
    },
    "channelTitle": String,
    "liveBroadcastContent": String
   }
  });
  
var playListSchema = mongoose.Schema({
    name: {type: String, lowercase: true, index: {unique: true}},
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    'next-request': {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }
  });
  
var Track = mongoose.model('Track', trackSchema);
var PlayList = mongoose.model('PlayList', playListSchema);
  
app.use('/scripts/templates', express.static('templates'));
app.use('/:playListName', express.static('../client/'));
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
  
var nextRequest = {
                "id": "SQLF8zgfocw"
            };

app.get('/:playListName', function(req,res){
    PlayList.findOne({ 'name': req.params.playListName }, function (err, playlist) {
        if(playlist) {
            res.send(templates.requester());
        } else {
            res.json({'error': 400, 'message': 'Play list does not exsits'});
        }
    });
      
});

app.get('/play/queued-videos', function(req,res){
    var playListName = req.cookies['tuneUp-name'];
    console.log("Recieved cookie with name: " + playListName);
    PlayList.findOne({ 'name': playListName})
    .populate('tracks')
    .exec(function (err, playlist) {
        if(playlist) {
            res.json(playlist);
        } else {
            res.json({'error': 400, 'message': playListName});
        }
    });
    
      //res.json(videos);
});

app.get('/:playListName/next-request', function(req,res){
    PlayList.findOne({ 'name': req.params.playListName })
    .populate('next-request')
    .exec(function (err, playlist) {
        if(playlist) {
            res.json(JSON.stringify(playlist['next-request']));
            
        } else {
            res.json({'error': 400, 'message': 'Play list does not exsits'});
        }
    });
      
});

app.post('/:playListName/next-request', function(req,res){
    PlayList.findOne({ 'name': req.params.playListName }, function (err, playlist) {
        if(playlist) {
            var track = new Track(req.body);
            track.save(function(err){
                if (err){
                    console.log(err);
                }
             playlist['next-request'] = track;
             playlist.save(function (err) {
                if (err){
                    console.log(err);
                    res.json(err);
                } else {
                    res.json({'code': 201, 'message': 'Saved successfully'});
                }
              });
            });

        } else {
            res.json({'error': 400, 'message': 'Play list does not exsits'});
        }
    });
      //res.json(nextRequest);
});

app.post('/updatePlayList', function(req,res){
 console.log("Recieved cookie with name: " + req.cookies['tuneUp-name']);
          if(req.cookies['tuneUp-name'] && req.cookies['tuneUp-name'].length > 0) {
              PlayList.findOne({'name' : req.cookies['tuneUp-name'] }, function (err, playlist) {
                 for(var i = 0; i < req.body.tracks.length; i++){
                     console.log(req.body.tracks[i]);
                     if (!req.body.tracks[i]._id) {
                        var track = new Track(req.body.tracks[i]);
                        track.save(function(err){
                        if (err){
                            console.log(err);
                        }
                        console.log("Pushing Track!!!!!");
                        
                        });
                        
                        playlist.tracks.push(track);
                     }
                 }
                
                 console.log("Saving paly list#######");
                 playlist.save(function (err) {
                    if (err){
                        console.log(err);
                        res.json(err);
                    } else {
                        res.json({'code': 201, 'message': 'Saved successfully'});
                    }
                });
              });
          }else {
            var name = req.body.name.toLowerCase();
            PlayList.findOne({ 'name': name }, function (err, track) {
              if (track) {
                  res.json({'error': 400, 'message': 'Duplicate playlist name'});
              }else {
                  console.log("Creating new playlist!");
                  var playlist = new PlayList({'name': name});
                  if(req.body.tracks) {
                  for(var i = 0; i < req.body.tracks.length; i++) {
                      var track = new Track(req.body.tracks[i]);
                      track.save(function(err){
                          if (err){
                              console.log(err);
                          }
                      });
                      playlist.tracks.push(track);
                  }
                  playlist.save(function (err) {
                      if (err){
                          console.log(err);
                          res.json(err);
                      } else {
                          res.json({'code': 201, 'message': 'Saved successfully'});
                  }
              });
                  }
              }  
            });
          }
});

app.listen(8080);