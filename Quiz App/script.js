const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choisesBox = document.querySelector('.choises');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startbtn = document.querySelector('.startbtn');
const timer = document.querySelector('.timer');



// Create Quiz which has include Questions,Choises of question and Answer. 
const Quiz = [
    {
        Question:"1. Javascript is an _______ language?",
        Choises:["Object-Oriented","Object-Based","Assembly-language","High-level"],
        Answer:"Object-Oriented"
    },
    {
        Question:"2. In the JavaScript, which one of the following is not considered as an error:",
        Choises:["Syntax error","Missing of semicolons","Division by zero","Missing of Bracket"],
        Answer:"Syntax error"
    },
    {
        Question:"3. Which of the keyword is used to define the variable in the javascript?",
        Choises:["var","let","both var & let","None of the above"],
        Answer:"both var & let"
    },
    {
        Question:"4.  which of the method is used to get HTML element in javascript?.",
        Choises:["getElementbyId()","getElementsByClassName()","Both A & B","None of the above"],
        Answer:"Both A & B"
    },
    {
        Question:"5. What does NaN means.",
        Choises:["Negative Number","Not a Number","Both A & B","None of the Above"],
        Answer:"Not a Number"
    },
    {
        Question:"6.Which of the following is not a javascript framework?",
        Choises:[" Vue","React","Node","Laravel"],
        Answer:"Laravel"
    },
    {
        Question:"7. The let and var are known as:",
        Choises:["Prototypes","Declaration statements","Data Types","Keywords"],
        Answer:"Declaration statements"
    },
    {
        Question:"8.  Which event is related to the keyboard?",
        Choises:["onfocus","onclick","onkeydown","onkeypress"],
        Answer:"onkeypress"
    },
    {
        Question:"9.  Which on is not a mouse event?",
        Choises:["onmouseover","onmousemove","onclick","onmousescroller"],
        Answer:"onmousescroller"
    },
    {
        Question:"10. Which of these is used in JavaScript for calling a method or a function?",
        Choises:["Functional Expression","Property Access Expression","Primary Expression","Invocation Expression"],
        Answer:"Invocation Expression"
    },
    {
        Question:"11. Which of these is known as the Equality operator used for checking whether both the values are equal?",
        Choises:["=","==","===","&&"],
        Answer:"=="
    },
    {
        Question:"12. Out of the following functions of the string object, which one would return the character in any string via the specified number of characters starting at a specified position?",
        Choises:["search()","substr()","split()"," slice() "],
        Answer:"substr()"
    },
    {
        Question:"13. Which of these keywords is used to define various functions in JavaScript?.",
        Choises:["function","main","init","void"],
        Answer:"function"
    },
    {
        Question:"14. A function’s execution would stop whenever a program control would encounter the _________ statement in the function’s body.",
        Choises:["goto statement"," break statement"," continue statement","return statement"],
        Answer:"return statement"
    },
    {
        Question:"15. In the line of code given below, what will the “datatype” written in brackets be called? article[datatype]=assignment_value;",
        Choises:["An object","A String","Floating point"," An integer"],
        Answer:"A String"
    },
];


// make a variable for current question index
let currentQuestionIndex = 0;
// initial score value is zero
let score = 0; 
let quizOver = false; 
let timeLeft = 15;  
let timerId = null;       

// arrow function to show question
const showQuestions = () =>{
    // console.log("question");
    const questionDetails = Quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.Question;

    choisesBox.textContent = "";
    for(let i=0;i<questionDetails.Choises.length; i++){
        const currentChoise = questionDetails.Choises[i];
        const choisesDiv = document.createElement('div');
        choisesDiv.textContent = currentChoise;
        choisesDiv.classList.add('choice');
        choisesBox.appendChild(choisesDiv);

    
        choisesDiv.addEventListener('click',()=>{
            if(choisesDiv.classList.contains('selected')){
                choisesDiv.classList.remove('selected');
            }
            else{
                choisesDiv.classList.add('selected');
            }
        })
    }
    if(currentQuestionIndex < Quiz.length){
        startTimer();
        if(timeLeft == 0){
            displayAlert("Your are leave 1 question") ;
        }
    }
}


// Function to check Answer 
const checkAnswer = () =>{
    const selectchioce = document.querySelector('.choice.selected');
    if(selectchioce.textContent === Quiz[currentQuestionIndex].Answer){
        displayAlert(`Congratulations!, Your answer ${Quiz[currentQuestionIndex].Answer} is correct`);
        score++;
    }
    else{
    displayAlert(`Oop's your answer is wronge,Correct answer is ${Quiz[currentQuestionIndex].Answer}`);
    } 
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < Quiz.length){
        showQuestions();
    }else{
        showScore();
        stopTimer();
        quizOver = true;
        timer.style.display = "none";
    }
}


// Function to show score
const showScore = () =>{
    questionBox.textContent = "";
    choisesBox.textContent = "";
    scoreCard.textContent = `Your score ${score} out of ${Quiz.length} !`;
    displayAlert("Congratulations!, You have complete this Quiz.")
    nextBtn.textContent = "Play Again";
    // nextBtn.addEventListener('click',()=>{
    //     currentQuestionIndex = 0;
    //     showQuestions();
    //     nextBtn.textContent = "Next";
    //     scoreCard.textContent = "";
    // });
}


// create a alert function
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
    alert.style.display = "none";
    },1500);
}

// Function to start Timer
const startTimer = () =>{
    clearInterval(timerId);
    timer.textContent = timeLeft;

    const countDown = () =>{
        timer.textContent = timeLeft;
        timeLeft--;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play again.");

     //  when "currentQuestionIndex++;" nhi kroge to ushi question pe time 
     //dubara start ho jayega.So you can do this for next question.
            currentQuestionIndex++;  

            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startbtn.style.display = "block";
                container.style.display = "none";

                // Cancel karne ke bad Quiz dubara start ho jayega isliye index = 0 kiya hai maine
                currentQuestionIndex = 0;
                score = 0;

                return;
            }
        }
    }
   timerId = setInterval(countDown,1000);
}

// function to stop time
const stopTimer = () =>{
     clearInterval(timerId);
}

// function to shuffle questions
// const shuffleQuestion = () =>{
//     for(let i=Quiz.length-1;i>0;i--){
//         const j = math.floor(Math.random()*i+1);
//         [Quiz[i],Quiz[j]] = [Quiz[j],Quiz[i]];
//     }
//     currentQuestionIndex = 0;
//     showQuestions(); 
// }

// Function to start Quiz
const startQuiz = ()=>{
    timeLeft = 15;
    timer.style.display = "flex";
    showQuestions();
}

// adding event listener to start button
startbtn.addEventListener('click',()=>{
    startbtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
})


nextBtn.addEventListener('click',()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        displayAlert("Select you answer");
        return;
    }

    if(quizOver){
        currentQuestionIndex = 0;
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else{
        checkAnswer();
    }
});






