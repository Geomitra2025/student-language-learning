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
    document.querySelector('.flashcard').classList.toggle('flipped');
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
