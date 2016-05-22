var socket = io();

socket.on('connect', function () {
	socket.emit('new mobile', {id: socket.id});
});

function waitroomHTML(){
	var h = '<p>Waiting for game to start...<br>See your color on screen?</p>';
	return h;
}

function gameroomHTML(){
	h = '<p>Touch and drag!</p>';
	return h;
}

function changePlayerAngle(radians){
	socket.emit('update', {id: socket.id, radians: radians});
}

var width = $('body').width();
var height = $('body').height();
$('#page').html(waitroomHTML());

socket.on('start game', function(){

	$('#page').html(gameroomHTML());
	$('#joyst').width(width);
	$('#joyst').height(height);
	console.log('game has started');

	joystickEvent = undefined;
	joystick = new VirtualJoystick({container : document.getElementById('joyst'), mouseSupport : true});

	joystick.addEventListener('touchStart', function(){
		joystickEvent = setInterval(function(){
			var x = joystick.deltaX();
			var y = 0 - joystick.deltaY();
			var radians = Math.atan(y/x);
			if(y > 0 && x < 0) {
				radians += 3.14;
			} else if (y < 0 && x < 0){
				radians += 3.14;
			} else if (y < 0 && x > 0){
				radians += 6.28;
			}
			changePlayerAngle(radians);
		}, 100);
	});

	joystick.addEventListener('touchEnd', function(){
		clearInterval(joystickEvent);
	});
});

