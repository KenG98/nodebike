
var socket = io();

var gameData = {
	players: {}
};

var width = $('body').width();
var height = $('body').height();

var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffffff", "#ffff00"];
var usedColors = [];
var livingPlayers = 0;

function getUnusedColor(){
	for(c in colors){
		if(!usedColors.includes(colors[c])){
			usedColors.push(colors[c]);
			return colors[c];
		}
	}
}

function gameroomHTML(){
	var h = '<canvas id="gamescreen"></canvas>';
	return h;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

socket.emit('new display');

socket.on('new mobile', function(data){
	gameData.players[data.id] = {color: getUnusedColor(),
		radians: 0,
		x: 0.3 * width, y: (livingPlayers + 1) / 6 * height,
		alive: true};
	$('#players').append('<div id="'+data.id+'" class="circle" style="background-color: ' + gameData.players[data.id].color + ';"></div>');
	socket.emit('update color', {id: data.id, color: gameData.players[data.id].color});
	livingPlayers++;
});

socket.on('update', function(data){
	gameData.players[data.id].radians = data.radians;
});

socket.on('player left', function(data){
	var id = data.id.substring(2, data.id.length);
	var playerColor = gameData.players[id].color;
	delete gameData.players[id];
	var index = usedColors.indexOf(playerColor);
	usedColors.splice(index, 1);
	$('#' + id).remove();
	livingPlayers--;
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
				livingPlayers--;
			} else if (gameData.players[p].y < 0 || gameData.players[p].y > height){
				gameData.players[p].alive = false;
				livingPlayers--;
			} else {
				var pixel = canv.getImageData(gameData.players[p].futureX, gameData.players[p].futureY, 1, 1).data;
				var color = rgbToHex(pixel[0], pixel[1], pixel[2]);
				// console.log(color);
				if(color != "#000000" && color != gameData.players[p].color){
					gameData.players[p].alive = false;
					livingPlayers--;
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

	if(livingPlayers <= 1){
		for(p in gameData.players){
			if(gameData.players[p].alive == true){
				var winner = gameData.players[p].color;
				$('#page').html('<p id="winner" style="color:' + winner + ';">WINNER</p>');
				setTimeout(function(){
					location.reload();
				}, 4000);
			}
		}
		setTimeout(function(){
					location.reload();
				}, 10000);
	}
}

