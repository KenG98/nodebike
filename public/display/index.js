var socket = io();

var gameData = {
	players: []
};

function waitroomHTML(){
	var h = '<p>Waiting for game to start</p> \n ';
	h += '<p>Players:</p> \n';
	for(p in gameData.players){
		h += '<p>' + p + '</p>\n';
	}
	h += '<button onclick="startGame()">Start Game</button>';
	return h;
}

function gameroomHTML(){
	var h = '<canvas id="gamescreen"></canvas>';
	return h;
}

$('#page').html(waitroomHTML());

socket.on('new mobile', function(playerid){
	gameData.players[playerid] = "x";
	$('#page').html(waitroomHTML());
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

socket.emit('new display');
