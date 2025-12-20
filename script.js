const startButton = document.getElementById('startButton');
const countdownDiv = document.getElementById('countdown');
const welcomeMessageDiv = document.getElementById('welcomeMessage');
const title = document.getElementById('title');
const fireworksContainer = document.getElementById('fireworks-container');
const fireworks = new Fireworks.default(fireworksContainer);

startButton.addEventListener('click', () => {
    const audio = new Audio('src/Audio_Request_Ignored_Video_Provided.mp3');
    audio.play().catch(error => console.log("Audio play failed:", error));
    
    startButton.classList.add('d-none');
    title.classList.add('d-none');
    let count = 5;
    countdownDiv.textContent = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDiv.textContent = count;
        } else {
            clearInterval(interval);
            countdownDiv.classList.add('d-none');
            welcomeMessageDiv.classList.remove('d-none');
            fireworks.start();
            setTimeout(() => {
                fireworks.stop();
                window.location.href = 'http://unpaf.infinityfreeapp.com/';
            }, 5000);
        }
    }, 1000);
});