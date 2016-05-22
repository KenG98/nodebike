
var socket = io();

var gameData = {
	players: {}
};

var width = $('body').width();
var height = $('body').height();

var colors = ["red", "green", "blue", "white", "yellow"];
var players = 0;

function waitroomHTML(){
	var h = '<p id="box">Waiting for players to join...</p> \n ';
	h += '<p>Current Players:</p> \n';
	h += '<hr WIDTH = 30% ALIGN = center SIZE= 1 COLOR=white>'
	
	for(p in gameData.players){
		h += '<p>' + p + '</p>\n';
	}
	h += '<hr WIDTH = 30% ALIGN = center SIZE= 1 COLOR=white>'
	h += '<button class="button" style="vertical-align:center" onclick="startGame()"><span>Start Game</span></button>';
	return h;
}

function gameroomHTML(){
	var h = '<canvas id="gamescreen"></canvas>';
	return h;
}

$('#page').html(waitroomHTML());
socket.emit('new display');

socket.on('new mobile', function(data){
	gameData.players[data.id] = {color: colors[players++], radians: 0, x: 0.3 * width, y: players / 6 * height};
	$('#page').html(waitroomHTML());
	socket.emit('update color', {id: socket.id, color: gameData.players[data.id].color});
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
		canv.beginPath();
		canv.strokeStyle=gameData.players[p].color;
		canv.arc(gameData.players[p].x, gameData.players[p].y, 4, 0, 6.28);
		canv.lineWidth = 3;
		canv.stroke();
	}
}

function run(){
	for(p in gameData.players){
		gameData.players[p].x += (5 * Math.cos(gameData.players[p].radians));
		gameData.players[p].y -= (5 * Math.sin(gameData.players[p].radians));
	}
	draw();
}

