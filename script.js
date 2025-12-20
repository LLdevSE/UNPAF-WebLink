const startButton = document.getElementById('startButton');
const countdownDiv = document.getElementById('countdown');
const welcomeMessageDiv = document.getElementById('welcomeMessage');
const title = document.getElementById('title');
const fireworksContainer = document.getElementById('fireworks-container');
const fireworks = new Fireworks.default(fireworksContainer);

let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
}

loadVoices();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Cancel any previous speech

        const utterance = new SpeechSynthesisUtterance(String(text));
        
        // Try to select an English voice
        const voice = voices.find(v => v.lang.includes('en-US')) || voices[0];
        if (voice) {
            utterance.voice = voice;
        }

        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
    }
}

startButton.addEventListener('click', () => {
    // Ensure voices are updated
    if (voices.length === 0) loadVoices();
    
    startButton.classList.add('d-none');
    title.classList.add('d-none');
    let count = 5;
    countdownDiv.textContent = count;
    speak(count);

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDiv.textContent = count;
            speak(count);
        } else {
            clearInterval(interval);
            countdownDiv.classList.add('d-none');
            welcomeMessageDiv.classList.remove('d-none');
            speak("Welcome to UNPAF");
            fireworks.start();
            setTimeout(() => {
                fireworks.stop();
                window.location.href = 'http://unpaf.infinityfreeapp.com/';
            }, 5000);
        }
    }, 1000);
});
