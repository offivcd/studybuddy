
let flashcards = [];
let currentCardIndex = 0;

function saveSetToLocal() {
    localStorage.setItem('flashcardSet', JSON.stringify(flashcards));
}

function loadSetFromLocal() {
    const savedSet = localStorage.getItem('flashcardSet');
    if (savedSet) {
        flashcards = JSON.parse(savedSet);
        alert("Set loaded from local storage!");
    } else {
        alert("No saved set found in local storage.");
    }
}

function loadSet() {
    const fileInput = document.getElementById("fileInput");
    const jsonInput = document.getElementById("jsonInput").value;
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            flashcards = JSON.parse(e.target.result);
            saveSetToLocal();
            alert("Set loaded from file and saved to local storage!");
        };
        reader.readAsText(fileInput.files[0]);
    } else if (jsonInput) {
        flashcards = JSON.parse(jsonInput);
        saveSetToLocal();
        alert("Set loaded from text area and saved to local storage!");
    } else {
        alert("Please upload a JSON file or paste JSON into the box.");
    }
}

function startFlashcards() {
    loadSetFromLocal();
    if (flashcards.length === 0) return alert("Load a set first.");
    currentCardIndex = 0;
    showFlashcard();
}

function showFlashcard() {
    const card = flashcards[currentCardIndex];
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<div class="card" onclick="flipCard()">${card.question}</div>`;
}

function flipCard() {
    const card = flashcards[currentCardIndex];
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<div class="card" onclick="nextCard()">${card.answer}</div>`;
}

function nextCard() {
    currentCardIndex++;
    if (currentCardIndex >= flashcards.length) {
        document.getElementById("content").innerHTML = "End of flashcards.";
    } else {
        showFlashcard();
    }
}

function startMatching() {
    loadSetFromLocal();
    if (flashcards.length === 0) return alert("Load a set first.");
    const shuffled = [...flashcards].sort(() => 0.5 - Math.random());
    const contentDiv = document.getElementById("content");
    const pairs = [];
    shuffled.forEach((card) => {
        pairs.push(`<div class="card" onclick="checkMatch(this, '${card.question}', true)">${card.question}</div>`);
        pairs.push(`<div class="card" onclick="checkMatch(this, '${card.question}', false)">${card.answer}</div>`);
    });
    contentDiv.innerHTML = pairs.sort(() => 0.5 - Math.random()).join("");
}

let firstCard = null;
let firstKey = "";

function checkMatch(element, key, isQuestion) {
    if (!firstCard) {
        firstCard = element;
        firstKey = key;
        element.style.backgroundColor = "#374151";
    } else {
        if (firstKey === key && firstCard !== element) {
            firstCard.style.backgroundColor = "#10b981";
            element.style.backgroundColor = "#10b981";
            firstCard = null;
            firstKey = "";
        } else {
            firstCard.style.backgroundColor = "#1e293b";
            firstCard = null;
            firstKey = "";
        }
    }
}
