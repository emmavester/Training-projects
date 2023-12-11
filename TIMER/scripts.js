
    let [seconds, minutes, hours] = [0, 0, 0];
    let displayTime = document.getElementById('display');
    let timerInterval = null;

    function updateTimer() {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }


    let h;
        if (hours < 10) {
        h = "0" + hours;
    } else {   
    h = hours;
    }

    let m;
        if (minutes < 10) {
        m = "0" + minutes;
    } else {   
    m = minutes;
    }

    let s;
        if (seconds < 10) {
        s = "0" + seconds;
    } else {   
    s = seconds;
    }

        displayTime.innerHTML = h + ":" + m + ":" + s;
    }

    function startTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        [seconds, minutes, hours] = [0, 0, 0];
        display.innerHTML = "00:00:00";
    }