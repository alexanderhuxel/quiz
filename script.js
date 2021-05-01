
/**
 * @var allVariables
 * @property  {array} Questions - the questions of the quiz
 * @property {array  } list - the HTML of the buttons
 * @property {number} True - the indictor of right answers
 * @property {number} False - the indictor of false answers
 * @property {number} i - the index of the current question
 * 
 */
// CONFIG
let Questions = [];
let list = ['<button class="button" id="button1"></button>', '<button class="button" id="button2"></button>', '<button class="button" id="button3"></button>', '<button   id="button4"></button>']
let True = 0;
let False = 0;
let i = 0;
// CONFIG

/**
 * adding eventlistener to the id button4 (click) <br>
 * run nextQuestion(); <br>
 * True++; <br>
 * adding eventlistener to all buttons with the class button (click) <br>
 * run nextQuestion() <br>
 * False++;
 * @property {function} nextQuestion - display the nextquestion
 * @property {number} True - the value of the Rightanswers
 * @property {number} False - the value of the Rightanswers
 */

function addHandler() {
    document.getElementById("button4").addEventListener("click", () => {
        nextQuestion();
        True++;
    });

    let button = document.getElementsByClassName("button");
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", () => {
            nextQuestion();
            False++;
        })
    }


}






/**
 * Initial all need functions
 * @property {function} drawQuiz
 */
function init() {

    drawQuiz();
}
/**
 * shuffle the array with the buttons
 */
function shuffleList() {
    list = list.sort(() => Math.random() - 0.5);
    document.getElementById("answer").innerHTML = `${list[0]}${list[1]}${list[2]}${list[3]}`;
}

/**
 * shuffle the list array , change the innerHTML of the buttons set the question
 */
function drawQuiz() {
    shuffleList();
    document.getElementById("question").innerHTML = `${Questions}`
}
/**
 * Download data from the API .
 * @property {string} url - https://opentdb.com/api.php?amount=16&category=${Category}&difficulty=${Difficulty}&type=multiple
 * @property {number} selectorOne - the id of the first inputfield
 * @property {number} selectorTwo - the id of the first inputfield
 * @property {number} Category - the id of the first option
 * @property {number} Difficulty - the id of the first option
 * @example 
 * const response = await fetch(`https://opentdb.com/api.php?amount=16&category=${Category}&difficulty=${Difficulty}&type=multiple`);
    const category = await response.json();
    return category
 * @returns {Promise<string>}  - The data from the URL.
 */
async function loadCategory() {
    let selectorOne = document.getElementById("cat").selectedIndex;
    let selectorTwo = document.getElementById("dif").selectedIndex;
    let Category = document.getElementById("cat").options[selectorOne].value;
    let Difficulty = document.getElementById("dif").options[selectorTwo].value;
    const response = await fetch(`https://opentdb.com/api.php?amount=16&category=${Category}&difficulty=${Difficulty}&type=multiple`);
    const category = await response.json();
    return category
}

/**
 * generating the questions and the answers in the HTML 
 */


function useDateofFetch() {
    document.getElementById("headline").innerHTML = `${Questions[0][i].category}`
    document.getElementById("finish").innerHTML = `${Questions[0].length - 1}`;
    document.getElementById("question").innerHTML = `${Questions[0][i].question} `;
    document.getElementById("button1").innerHTML = `${Questions[0][i].incorrect_answers[0]} `;
    document.getElementById("button2").innerHTML = `${Questions[0][i].incorrect_answers[1]} `;
    document.getElementById("button3").innerHTML = `${Questions[0][i].incorrect_answers[2]} `;
    document.getElementById("button4").innerHTML = `${Questions[0][i].correct_answer} `;
    document.getElementById("position").innerHTML = `${i}`;
}

/**
 * change the innerHTML with an if else statement
 */
function nextQuestion() {
    if (i == 15) {
        drawQuiz();
        document.getElementById("body").innerHTML = endScreen();
        document.getElementById("trueq").innerHTML = "Right Answers: " + True;
        document.getElementById("falseq").innerHTML = "Wrong Answers: " + False;
        document.getElementById("percent").innerHTML = `${100 / 15 * True} % `;
    } else {
        shuffleList();
        addHandler();
        i++;
        document.getElementById("question").innerHTML = `${Questions[0][i].question} `;
        document.getElementById("button1").innerHTML = `${Questions[0][i].incorrect_answers[0]} `;
        document.getElementById("button2").innerHTML = `${Questions[0][i].incorrect_answers[1]} `;
        document.getElementById("button3").innerHTML = `${Questions[0][i].incorrect_answers[2]} `;
        document.getElementById("button4").innerHTML = `${Questions[0][i].correct_answer} `;
        document.getElementById("position").innerHTML = `${i}`;
    }
}
/**
 * loading the data out of the API from the <br>
 * pushing the data of the API to the global Varialbe Questions <br>
 * run  useDateofFetch() <br>
 * run  addHandler() <br>
 * show the startscreen of the application
 * @property {array} Category - the data of the API
 * @property {function} useDateofFetch
 * @property {function} addHandler 
 */

async function fetchAPI() {
    let category = [];
    try {
        category = await loadCategory();
    } catch (e) {
        console.log("Error" + e);
    }
    Questions.push(category.results);
    useDateofFetch();
    addHandler();
    document.getElementById("startscreen").style.display = "none";

}

/**
 * reload the page by changing the window location
 */

function restart() {
    window.location.href = "http://alexander-huxel.developerakademie.com/code/quiz/";
}

/**
 * change the innerHTML 
 * @return HTML code
 */

function endScreen() {
    return `<div id="end">
    <img id="svg" src="img/end.svg">
    <h1>You're done!</h1>
    <div id="data">
        <div id="q">
            <p id="trueq"></p>
            <p id="falseq"></p>
        </div>
        <p id="percent"></p>
        <button onclick="restart()"> Replay </button>
    </div>
</div>`

}
