var socket = io();

socket.on('connect', function () {
	socket.emit('new mobile', {id: socket.id});
});

function waitroomHTML(){
	var h = '<p>Waiting for game to start...<br>See your color on screen?</p>';
	return h;
}

function gameroomHTML(){
	h = 'a work in progress';
	return h;
}

$('#page').html(waitroomHTML());

socket.on('game started', function(){
	$('#page').html(gameroomHTML());
	var joystick = new VirtualJoystick({container : $('#page'), mouseSupport : true});
	setInterval(function(){
		var x = joystick.deltaX();
		var y = joystick.deltaY();
		console.log(x, y);
		// var angle = Math.atan(y/x);
	}, 34);
});

function changePlayer(radians){
	socket.emit('update', {id: socket.id, radians: radians});
}
