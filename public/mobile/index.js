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

var width = $('body').width();
var height = $('body').height();
$('#page').html(waitroomHTML());

socket.on('start game', function(){
	$('#page').html(gameroomHTML());
	$('#joyst').width(width);
	$('#joyst').height(height);
	console.log('game has started');
	joystickEvent = {};
	var joystick = new VirtualJoystick({container : document.getElementById('joyst'), mouseSupport : true});
	joystick.addEventListener('touchStart', function(){
		joystickEvent = setInterval(function(){
			var x = joystick.deltaX();
			var y = 0 - joystick.deltaY();
			var angle = Math.atan(y/x);
			if(y > 0 && x < 0) {
				angle += 3.14;
			} else if (y < 0 && x < 0){
				angle += 3.14;
			} else if (y < 0 && x > 0){
				angle += 6.28;
			}
			changePlayer(angle);
		}, 200);
	})
	joystick.addEventListener('touchEnd', function(){
		clearInterval(joystickEvent);
	})
	
});

function changePlayer(radians){
	socket.emit('update', {id: socket.id, radians: radians});
}
