
var socket = io();

var gameData = {
	players: {}
};

var width = $('body').width();
var height = $('body').height();

var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF", "#FFFF00"];
var players = 0;

function gameroomHTML(){
	var h = '<canvas id="gamescreen"></canvas>';
	return h;
}

socket.emit('new display');

socket.on('new mobile', function(data){
	gameData.players[data.id] = {color: colors[players++],
		radians: 0,
		x: 0.3 * width, y: players / 6 * height,
		alive: true};
	$('#players').append('<p id="players">' + data.id + '</p>');
	socket.emit('update color', {id: data.id, color: gameData.players[data.id].color});
});

socket.on('update', function(data){
	gameData.players[data.id].radians = data.radians;
});

function startGame(){
	console.log('starting!');
	socket.emit('start game');
	$('#page').html(gameroomHTML());
	canvas = $('#gamescreen')[0];
	$('#page').width(width);
	$('#page').height(height);
	canvas.width = width;
	canvas.height = height;
	canv = canvas.getContext("2d");
	setInterval(run, 34);
}

function draw(){
	for(p in gameData.players){
		if(gameData.players[p].alive){
			canv.beginPath();
			canv.strokeStyle=gameData.players[p].color;
			canv.arc(gameData.players[p].x, gameData.players[p].y, 4, 0, 6.28);
			canv.lineWidth = 3;
			canv.stroke();
		}
	}
}

function run(){
	for(p in gameData.players){
		if(gameData.players[p].alive){
			gameData.players[p].futureX = gameData.players[p].x + (5 * Math.cos(gameData.players[p].radians));
			gameData.players[p].futureY = gameData.players[p].y - (5 * Math.sin(gameData.players[p].radians));
		}
	}

	for(p in gameData.players){
		if(gameData.players[p].alive == true){
			if(gameData.players[p].x < 0 || gameData.players[p].x > width){
				gameData.players[p].alive = false;
			} else if (gameData.players[p].y < 0 || gameData.players[p].y > height){
				gameData.players[p].alive = false;
			} else {
				var pixel = canv.getImageData(gameData.players[p].futureX, gameData.players[p].futureY,
				1, 1).data;
				console.log(pixel[0], pixel[1], pixel[2]);
				if(pixel[0] != 0 || pixel[1] != 0 || pixel[2] != 0){
					gameData.players[p].alive = false;
				}
			}
		}
	}

	draw();

	for(p in gameData.players){
		if(gameData.players[p].alive){
			gameData.players[p].x = gameData.players[p].futureX;
			gameData.players[p].y = gameData.players[p].futureY;
		}
	}
}

