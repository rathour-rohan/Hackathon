let currentSlide = 0;
let timer;
let totalTime = 0; // Variable to track total time taken
const totalQuestions = 15; // Total number of questions
const correctAnswers = ["b", "c", "d", "b", "b", "d", "a", "c", "b", "c", "c", "c", "a", "c", "b"]; // Correct answers array

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
    document.getElementById('prevBtn').style.display = index === 0 ? 'none' : 'inline';
    document.getElementById('nextBtn').style.display = index === totalQuestions - 1 ? 'none' : 'inline';
    document.getElementById('submitBtn').style.display = index === totalQuestions - 1 ? 'inline' : 'none';
}

function changeSlide(n) {
    showSlide(currentSlide += n);
}

function startTimer() {
    timer = setInterval(() => {
        totalTime++;
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        document.getElementById('timer').innerText = `Time: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function submitQuiz() {
    clearInterval(timer);
    const slides = document.querySelectorAll('.slide');
    let score = 0;
    slides.forEach((slide, index) => {
        const selectedOption = slide.querySelector('input[type="radio"]:checked');
        if (selectedOption && selectedOption.value === correctAnswers[index]) {
            score++;
        }
    });

    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Your Score: ${score}/${totalQuestions}</h2><p>Time Taken: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}</p>`;
    
    // Hide quiz and show result
    const quizContainer = document.querySelector('.quiz-slider');
    quizContainer.style.display = 'none';
    resultDiv.style.display = 'block';
}

window.onload = function() {
    showSlide(currentSlide);
    startTimer();
};
