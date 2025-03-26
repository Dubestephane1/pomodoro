let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let timerId = null;
const audio = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const breakButton = document.getElementById('break');
    const soundToggle = document.getElementById('soundToggle');

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startButton.textContent = 'Pause';
            timerId = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timerId);
                    isRunning = false;
                    startButton.textContent = 'Start';
                    if (soundToggle.checked) audio.play();
                    document.body.classList.add('flash');
                    setTimeout(() => document.body.classList.remove('flash'), 3000);
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            isRunning = false;
            startButton.textContent = 'Start';
        }
    }

    function resetTimer(minutes) {
        clearInterval(timerId);
        isRunning = false;
        startButton.textContent = 'Start';
        timeLeft = minutes * 60;
        updateDisplay();
    }

    // Add after your other const declarations
    const customMinutes = document.getElementById('customMinutes');
    const setCustomTime = document.getElementById('setCustomTime');
    
    // Add this with your other event listeners
    setCustomTime.addEventListener('click', () => {
        const minutes = parseInt(customMinutes.value);
        if (minutes && minutes > 0 && minutes <= 60) {
            resetTimer(minutes);
            customMinutes.value = ''; // Clear the input after setting
        }
    });
    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', () => resetTimer(25));
    breakButton.addEventListener('click', () => resetTimer(5));

    updateDisplay(); // Initial display
});

// Add this near the top of your script.js file
const themeSelect = document.getElementById('themeSelect');
const body = document.body;

themeSelect.addEventListener('change', (e) => {
    // Remove all theme classes
    body.classList.remove(
        'theme-cyberpunk',
        'theme-minimal',
        'theme-retro',
        'theme-nature',
        'theme-space',
        'theme-synthwave',
        'theme-matrix',
        'theme-sunset',
        'theme-ocean',
        'theme-neon'
    );
    
    // Add selected theme class
    body.classList.add(`theme-${e.target.value}`);
    
    // Save preference
    localStorage.setItem('pomodoro-theme', e.target.value);
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('pomodoro-theme') || 'cyberpunk';
    themeSelect.value = savedTheme;
    
    // Remove any existing theme classes first
    body.classList.remove(
        'theme-cyberpunk',
        'theme-minimal',
        'theme-retro',
        'theme-nature',
        'theme-space',
        'theme-synthwave'
    );
    
    // Add the saved theme class
    body.classList.add(`theme-${savedTheme}`);
});
