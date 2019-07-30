var unirest = require("unirest");

var req = unirest("GET", "https://community-placekitten.p.rapidapi.com/1280/720");

req.headers({
	"x-rapidapi-host": "community-placekitten.p.rapidapi.com",
	"x-rapidapi-key": "SIGN-UP-FOR-KEY"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});