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

const root = document.documentElement;
const img = document.querySelector('img');
const x = document.querySelector('[data-target="x"]');
const y = document.querySelector('[data-target="y"]');
let newX = window.innerWidth / 2;
let newY = window.innerHeight / 4;
root.style.setProperty('--x', newX + 'px');
root.style.setProperty('--y', newY + 'px');
let vX = 0;
let vY = 0;

function requestT() {
	let start = performance.now();
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
							newX = round10(newX + xDisplacement);
							newY = round10(newY + yDisplacement);
							x.textContent = newX;
							y.textContent = newY;
							root.style.setProperty('--x', newX + 'px');
							root.style.setProperty('--y', newY + 'px');
							start = performance.now();
						},
					);
				}
			})
			.catch(() => alert('You denied permission'));
	} else {
		alert('DeviceMotionEvent is not defined');
	}
}
document.body.style.backgroundColor = '#0FFFF0';
document.getElementById('request').onclick = requestT;
