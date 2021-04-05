

// CONFIG
let Questions = [];
let True = 0;
let False = 0;
let i = 0;
// CONFIG
// Eventlisteners
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
// Eventlisteners



let list = ['<button class="button" id="button1"></button>', '<button class="button" id="button2"></button>', '<button class="button" id="button3"></button>', '<button   id="button4"></button>']
list = list.sort(() => Math.random() - 0.5)


function init() {
    drawQuiz();
}


function drawQuiz() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("answer").innerHTML = `${list[0]}${list[1]}${list[2]}${list[3]}`;
    }
    document.getElementById("question").innerHTML = `${Questions}`
}

async function loadCategory() {
    let selectorOne = document.getElementById("cat").selectedIndex;
    let selectorTwo = document.getElementById("dif").selectedIndex;
    let Category = document.getElementById("cat").options[selectorOne].value;
    let Difficulty = document.getElementById("dif").options[selectorTwo].value;
    const response = await fetch(`https://opentdb.com/api.php?amount=16&category=${Category}&difficulty=${Difficulty}&type=multiple`);
    const category = await response.json();
    return category
}




function useDateofFetch() {
    console.log(Questions[0])
    document.getElementById("headline").innerHTML = `${Questions[0][i].category}`
    document.getElementById("finish").innerHTML = `${Questions[0].length - 1}`;
    document.getElementById("question").innerHTML = `${Questions[0][i].question} `;
    document.getElementById("button1").innerHTML = `${Questions[0][i].incorrect_answers[0]} `;
    document.getElementById("button2").innerHTML = `${Questions[0][i].incorrect_answers[1]} `;
    document.getElementById("button3").innerHTML = `${Questions[0][i].incorrect_answers[2]} `;
    document.getElementById("button4").innerHTML = `${Questions[0][i].correct_answer} `;
    document.getElementById("position").innerHTML = `${i}`;
}

function nextQuestion() {
    if (i == 15) {
        document.getElementById("body").innerHTML = endScreen();
        document.getElementById("trueq").innerHTML = "Right Answers: " + True;
        document.getElementById("falseq").innerHTML = "Wrong Answers: " + False;
        document.getElementById("percent").innerHTML = `${100 / 15 * True} % `;
    } else {
        i++;
        document.getElementById("question").innerHTML = `${Questions[0][i].question} `;
        document.getElementById("button1").innerHTML = `${Questions[0][i].incorrect_answers[0]} `;
        document.getElementById("button2").innerHTML = `${Questions[0][i].incorrect_answers[1]} `;
        document.getElementById("button3").innerHTML = `${Questions[0][i].incorrect_answers[2]} `;
        document.getElementById("button4").innerHTML = `${Questions[0][i].correct_answer} `;
        document.getElementById("position").innerHTML = `${i}`;
        console.log(i)
    }
}


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



function restart() {
    window.location.href = "http://alexander-huxel.developerakademie.com/code/quiz/";
}

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
