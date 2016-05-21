
var socket = io();

var gameData = {
	players: {}
};

var width = $('body').width();
var height = $('body').height();

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
	gameData.players[data.id] = {color: "#00FF00", radians: Math.random() * 6.28, x: Math.random() * width, y: Math.random() * height};
	$('#page').html(waitroomHTML());
});

socket.on('update', function(data){
	gameData.players[data.id].radians = data.radians;
});

function startGame(){
	socket.emit('start game');
	$('#page').html(gameroomHTML());
	canvas = $('#gamescreen')[0];
	canvas.width = width;
	canvas.height = height;
	canv = canvas.getContext("2d");
	setInterval(run, 34);
}

function run(){
	
}


