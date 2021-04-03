

// CONFIG
const Categorys = [
    "https://opentdb.com/api.php?amount=50&category=11&type=multiple",
    "https://opentdb.com/api.php?amount=50&category=12&type=multiple",
    "https://opentdb.com/api.php?amount=50&category=23&type=multiple"
]
let Questions = [];



// CONFIG



function init() {
    drawQuiz();
    console.log(Questions)
}

function drawQuiz() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("answer").innerHTML += `
        <button class="button" id="button${Math.floor(Math.random() * 4) + 1}"></button>
        `
    }
    document.getElementById("question").innerHTML = `${Questions}`
}

async function loadCategory() {
    const response = await fetch(Categorys[0]);
    const category = await response.json();
    return category
}

document.addEventListener("DOMContentLoaded", async () => {
    let category = [];
    try {
        category = await loadCategory();
    } catch (e) {
        console.log("Error");
        console.log(e);
    }
    category.results.values[0]
    for (let i = 0; i < 15; i++) {
    }
    console.log(category.results)
    document.getElementById("question").innerHTML = `${category.results[0].question}`
    document.getElementById("button1").innerHTML = `${category.results[0].incorrect_answers[0]}`
    document.getElementById("button2").innerHTML = `${category.results[0].incorrect_answers[1]}`
    document.getElementById("button3").innerHTML = `${category.results[0].incorrect_answers[2]}`
    document.getElementById("button4").innerHTML = `${category.results[0].correct_answer}`





})



