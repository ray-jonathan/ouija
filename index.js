console.log('Test');
const p = document.querySelector('[data-target]');

// if (location.protocol != 'https:') {
// 	location.href =
// 		'https:' + window.location.href.substring(window.location.protocol.length);
// }
function requestT() {
	if (
		typeof DeviceMotionEvent !== 'undefined' &&
		typeof DeviceMotionEvent.requestPermission === 'function'
	) {
		// alert('enter');
		DeviceMotionEvent.requestPermission()
			.then(response => {
				alert('resp' + response);
				if (response == 'granted') {
					window.addEventListener('devicemotion', e => {
						// do something with e
						if (Math.abs(e.acceleration.x - p.textContent) > 0.01)
							p.textContent = `${e.acceleration.x}`;
					});
				}
			})
			.catch(() => alert('You denied permission'));
	} else {
		alert('DeviceMotionEvent is not defined');
	}
}
document.getElementById('request').onclick = requestT;
