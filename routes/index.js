var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var musicdir = path.join(__dirname, '../public/media');
var datadir = path.join(__dirname, '../data/songlist.json');

var data = JSON.parse(fs.readFileSync(datadir, 'utf8'));
var names = data.songs;

/* GET home page. */
router.get('/', function(req, res, next) {
//  fs.readdir(music, function(err, names){
//    if(err){
//      console.log('error!' + err);
//    }else{
      res.render('index', { title: 'Music Lab', music: names, ti: '', 
                          ar: '', wl: '', wm: '', cover: '0'});
//    }
//  });
});


module.exports = router;
