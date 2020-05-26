
async function getQuestions(){

    try{

        const result = await fetch(`https://opentdb.com/api.php?amount=20&category=18&type=multiple`);
        const data = await result.json();
        console.log(data);

        const questions  = Array.from(data.results);

        console.log(questions);
        const filteredQuestions = [];
        // an empty array
        // create a new object based on an object of the array
        // push that to the empty array
        //correct answer , wrong answer , question
        questions.forEach(question=>{
            let questionContainer = {};

            questionContainer.question = question.question;
            questionContainer.wrongAnswers = question.incorrect_answers;
            questionContainer.answer = question.correct_answer;
            questionContainer.choices = [...questionContainer.wrongAnswers,questionContainer.answer];

            filteredQuestions.push(questionContainer);
                        
        })

        //return the array created

        return filteredQuestions;
    }
    catch(error){
        alert(error);
    }
}


// Components

const questionCount = document.querySelector('.question-count');
const questionText = document.querySelector('.quiz__content');
const choices = document.querySelectorAll('.quiz__choice');
const getQuestionBtn = document.querySelector('.btn');
const scoreCount = document.querySelector('.score-count');

const unansweredQuestions = [];
const answeredQuestions = [];
for(let i = 1; i <= 20; i++ ){unansweredQuestions.push(i)};

let playerScore = 0,
    playerMistakes = 0,
    progressCount = 0;
scoreCount.textContent = playerScore;

// getQuestionBtn.addEventListener('click',grabAnotherQuestion);

let questionCounter = 0;
let playerAnswer,correctAnswer;

// let domParser = new DOMParser();

// let questions = getQuestions().then(data =>{
//     questions = data;
//     //randomly get an object 
//     const questionItem = getQuestion(questions);
//     showQuestions(questionItem);
// });

let questions = getQuestions().then(result => generateQuestion(result));


choices.forEach(choice =>{
    choice.addEventListener('click',checkAnswer);
})


function grabAnotherQuestion(){
    getQuestions().then(result => generateQuestion(result))
}

function generateQuestion(data){
    questionsData = data;
    //randomly get an object 
    const questionItem = getQuestion(questionsData);
    showQuestions(questionItem);
}

function getQuestion(data){
    console.log(unansweredQuestions);
    console.log(answeredQuestions);
    let random = getRandom(answeredQuestions,data);
    return data[random];
}

function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

function getRandom(answered,data){
     //random number up to 19
    //check if the question is already answered
    let theRandom = Math.floor((Math.random() * data.length));
    if(answered.includes(theRandom)){
        getRandom(answered,data);
    }
    else{
        answered.push(theRandom);
        questionCounter++;
        return theRandom;
    }
}

function showQuestions(question){
    console.log(question)
    questionCount.textContent = questionCounter;
    
    //check the question text
    questionText.textContent = decodeHTMLEntities(question.question);
    correctAnswer = question.answer;
    choices.forEach((choice,index) =>{
        choice.textContent = decodeHTMLEntities(question.choices[index]);
    })
}

function checkAnswer(e){
    console.log(e.target);
    if(e.target.textContent === correctAnswer){
        console.log('You are correct')
        playerScore++;
        scoreCount.textContent = playerScore;
    }
    else{
        alert('wrong');
        playerMistakes++;
    }

    
    progressCount++;
    if(progressCount === 10){
        document.querySelector('.quiz').innerHTML = '';
        alert(`Your score is ${playerScore} and you have ${playerMistakes}`);
    }
    grabAnotherQuestion();
}

function addPoints(){

}

function checkQuestionCount(){

}

//get question from an api
//show random question
//remove the question to the queue so it wont appear again
// check if the player has correct answer
// if yes, add score
//show another question
//if wrong show anotehr question
//





