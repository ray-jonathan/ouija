function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

// Decimal round
const round10 = (value, exp) => decimalAdjust('round', value, exp);
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
						if (Math.abs(e.acceleration.x - parseFloat(p.textContent)) > 0.1)
							p.textContent = `${round10(e.acceleration.x)}`;
					});
				}
			})
			.catch(() => alert('You denied permission'));
	} else {
		alert('DeviceMotionEvent is not defined');
	}
}
document.getElementById('request').onclick = requestT;
