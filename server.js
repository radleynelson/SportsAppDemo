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

function fetchArticles(){
  axios.get(URL).then(response => {
    console.log(response);
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

app.listen(3000, () => console.log('Server listening on port 3000!'));
