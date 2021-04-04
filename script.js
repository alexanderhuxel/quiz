

// CONFIG
const Categorys = [
    {
        category: "film",
        difficult:
        {
            "easy": "https://opentdb.com/api.php?amount=50&category=11&difficulty=easy&type=multiple",
            "medium": "https://opentdb.com/api.php?amount=50&category=11&difficulty=medium&type=multiple",
            "hard": "https://opentdb.com/api.php?amount=50&category=11&difficulty=hard&type=multiple",
        },
        category: "music",
        difficult:
        {
            "easy": "https://opentdb.com/api.php?amount=50&category=12&difficulty=easy&type=multiple",
            "medium": "https://opentdb.com/api.php?amount=50&category=12&difficulty=medium&type=multiple",
            "hard": "https://opentdb.com/api.php?amount=50&category=12&difficulty=hard&type=multiple",
        },
        category: "history",
        difficult:
        {
            "easy": "https://opentdb.com/api.php?amount=50&category=23&difficulty=easy&type=multiple",
            "medium": "https://opentdb.com/api.php?amount=50&category=23&difficulty=medium&type=multiple",
            "hard": "https://opentdb.com/api.php?amount=50&category=23&difficulty=hard&type=multiple",
        }
    }
]

let Link = "";
let Questions = [];
let True = 0;
let False = 0;
let i = 0;

// CONFIG
// Eventlisteners
function addHandler() {
    document.getElementById("button4").addEventListener("click", () => {
        True++;
        nextQuestion();
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

function sendCategory() {
    let selectorOne = document.getElementById("cat").selectedIndex;
    let selectorTwo = document.getElementById("dif").selectedIndex;
    let Cat = document.getElementById("cat").options[selectorOne].value;
    let Dif = document.getElementById("dif").options[selectorTwo].value;
    if (Cat == "music" && Dif == "easy") {
        Link == Categorys[0].difficult.easy
        document.getElementById("startscreen").style.display = "none"
    }

}

function drawQuiz() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("answer").innerHTML = `${list[0]}${list[1]}${list[2]}${list[3]}`;
    }
    document.getElementById("question").innerHTML = `${Questions}`
}

async function loadCategory() {
    const response = await fetch(Categorys[0].difficult.hard);
    const category = await response.json();
    return category
}




function useDateofFetch() {
    document.getElementById("finish").innerHTML = `${Questions.length - 2}`;
    document.getElementById("question").innerHTML = `${Questions[i].question} `;
    document.getElementById("button1").innerHTML = `${Questions[i].incorrect_answers[0]} `;
    document.getElementById("button2").innerHTML = `${Questions[i].incorrect_answers[1]} `;
    document.getElementById("button3").innerHTML = `${Questions[i].incorrect_answers[2]} `;
    document.getElementById("button4").innerHTML = `${Questions[i].correct_answer} `;
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
        document.getElementById("question").innerHTML = `${Questions[i].question} `;
        document.getElementById("button1").innerHTML = `${Questions[i].incorrect_answers[0]} `;
        document.getElementById("button2").innerHTML = `${Questions[i].incorrect_answers[1]} `;
        document.getElementById("button3").innerHTML = `${Questions[i].incorrect_answers[2]} `;
        document.getElementById("button4").innerHTML = `${Questions[i].correct_answer} `;
        document.getElementById("position").innerHTML = `${i}`;
        console.log(i)
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    let category = [];
    try {
        category = await loadCategory();
    } catch (e) {
        console.log("Error" + e);
    }
    for (let i = 0; i < 16; i++) {
        Questions.push(category.results[i])
    }
    Questions.push(category);
    useDateofFetch();
    addHandler();

})


function restart() {
    window.location.href = "/";
}

function endScreen() {
    return `<div id="end">
    <img id="svg" src="../img/end.svg">
    <h1>You're done!</h1>
    <div id="data">
        <div id="q">
            <p id="trueq">12</p>
            <p id="falseq">4</p>
        </div>
        <p id="percent">20%</p>
        <button onclick="restart()"> Replay </button>
    </div>
</div>`

}
