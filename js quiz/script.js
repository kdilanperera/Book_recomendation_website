//selecting all required elements
const ignition = document.querySelector(".ignition button");
const information = document.querySelector(".information");
const exit_btn = information.querySelector(".main-buttons .exit");
const continue_btn = information.querySelector(".main-buttons .start");
const quiz_box = document.querySelector(".quiz_box");
const rewards = document.querySelector(".rewards");
const mcqs = document.querySelector(".mcqs");
const loadingbar = document.querySelector("header .loadingbar");
const timeText = document.querySelector(".counter .count-remaining");
const timeCount = document.querySelector(".counter .counter_sec");

// if startQuiz button clicked
ignition.onclick = ()=>{
    information.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    information.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    information.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const start_quiz = rewards.querySelector(".main-buttons .start");
const exit_quiz = rewards.querySelector(".main-buttons .exit");

// if startQuiz button clicked
start_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    rewards.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next.classList.remove("show"); //hide the next button
}

// if exitQuiz button clicked
exit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next = document.querySelector(".footerjsquiz .quiznext");
const bottom_ques_counter = document.querySelector(".footerjsquiz .question_count");

// if Next Que button clicked
next.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const questions_text_holder = document.querySelector(".questions_text_holder");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    questions_text_holder.innerHTML = que_tag; //adding new span tag inside que_tag
    mcqs.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = mcqs.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = mcqs.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(mcqs.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                mcqs.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                mcqs.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        mcqs.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    information.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    rewards.classList.add("activeResult"); //show result box
    const scoreText = rewards.querySelector(".total_score");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats!, You got <p>A Gold</p>Medal <p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside total_score
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and congrats!, You got <p>A Silver</p>Medal <p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and congrats!, You got <p>A Bronze</p>Medal <p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = mcqs.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(mcqs.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    mcqs.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    mcqs.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                mcqs.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        loadingbar.style.width = time + "px"; //increasing width of loadingbar with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}