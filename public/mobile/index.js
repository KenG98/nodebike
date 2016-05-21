var socket = io();

function waitroomHTML(){
	var h = '<p>Waiting for game to start</p>';
	return h;
}

function gameroomHTML(){
	h = 'a work in progress';
	return h;
}

$('#page').html(waitroomHTML());

socket.on('game started', function(){
	$('#page').html(gameroomHTML());
});

socket.emit('new mobile');

function changePlayer(radians){
	socket.emit('player changed', radians);
}