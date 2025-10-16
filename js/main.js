console.log("main loaded");

const quizElement = document.querySelector('.quiz');
const questionNumberElements = document.querySelectorAll('.number');
const questionElement = document.querySelector('#question');
const answerElements = document.querySelectorAll('.answer');
const endScreenElement = document.querySelector('.end-screen');
const endScreenTextElement = document.querySelector('.end-text');
const endScreenImgElement = document.querySelector('.end-img');
const resetElement = document.querySelector('.reset');

let questionIndex = 0;
let correctQuestions = 0;

const questions = [
    "Waarvoor gebruik je HTML?",
    "Wat betekent de afkorting HTML?",
    "Welk HTML-element gebruik je voor een koptekst?",
    "Welk element gebruik je om een paragraaf te maken?",
    "Wat doet het <img> element?",
    "Waarvoor gebruik je CSS?",
    "Wat betekent CSS?",
    "Welke eigenschap gebruik je om tekstkleur te veranderen in CSS?",
    "Hoe geef je een achtergrondkleur in CSS?",
    "Hoe verbind je een CSS-bestand met HTML?",
    "Waarvoor gebruik je JavaScript?",
    "Wat betekent alert(\"Hallo!\") in JavaScript?",
    "Wat is een variabele in JavaScript?",
    "Welke van deze is een geldige variabele?",
    "Wat doet console.log()?",
    "Wat is een browser?",
    "Welke van deze is GEEN browser?",
    "Wat is een hyperlink?",
    "Wat doet <a href=\"...\"> in HTML?",
    "Wat is het verschil tussen HTML en CSS?"
];

const answerA = [
    "Om foto's te bewerken",
    "HyperText Markup Language",
    "<p>",
    "<p>",
    "Maakt een tabel",
    "Om tekst te schrijven",
    "Computer Style Sheet",
    "font-size",
    "text-color",
    "<style>",
    "Om websites sneller te maken",
    "Verandert de achtergrondkleur",
    "Een foutmelding",
    "const naam = \"Jan\";",
    "Stuurt een bericht naar een andere website",
    "Een programma om websites te bekijken",
    "Chrome",
    "Een soort afbeelding",
    "Voegt een afbeelding toe",
    "HTML is voor opmaak, CSS voor structuur"
];

const answerB = [
    "Om websites te maken",
    "High Tech Machine Language",
    "<h1>",
    "<h2>",
    "Voegt een afbeelding toe",
    "Om de stijl van een website te bepalen",
    "Creative Style System",
    "text-align",
    "bg-color",
    "<script>",
    "Om interactieve dingen te doen op een website",
    "Stuurt een e-mail",
    "Een stukje data dat je kunt opslaan",
    "variable naam = Jan;",
    "Laat iets zien in de browserconsole",
    "Een soort computer",
    "Firefox",
    "Een link naar een andere pagina",
    "Maakt een koptekst",
    "HTML is voor structuur, CSS voor opmaak"
];

const answerC = [
    "Om muziek af te spelen",
    "Home Tool Markup Language",
    "<div>",
    "<img>",
    "Maakt een link",
    "Om bestanden op te slaan",
    "Cascading Style Sheets",
    "color",
    "background-color",
    "<link>",
    "Om afbeeldingen te bewerken",
    "Laat een pop-up zien met \"Hallo!\"",
    "Een afbeelding",
    "naam = const \"Jan\";",
    "Verandert de kleur van tekst",
    "Een programmeertaal",
    "Safari",
    "Een koptekst",
    "Maakt een link",
    "HTML is een programmeertaal"
];

const answerD = [
    "Om e-mails te versturen",
    "Hyperlink Text Main Language",
    "<link>",
    "<ul>",
    "Voegt tekst toe",
    "Om video's af te spelen",
    "Code Styling Software",
    "background",
    "color-background",
    "<css>",
    "Om tekst op te maken",
    "Verwijdert tekst",
    "Een link naar een website",
    "Jan = naam;",
    "Maakt een nieuwe pagina",
    "Een tekstverwerker",
    "Excel",
    "Een achtergrondkleur",
    "Verandert de kleur",
    "CSS maakt websites zichtbaar"
];

const correctAnswer = [
    1, 0, 1, 0, 1,
    1, 2, 2, 2, 2,
    1, 2, 1, 0, 1,
    0, 3, 1, 2, 1
];

let questionsArray = [];

setup();

function setup() {
    createQuestionOrder();
    for (let i = 0; i < answerElements.length; i++) {
        const answerElement = answerElements[i];
        answerElement.addEventListener('click', () => {
            answer(i);
        })
    }
    resetElement.addEventListener('click', reset);
    nextQuestion();
}

function createQuestionOrder() {
    for (let i = 0; i < 20; i++) {
        questionsArray.push(i);
    }
    shuffleArray(questionsArray);
    questionsArray = questionsArray.slice(0, 10);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function nextQuestion() {
    const index = questionsArray[questionIndex];
    questionElement.textContent = questions[index];
    answerElements[0].textContent = answerA[index];
    answerElements[1].textContent = answerB[index];
    answerElements[2].textContent = answerC[index];
    answerElements[3].textContent = answerD[index];
    questionNumberElements[questionIndex].classList.add('busy');
}

function answer(answer) {
    const questionElement = questionNumberElements[questionIndex];
    if (answer === correctAnswer[questionsArray[questionIndex]]) {
        questionElement.classList.add('correct');
        correctQuestions++;
    } else {
        questionElement.classList.add('incorrect');
    }
    questionElement.classList.remove('busy');
    questionIndex++;
    if (questionIndex >= questionsArray.length){
        endQuiz();
    }else {
        nextQuestion();
    }
}

function endQuiz(){
    quizElement.classList.add('hidden');
    if (correctQuestions > 5){
        endScreenTextElement.textContent = `Je hebt gewonnen. Je hebt ${correctQuestions} van de 10 goed`;
        endScreenImgElement.src = 'img/winning.jpg';
        endScreenImgElement.alt = 'gewonnen';
    }else {
        endScreenTextElement.textContent = `Je hebt verloren. Je hebt ${correctQuestions} van de 10 goed`;
        endScreenImgElement.src = 'img/losing.jpg';
        endScreenImgElement.alt = 'verloren';
    }
    endScreenElement.classList.remove('hidden');
}

function reset(){
    quizElement.classList.remove('hidden');
    endScreenElement.classList.add('hidden');
    questionsArray = [];
    questionIndex = 0;
    for (let i = 0; i < questionNumberElements.length; i++) {
        const element = questionNumberElements[i];
        element.classList.remove('correct');
        element.classList.remove('incorrect');
    }
    correctQuestions = 0;
    createQuestionOrder();
    nextQuestion();
}