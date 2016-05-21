var socket = io();

gameData = {};

function waitroomHTML(){
	var h = '<p>Waiting for game to start</p> \n ';
	h += '<p>Players:</p> \n';
	for(p in gameData.players){
		h += p.id + '\n';
	}
	h += '<button onclick="startGame()">Start Game</button>';
	return h;
}

$('#page').html(waitroomHTML());

socket.on('player joined', function(data){
	gameData.players = data;
	$('#page').html(waitroomHTML());
});

socket.on('update game data', function(data){
	gameData = data;
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

function gameroomHTML(){
	var h = '<canvas id="gamescreen"></canvas>';
	return h;
}

function run(){
	
}


