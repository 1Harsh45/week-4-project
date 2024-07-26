const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correct: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startQuizBtn = document.getElementById('start-quiz-btn');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const finalScore = document.getElementById('final-score');
const retryBtn = document.getElementById('retry-btn');
const homeBtn = document.getElementById('home-btn');

startQuizBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', submitAnswer);
retryBtn.addEventListener('click', retryQuiz);

function startQuiz() {
    welcomeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1}`;
    questionText.textContent = currentQuizData.question;
    optionsContainer.innerHTML = '';
    
    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'option';
        checkbox.value = index;
        checkbox.addEventListener('change', () => selectOption(index));
        
        const label = document.createElement('label');
        label.textContent = option;

        optionElement.appendChild(checkbox);
        optionElement.appendChild(label);
        optionsContainer.appendChild(optionElement);
    });
}

function selectOption(selectedIndex) {
    const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = (index === selectedIndex);
    });
}

function submitAnswer() {
    const selectedOption = Array.from(optionsContainer.querySelectorAll('input[type="checkbox"]')).find(checkbox => checkbox.checked);
    if (!selectedOption) return;

    const selectedIndex = parseInt(selectedOption.value, 10);
    const correctIndex = quizData[currentQuestion].correct;

    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
        option.querySelector('input[type="checkbox"]').disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
    }


    scoreElement.textContent = `Your score is ${score} out of ${quizData.length}`;

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
            startTimer();
        } else {
            endQuiz();
        }
    }, 2000);
}

function startTimer() {
    timeLeft = 30;
    timerElement.textContent = `Time: ${timeLeft}`;
    clearInterval(timer); // Clear previous timer
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Your time is finished!");
            retryQuiz(); // Restart the quiz automatically
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScore.textContent = `${score} out of ${quizData.length}`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = `Your score is 0 out of ${quizData.length}`;
    resultScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}
