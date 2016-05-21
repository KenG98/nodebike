
var socket = io();

var gameData = {
	players: {}
};

function waitroomHTML(){
	var h = '<p id="box">Waiting for players to join...</p> \n ';
	h += '<p>Current Players:</p> \n';
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
	gameData.players[data.id] = {color: "#00FF00", radians: Math.random() * 6.28};
	$('#page').html(waitroomHTML());
});

socket.on('update', function(data){
	gameData.players[data.id].radians = data.radians;
});

function startGame(){
	socket.emit('start game');
	$('#page').html(gameroomHTML());
	canvas = $('#gamescreen')[0];
	canvas.width = $('#page').width();
	canvas.height = $('#page').height();
	canv = canvas.getContext("2d");
	setInterval(run, 34);
}

function run(){

}


