const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
var replaceall = require("replaceall");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));


let articles = [];
let articlesClean = [];
let instaEmbeds = [];
let instaURLs = [];
let images = [
  {url: "http://www.nba.com/media/carter_9899_1600.jpg", id:1},
  {url: "http://1.bp.blogspot.com/-d1pF3f7vQ0w/T0fDPocxgKI/AAAAAAAABSY/ojgV6gkZvqw/s1600/bryant_9798_1600.jpg", id:2},
  {url: "http://www.nba.com/clippers/media/23-1600x1200.jpg", id:3},
  {url: "https://cdn-s3.si.com/s3fs-public/2017/11/16/porzingis-unicorn.jpg", id:4},
  {url: "https://cdn-images-1.medium.com/max/1600/1*tt5i2i-InULOUwHerPT2qg.jpeg", id:5},
  {url: "https://cdn-s3.si.com/s3fs-public/2017/08/15/russell_westbrook_0_.jpg", id:6},
  {url: "https://cdn-s3.si.com/s3fs-public/2017/11/03/ricky-rubio-jazz-reaction.jpg", id:7},
  {url: "https://i.ytimg.com/vi/R3CLGU5LkWs/maxresdefault.jpg", id:8},
  {url: "https://s-media-cache-ak0.pinimg.com/originals/02/a2/89/02a2895751083243a358b8e964e91164.jpg", id:9}
];
const URL = 'https://api.mozenda.com/rest?WebServiceKey=D185B582-0CDB-41EE-B299-1C357F17A82B&Service=Mozenda10&Operation=View.GetItems&ViewID=11151&ResponseFormat=JSON';
// var URL = 'https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/scoreboard.json?fordate=20180314';
// let scores = [];
// let id = 0;
//
// function formatDateForApi(date, adjuster) {
//     var today = date;
//     today.setDate(today.getDate() + adjuster);
//     console.log(today);
//     var year = today.getFullYear().toString();
//     var month = ((today.getMonth()) + 1);
//     var formatedMonth;
//     var day = today.getDate();
//     var formatedDay;
//     var dateForApi;
//
//
//     if (month < 10)
//     {
//         formatedMonth = "0" + month.toString();
//     }
//     else {
//         formatedMonth = month.toString();
//     }
//
//     if(day < 10)
//     {
//         formatedDay = "0" + day.toString();
//     }
//     else
//     {
//         formatedDay = day.toString();
//     }
//
//     dateForApi = year + formatedMonth + formatedDay;
//     return dateForApi;
// }
//
// function fetchScores() {
//      axios.get(URL,{auth: {username: 'radstlman',password: 'McRn4ever!'}},)
//      .then(response => {
//         scores = response.data.scoreboard.gameScore;
//         //console.log(response);
//          return true;
//      }).catch(err => {
//        console.log(err);
//      });
//    }
//
// fetchScores();
//
// app.get('/api/scores', (req,res) => {
//   var today = new Date();
//   var textDate = formatDateForApi(today,0);
//   fetchScores();
//
//   res.send(scores);
// });

function getPosts(){
  axios.get("https://api.mozenda.com/rest?WebServiceKey=D185B582-0CDB-41EE-B299-1C357F17A82B&Service=Mozenda10&Operation=View.GetItems&ViewID=11152&ResponseFormat=JSON").then(response =>{
    instaURLs = response.data.Item;
  }).then (response => {
    instaEmbeds = [];
    for (var i = 0; i < instaURLs.length; i++) {
      axios.get("https://api.instagram.com/oembed/?url=" + instaURLs[i]["NBA instagram"] + "&amp;omitscript=true&amp;hidecaption=true").then(response =>{
        instaEmbeds.push(response.data);
        return true
      }).catch(err => {
        console.log(err)
      });
    }
  }).catch(err => {
    console.log(err);
  })
}



getPosts();

setInterval(function (){
  axios.get("https://api.mozenda.com/rest?WebServiceKey=D185B582-0CDB-41EE-B299-1C357F17A82B&Service=Mozenda10&Operation=View.GetItems&ViewID=11152&ResponseFormat=JSON").then(response =>{
    instaURLs = response.data.Item;
  }).then (response => {
    for (var i = 0; i < instaURLs.length; i++) {
      axios.get("https://api.instagram.com/oembed/?url=" + instaURLs[i]["NBA instagram"] + "/&amp;omitscript=true&amp;hidecaption=true").then(response =>{
        instaEmbeds.push(response.data);
        return true
      }).catch(err => {
        console.log(err)
      });
    }
  }).catch(err => {
    console.log(err);
  })
}, 3000000);

function fetchArticles(){
  axios.get(URL).then(response => {
    //console.log(response);
    articles = response.data.Item;
    for (var iCount = 0; iCount < articles.length; iCount++){
      var temp = replaceall("\\", " ",articles[iCount]['Embed HTML']);
      articlesClean.push(temp);
    }
  return true;
  }).catch(err => {
    console.log(err);
  })
}
fetchArticles();

app.get('/api/articles', (req,res) => {

  res.send(articles);
});

app.get('/api/insta', (req, res) => {
  res.send(instaEmbeds);
})

app.get('/api/images', (req,res) =>{
  res.send(images);
});

app.post('/api/images',(req,res)=>{
  let id = images.length;
  let url = req.body.url;

  images.push({url: url, id:id});
  res.send(images);
});

app.put('/api/image/:id', (req, res) => {
  console.log(req.params.id);
  let id = parseInt(req.params.id);
  let index = -1;
  for (var i = 0; i < images.length; i++) {
    if(images[i].id == id){
      index = i;
      images[index].url = req.body.url;
    }
  }

  res.send(images[index]);

});

app.get("/api/fetchNewArticles", (req, res) => {
  const result = "Success";
  fetchArticles();
  getPosts();
  console.log("updated");
  res.send(result);
});

app.delete("/api/images/:id", (req,res) => {
  let id = parseInt(req.params.id);
  let removeIndex = -1;
  for (var i = 0; i < images.length; i++) {
    if(images[i].id == id){
      removeIndex = i;
    }
  }
  if(removeIndex == -1){
    res.status(404).send("Sorry, that item doesn't exist");
  }
  else {
    images.splice(removeIndex, 1);
    res.sendStatus(200);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
