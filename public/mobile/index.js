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
var width = $('body').width();
var height = $('body').height();
$('#page').html(waitroomHTML());

socket.on('start game', function(){
	$('#page').html(gameroomHTML());
	$('#joyst').width = width;
	$('#joyst').height = height;
	console.log('game has started');
	var joystick = new VirtualJoystick({container : document.getElementById('joyst'), mouseSupport : true});
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
