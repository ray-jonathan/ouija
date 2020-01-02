function decimalAdjust(type, value, exp = -1) {
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

function displace(a, t, v = 0) {
	return v + (1 / 2) * a * t ** 2;
}

// Decimal round
const round10 = (value, exp) => decimalAdjust('round', value, exp);
const x = document.querySelector('[data-target=x]');
const y = document.querySelector('[data-target=y]');
const z = document.querySelector('[data-target=z]');
const root = document.documentElement;
const img = document.querySelector('img');
let newX = window.innerWidth / 2;
let newY = window.innerHeight / 4;
root.style.setProperty('--x', newX + 'px');
root.style.setProperty('--y', newY + 'px');
let vX = 0;
let vY = 0;
// if (location.protocol != 'https:') {
// 	location.href =
// 		'https:' + window.location.href.substring(window.location.protocol.length);
// }
function requestT() {
	const start = performance.now();
	if (
		typeof DeviceMotionEvent !== 'undefined' &&
		typeof DeviceMotionEvent.requestPermission === 'function'
	) {
		// alert('enter');
		DeviceMotionEvent.requestPermission()
			.then(response => {
				alert('resp' + response);
				if (response == 'granted') {
					window.addEventListener(
						'devicemotion',
						({ acceleration: { x: rawX, y: rawY } }) => {
							vX = round10(rawX * ((performance.now() - start) / 1000));
							vY = round10(rawY * ((performance.now() - start) / 1000));
							const xDisplacement = displace(
								round10(rawX),
								(performance.now() - start) / 1000,
								vX,
							);
							const yDisplacement = displace(
								round10(rawY),
								(performance.now() - start) / 1000,
								vY,
							);
							newX = newX + xDisplacement;
							newY = newY + yDisplacement;
							root.style.setProperty('--x', newX + 'px');
							root.style.setProperty('--y', newY + 'px');
						},
					);
				}
			})
			.catch(() => alert('You denied permission'));
	} else {
		alert('DeviceMotionEvent is not defined');
	}
}
document.getElementById('request').onclick = requestT;

// // do something with e
// // if (Math.abs(e.acceleration.x - parseFloat(x.textContent)) > 0.1) {
// 	x.textContent = `${round10(e.acceleration.x)}`;
// 	const xVal = parseFloat(
// 		root.style.getPropertyValue('--x').replace('px', ''),
// 	);
// 	const stopX = (performance.now() - start) / 1000;
// 	const newX = xVal + parseFloat(x.textContent) * stopX * 5;
// 	root.style.setProperty('--x', newX + 'px');
// 	// }
// 	// if (Math.abs(e.acceleration.y - parseFloat(y.textContent)) > 0.1) {
// 	y.textContent = `${round10(e.acceleration.y)}`;
// 	const yVal = parseFloat(
// 		root.style.getPropertyValue('--y').replace('px', ''),
// 	);
// 	const stopY = ((performance.now() - start) * stop) / 1000;
// 	const newY = yVal + parseFloat(y.textContent) * stopY * 5;
// 	root.style.setProperty('--x', newY + 'px');
// 	// }
// 	z.textContent = `${round10(e.acceleration.z)}`;
