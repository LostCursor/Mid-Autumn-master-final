var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

app.listen(process.env.PORT||8888);

app.use(express.static("public"));

var jokes=[{setup:"“有时落在山腰，有时挂在树梢， 有时象面圆镜，有时象把镰刀。（猜一天体）?",punchline:"月亮"},{setup:"能说会道",punchline:"团"},{setup:"平日不思，中秋想你，有方有圆，甜甜蜜蜜。（猜一食品名））",punchline:"月饼"},{setup:"艳阳西下，皓月东挂。（猜一字）",punchline:"明"},{setup:"“太阳西边下，月亮东边挂。（猜一字） ",punchline:"明 "},];

app.route("/jokes").get(function(req,res,next){
	randomJokeIndex = Math.floor(Math.random()*jokes.length);

	jokes[randomJokeIndex].id = randomJokeIndex;

	res.send(jokes[randomJokeIndex]);
});

app.post('/upvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Upvoting");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes++;

    res.send(jokes[jokeIndex]);
});

app.post('/downvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Downvoting");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes--;

    res.send(jokes[jokeIndex]);
});
