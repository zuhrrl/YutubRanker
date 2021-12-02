var express = require('express');
var router = express.Router();
const axios = require('axios');
var youtubeVideoId;
var respAxios;
var ytrank;
const {
  request
} = require('../app');
const {
  urlencoded
} = require('express');
const {
  Session
} = require('express-session');
var host = "https://www.googleapis.com/youtube/v3/search"
var apiKey = ["AIzaSyDr8sDjDEQ2lq24PQhGdn5kNiaza5lZLkI", "AIzaSyDHGzR8EuFL7981tqAsZCiWiqWlH6GkhyI"]
var sessionsData = []
var sessionSaved;

// function get region

function getRegion(region) {
  var reg
  switch (region) {
    case "US":
      reg = "United States"
      break
    case "FR":
      reg = "France"
      break
    case "EU":
      reg = "Spanish"
      break
    case "ID":
      reg = "Indonesia"

  }
  return reg
}


// function Get Video Ranking

function getVideoRanking(data, vidId) {
  var rank
  for (var i = 0; i < Object.keys(data).length; i++) {
    if (data[i].id.videoId === vidId) {
      rank = i
      console.log("Ifound you" + data[i].id.videoId)
      break
    }

  }
  if(rank != undefined) {
    rank = rank + 1
  }
  else {
    rank = "Aw more than 50+ :("
  }
  return rank
}



/* GET home page. */
router.get('/youtuberanker', function (req, res, next) {
  let user_cookie = req.cookies["session"]
  var sessionid = req.session.id
  if (user_cookie != null) {
    // already set cookie

    if (respAxios != null) {
      ytrank = getVideoRanking(respAxios, youtubeVideoId)
      

      res.render('index', {
        title: 'YoutubeRanker | #1 Youtube Tools',
        ytresp: respAxios,
        ytrank: ytrank,
        yturl: youtubeVideoId,
        region: getRegion(region)
      });

      respAxios = null
      ytrank = null
      


    } else {
      res.render('index', {
        title: 'YoutubeRanker | #1 Youtube Tools'
      });
      
    }
  } else {
    res.cookie('session', req.session.id, {
      maxAge: 900000
    });
    res.render('index', {
      title: 'YoutubeRanker | #1 Youtube Tools',
      ytrank: "",
      yturl: "",
      region: ""
    });
  }



});

router.post("/youtuberanker", async function (req, res) {
  var resp = JSON.parse(JSON.stringify(req.body))
  // get video id by users
  youtubeVideoId = resp.yturl
  region = resp.region
  /* User have sent request to perform post to YouTube API
   * Below is await axios get to Youtube api
   */
  let config = {
    headers: {
      'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) WebKit/8611 (KHTML, like Gecko) Mobile/18G82 [FBAN/FBIOS;FBDV/iPhone13,4;FBMD/iPhone;FBSN/iOS;FBSV/14.7.1;FBSS/3;FBID/phone;FBLC/en_US;FBOP/5;FBIA/FBIOS]"
    },
    params: {
      part: 'snippet',
      q: resp.keyword,
      key: apiKey[1],
      regionCode: region,
      maxResults: '50'
    }

  }
  youtubeResponse = await axios.get(host, config)
    .then(function (response) {
      // handle success
      respAxios = response.data.items
      // result of videos
    })
    .catch(function (error) {

      // handle error
      console.log(error)
    })
    .then(function () {
      // always executed
    })

  res.send("{'resp' : 'true'}");
});

module.exports = router