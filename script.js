// Start Learning Button
function startLearning() {
    document.getElementById('lessons').scrollIntoView({ behavior: 'smooth' });
    showNotification('Welcome! Choose your language to begin your journey! 🚀');
}

// Language Selection
function selectLanguage(language) {
    showNotification(`Great choice! ${language} learning path activated! 🎉`);
    setTimeout(() => {
        document.getElementById('practice').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Quiz Functionality
let quizAnswered = false;

function checkAnswer(button, isCorrect) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const resultDiv = document.getElementById('result');
    const allButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    allButtons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        button.classList.add('correct');
        resultDiv.innerHTML = '✅ Correct! "Hola" means "Hello" in Spanish!';
        resultDiv.style.background = '#e8f5e9';
        resultDiv.style.color = '#2e7d32';
        
        // Load next question after delay
        setTimeout(() => {
            loadNextQuestion();
        }, 2000);
    } else {
        button.classList.add('wrong');
        // Show correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === 'Hello') {
                btn.classList.add('correct');
            }
        });
        resultDiv.innerHTML = '❌ Not quite! The correct answer is "Hello"';
        resultDiv.style.background = '#ffebee';
        resultDiv.style.color = '#c62828';
        
        setTimeout(() => {
            loadNextQuestion();
        }, 2000);
    }
}

// Quiz Questions Database
const quizQuestions = [
    {
        question: 'What does "Hola" mean in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctIndex: 0
    },
    {
        question: 'What does "Merci" mean in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctIndex: 2
    },
    {
        question: 'What does "Arigato" mean in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctIndex: 2
    },
    {
        question: 'What does "Danke" mean in English?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        correctIndex: 2
    }
];

let currentQuestionIndex = 0;

function loadNextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    const question = quizQuestions[currentQuestionIndex];
    
    quizAnswered = false;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.style.background = '';
    
    // Update question
    document.getElementById('question').textContent = question.question;
    
    // Update options
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong');
        btn.onclick = () => checkAnswer(btn, index === question.correctIndex);
    });
}

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to LinguaLearn! Start your language journey today! 🌍');
    }, 500);
});

// Progress tracking simulation
let wordsLearned = 127;
let dayStreak = 12;
let lessonsCompleted = 45;

function updateProgress() {
    wordsLearned++;
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = wordsLearned;
}

// Simulate progress updates
setInterval(() => {
    if (Math.random() > 0.7) {
        updateProgress();
    }
}, 30000);
