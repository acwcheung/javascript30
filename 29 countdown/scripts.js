const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button');
let countDown;

function timer(seconds) {
	//get the current time in minsecond, i.e. new Date() then getTime();
	clearInterval(countDown);
	
	const now = Date.now();
	const then = now + seconds * 1000;
	
	//display the time left before countdown starts
	displayTimeLeft(seconds);
	displayEndTime(then);
	countDown = setInterval(() => {
		//always check the current time against the end time
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0) {
			clearInterval(countDown)
			//clearInterval is asyn, need to exit 
			return;
		};
		displayTimeLeft(secondsLeft);
	}, 1000)
}

function displayTimeLeft(seconds) {
	const min = Math.floor(seconds / 60);
	const sec = seconds % 60;
	//0 or '' before the sec
	timerDisplay.textContent = `${min}:${sec < 10 ? 0: ''}${sec}`;
}

function displayEndTime(timeStamp) {
	//convert the end time from minisecond to time object
	const end = new Date(timeStamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12: hour;
	const min = end.getMinutes();
	endTime.textContent = `${adjustedHour}:${min < 10 ? 0: ''}${min}`;
}

function startTimer(e) {
	const buttonTime = e.target.getAttribute('data-time');
	timer(buttonTime);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

//grab DOM element by using the name attributes
//no need to have a submit button to use submit event
document.customForm.addEventListener('submit', function(e) {
	//not to send the url 
	e.preventDefault();
	const timeEntered = this.minutes.value * 60;
	timer(timeEntered);
	this.reset();
})




