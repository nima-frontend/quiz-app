const questions = [ 
    {
        question:"Which actor played the Joker in The Dark Knight (2008)?",
        answers:[
            {text:"Jared Leto",value:false},
            {text:"Joaquin Phoenix",value:false},
            {text:"Heath Ledger",value:true},
            {text:"Jack Nicholson",value:false},
        ]
    },
    {
        question:"What is the name of the coffee shop the characters frequently visit in Friends?",
        answers:[
            {text:"Coffee Spot",value:false},
            {text:"Central Perk",value:true},
            {text:"Brew Bros",value:false},
            {text:"Café New York",value:false},
        ]
    },
    {
        question:"In Sherlock (BBC), who plays Sherlock Holmes?",
        answers:[
            {text:"Tom Hiddleston",value:false},
            {text:"Benedict Cumberbatch",value:true},
            {text:"Martin Freeman",value:false},
            {text:"David Tennant",value:false},
        ]
    },
    {
        question:"What color pill does Neo take in The Matrix?",
        answers:[
            {text:"Red",value:true},
            {text:"Blue",value:false},
            {text:"Green",value:false},
            {text:"Black",value:false},
        ]
    },
    {
        question:"In Scarface, what’s Tony Montana’s famous line?",
        answers:[
            {text:"You mess with me, you mess with the best!",value:false},
            {text:"I run this town now",value:false},
            {text:"You can’t stop the king!",value:false},
            {text:"Say hello to my little friend!",value:true},
        ]
    },
    {
        question:"What is the name of Amy Dunne's book that becomes a major plot point in Gone Girl?",
        answers:[
            {text:"Amazing Amy",value:true},
            {text:"Gone Girl",value:false},
            {text:"The Disappearing Act",value:false},
            {text:"The Lost Girl",value:false},
        ]
    },
    {
        question:"What major event does Frank warn Donnie about at the beginning of the film?",
        answers:[
            {text:"A school shooting",value:false},
            {text:"The end of the world",value:true},
            {text:" A plane crash",value:false},
            {text:"His own death",value:false},
        ]
    },
];

const quizProgress = document.querySelector('.quiz-progress');
const questionContainer = document.querySelector('.question-container');
const answerContainer = document.querySelector('.answer-container');

let currentQuestionIndex = 0;
let score = 0;

function handleQuestion(index) {
    let questionNum = currentQuestionIndex + 1;

    // progress bar
    quizProgress.innerHTML = "";
    questions.forEach(() => {
        quizProgress.innerHTML += `<span></span>`;
    });
    let spans = document.querySelectorAll('span');
    for (let i = 0; i <= index; i++) {
        spans[i].classList.add('seen');
    }

    // question
    questionContainer.innerHTML = `<p>${questionNum}. ${questions[index].question}</p>`;

    // answers
    answerContainer.innerHTML = "";
    questions[index].answers.forEach((answer) => {
        answerContainer.innerHTML += `<button>${answer.text}</button>`;
    });

    // button logic
    let choices = document.querySelectorAll('button');
    choices.forEach((choice, i) => {
        choice.addEventListener('click', (e) => {
            const isCorrect = questions[index].answers[i].value
            if (isCorrect) {
                e.target.style.borderColor = 'green';
                score++;
            } else {
                e.target.style.borderColor = 'red';
                questions[index].answers.forEach((answer,j)=>{
                    if(answer.value){
                        choices[j].style.borderColor = 'green'
                    }
                })
            }

            // disable all buttons after click
            choices.forEach(btn => btn.disabled = true);

            // move to next question after short delay
            setTimeout(() => {
                if (currentQuestionIndex === questions.length - 1) {
                    // Show result screen
                    questionContainer.innerHTML = `<h2 class="finished">Quiz Finished!</h2><p>Your score: ${score}/${questions.length}</p>`;
                    answerContainer.innerHTML = `<button id="restart">Try Again</button>`;
                    quizProgress.innerHTML = "";

                    document.querySelector('#restart').addEventListener('click', () => {
                        currentQuestionIndex = 0;
                        score = 0;
                        handleQuestion(currentQuestionIndex);
                    });
                } else {
                    currentQuestionIndex++;
                    handleQuestion(currentQuestionIndex);
                }
            }, 600);
        });
    });
}

// Start quiz
handleQuestion(currentQuestionIndex);
