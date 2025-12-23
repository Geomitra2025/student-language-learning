// All 46 Hiragana Characters
const hiraganaData = [
    { hiragana: 'あ', romaji: 'a' },
    { hiragana: 'い', romaji: 'i' },
    { hiragana: 'う', romaji: 'u' },
    { hiragana: 'え', romaji: 'e' },
    { hiragana: 'お', romaji: 'o' },
    { hiragana: 'か', romaji: 'ka' },
    { hiragana: 'き', romaji: 'ki' },
    { hiragana: 'く', romaji: 'ku' },
    { hiragana: 'け', romaji: 'ke' },
    { hiragana: 'こ', romaji: 'ko' },
    { hiragana: 'さ', romaji: 'sa' },
    { hiragana: 'し', romaji: 'shi' },
    { hiragana: 'す', romaji: 'su' },
    { hiragana: 'せ', romaji: 'se' },
    { hiragana: 'そ', romaji: 'so' },
    { hiragana: 'た', romaji: 'ta' },
    { hiragana: 'ち', romaji: 'chi' },
    { hiragana: 'つ', romaji: 'tsu' },
    { hiragana: 'て', romaji: 'te' },
    { hiragana: 'と', romaji: 'to' },
    { hiragana: 'な', romaji: 'na' },
    { hiragana: 'に', romaji: 'ni' },
    { hiragana: 'ぬ', romaji: 'nu' },
    { hiragana: 'ね', romaji: 'ne' },
    { hiragana: 'の', romaji: 'no' },
    { hiragana: 'は', romaji: 'ha' },
    { hiragana: 'ひ', romaji: 'hi' },
    { hiragana: 'ふ', romaji: 'fu' },
    { hiragana: 'へ', romaji: 'he' },
    { hiragana: 'ほ', romaji: 'ho' },
    { hiragana: 'ま', romaji: 'ma' },
    { hiragana: 'み', romaji: 'mi' },
    { hiragana: 'む', romaji: 'mu' },
    { hiragana: 'め', romaji: 'me' },
    { hiragana: 'も', romaji: 'mo' },
    { hiragana: 'や', romaji: 'ya' },
    { hiragana: 'ゆ', romaji: 'yu' },
    { hiragana: 'よ', romaji: 'yo' },
    { hiragana: 'ら', romaji: 'ra' },
    { hiragana: 'り', romaji: 'ri' },
    { hiragana: 'る', romaji: 'ru' },
    { hiragana: 'れ', romaji: 're' },
    { hiragana: 'ろ', romaji: 'ro' },
    { hiragana: 'わ', romaji: 'wa' },
    { hiragana: 'を', romaji: 'wo' },
    { hiragana: 'ん', romaji: 'n' }
];

let currentIndex = 0;

// Start Learning
function startLearning() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('flashcardScreen').classList.add('active');
    loadCard();
}

// Load Card
function loadCard() {
    const card = hiraganaData[currentIndex];
    document.getElementById('hiragana').textContent = card.hiragana;
    document.getElementById('romaji').textContent = card.romaji;
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${hiraganaData.length}`;
    
    // Reset flip
    document.querySelector('.flashcard').classList.remove('flipped');
}

// Flip Card
function flipCard() {
    // Find the active screen and toggle its flashcard
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        const flashcard = activeScreen.querySelector('.flashcard');
        if (flashcard) {
            flashcard.classList.toggle('flipped');
        }
    }
}

// Next Card
function nextCard() {
    currentIndex = (currentIndex + 1) % hiraganaData.length;
    loadCard();
}

// Previous Card
function previousCard() {
    currentIndex = (currentIndex - 1 + hiraganaData.length) % hiraganaData.length;
    loadCard();
}

// Go Back
function goBack() {
    document.getElementById('flashcardScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    currentIndex = 0;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('flashcardScreen').classList.contains('active')) {
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') previousCard();
        if (e.key === ' ') {
            e.preventDefault();
            flipCard();
        }
    }
});


// ========== TEST MODE FUNCTIONALITY ==========

let testIndex = 0;
let testScore = 0;
let testAnswers = [];

// Start Test Mode
function startTest() {
    testIndex = 0;
    testScore = 0;
    testAnswers = [];
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('testScreen').classList.add('active');
    loadTestQuestion();
}

// Load Test Question
function loadTestQuestion() {
    const card = hiraganaData[testIndex];
    document.getElementById('testHiragana').textContent = card.hiragana;
    document.getElementById('answerInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('testCounter').textContent = `Question ${testIndex + 1} / ${hiraganaData.length}`;
    document.getElementById('scoreDisplay').textContent = `Score: ${testScore} / ${testIndex}`;
    document.getElementById('answerInput').focus();
}

// Check Answer
function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const correctAnswer = hiraganaData[testIndex].romaji;
    const feedbackEl = document.getElementById('feedback');
    
    if (!userAnswer) {
        feedbackEl.textContent = 'Please enter an answer!';
        feedbackEl.className = 'feedback wrong';
        return;
    }
    
    if (userAnswer === correctAnswer) {
        testScore++;
        feedbackEl.textContent = `✓ Correct! ${hiraganaData[testIndex].hiragana} = ${correctAnswer}`;
        feedbackEl.className = 'feedback correct';
        testAnswers.push({question: testIndex + 1, correct: true});
    } else {
        feedbackEl.textContent = `✗ Wrong! Correct answer: ${correctAnswer}`;
        feedbackEl.className = 'feedback wrong';
        testAnswers.push({question: testIndex + 1, correct: false});
    }
    
    // Move to next question after delay
    setTimeout(() => {
        testIndex++;
        if (testIndex < hiraganaData.length) {
            loadTestQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Allow Enter key to submit answer
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('answerInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
    }
});

// Show Results
function showResults() {
    document.getElementById('testScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    const percentage = Math.round((testScore / hiraganaData.length) * 100);
    document.getElementById('finalScore').textContent = testScore;
    document.getElementById('percentage').textContent = `${percentage}%`;
    
    let message = '';
    if (percentage >= 90) {
        message = 'Excellent! You\'ve mastered Hiragana! 🎉';
    } else if (percentage >= 70) {
        message = 'Great job! Keep practicing! 👍';
    } else if (percentage >= 50) {
        message = 'Good effort! Study more and try again! 💪';
    } else {
        message = 'Keep learning! Practice makes perfect! 📚';
    }
    
    document.getElementById('resultMessage').textContent = message;
}

// Retake Test
function retakeTest() {
    startTest();
}


// ========== WORDS VOCABULARY FUNCTIONALITY ==========

// Vocabulary Words Data
const vocabularyData = [
    { icon: '👋', english: 'Greeting', japanese: 'あいさつ', romaji: 'aisatsu' },
    { icon: '🙋', english: 'Self-introduction', japanese: 'じこしょうかい', romaji: 'jiko shoukai' },
    { icon: '👤', english: 'I / Me', japanese: 'わたし', romaji: 'watashi' },
    { icon: '👥', english: 'You', japanese: 'あなた', romaji: 'anata' },
    { icon: '📛', english: 'Name', japanese: 'なまえ', romaji: 'namae' },
    { icon: '❓', english: 'What', japanese: 'なに/なん', romaji: 'nani/nan' },
    { icon: '🎓', english: 'Student', japanese: 'がくせい', romaji: 'gakusei' },
    { icon: '🏫', english: 'University', japanese: 'だいがく', romaji: 'daigaku' },
    { icon: '👨‍🎓', english: 'University student', japanese: 'だいがくせい', romaji: 'daigaku sei' },
    { icon: '💼', english: 'Work / Job', japanese: 'しごと', romaji: 'shigoto' },
    { icon: '📍', english: 'Where', japanese: 'どこ', romaji: 'doko' },
    { icon: '🏠', english: 'To live / reside', japanese: 'すむ', romaji: 'sumu' },
    { icon: '👔', english: 'Company employee', japanese: 'かいしゃいん', romaji: 'kaisha in' },
    { icon: '🏭', english: 'Public servant', japanese: 'こうむいん', romaji: 'koumo in' },
    { icon: '🛍️', english: 'Shop clerk', japanese: 'てんいん', romaji: 'ten in' },
    { icon: '👨‍🏫', english: 'Teacher', japanese: 'せんせい', romaji: 'sensei' },
    { icon: '📚', english: 'Pupil / Student', japanese: 'せいと', romaji: 'seito' },
    { icon: '👨‍🔬', english: 'Professor', japanese: 'きょうじゅ', romaji: 'kyouju' },
    { icon: '📖', english: 'Assistant professor', japanese: 'じょきょうじゅ', romaji: 'jo kyouju' },
    { icon: '⚙️', english: 'Engineering dept', japanese: 'こうがくぶ', romaji: 'kou gakubu' },
    { icon: '🏛️', english: 'Faculty / Department', japanese: 'がくぶ', romaji: 'gakubu' },
    { icon: '📊', english: 'Major / Specialization', japanese: 'せんこう', romaji: 'senkou' },
    { icon: '⚡', english: 'Electrical & Electronics', japanese: 'でんきでんし', romaji: 'denki denshi' },
    { icon: '🔧', english: 'Technology / Engineering', japanese: 'ぎじゅつ', romaji: 'gijutsu' },
    { icon: '💻', english: 'Information', japanese: 'じょうほう', romaji: 'jouhou' },
    { icon: '🔬', english: 'Science', japanese: 'かがく', romaji: 'kagaku' }
];

let wordIndex = 0;

// Start Words Mode
function startWords() {
    wordIndex = 0;
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('wordsScreen').classList.add('active');
    loadWord();
}

// Load Word
function loadWord() {
    const word = vocabularyData[wordIndex];
    document.getElementById('wordIcon').textContent = word.icon;
    document.getElementById('englishWord').textContent = word.english;
    document.getElementById('japaneseWord').textContent = word.japanese;
    document.getElementById('romajiWord').textContent = word.romaji;
    document.getElementById('wordCounter').textContent = `${wordIndex + 1} / ${vocabularyData.length}`;
    
    // Reset flip
    document.querySelector('#wordsScreen .flashcard').classList.remove('flipped');
}

// Next Word
function nextWord() {
    wordIndex = (wordIndex + 1) % vocabularyData.length;
    loadWord();
}

// Previous Word
function previousWord() {
    wordIndex = (wordIndex - 1 + vocabularyData.length) % vocabularyData.length;
    loadWord();
}
