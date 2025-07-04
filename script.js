// Quotes for typing
const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "Keep calm and type on.",
  "Code is poetry in motion.",
  "Practice makes progress."
];

let startTime = null;
let currentQuote = "";

// Load a new quote and prepare UI
function startTest() {
  const quoteElement = document.getElementById("quote");
  const input = document.getElementById("input");
  const result = document.getElementById("result");

  // Pick a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];

  // Clear previous content
  input.value = "";
  result.innerText = "";
  startTime = new Date();

 // Render quote letter-by-letter in spans
  quoteElement.innerHTML = "";
  currentQuote.split("").forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    quoteElement.appendChild(span);
  });
}

// Real-time character comparison while typing
document.getElementById("input").addEventListener("input", () => {
  const quoteSpans = document.querySelectorAll("#quote span");
  const typedText = document.getElementById("input").value;

  typedText.split("").forEach((char, index) => {
    const targetChar = quoteSpans[index];

    if (!targetChar) return;

    if (char === targetChar.innerText) {
      targetChar.classList.add("correct");
      targetChar.classList.remove("incorrect");
    } else {
      targetChar.classList.add("incorrect");
      targetChar.classList.remove("correct");
    }
  });

  // Clear extra coloring if user deletes
  for (let i = typedText.length; i < quoteSpans.length; i++) {
    quoteSpans[i].classList.remove("correct", "incorrect");
  }
});

// When "Show Result" is clicked
function showResult() {
  const inputText = document.getElementById("input").value;
  const totalTime = (new Date() - startTime) / 1000; // in seconds
  const totalWords = inputText.trim().split(/\s+/).length;
  const wpm = Math.round((totalWords / totalTime) * 60);

  // Accuracy calculation
  let correctChars = 0;
  for (let i = 0; i < inputText.length && i < currentQuote.length; i++) {
    if (inputText[i] === currentQuote[i]) {
      correctChars++;
    }
  }

  const accuracy = ((correctChars / currentQuote.length) * 100).toFixed(2);

  // Display result
  document.getElementById("result").innerHTML = `
    <p><strong>Time Taken:</strong> ${totalTime.toFixed(2)} seconds</p>
    <p><strong>Typing Speed:</strong> ${wpm} WPM</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
  `;
}

window.onload = startTest;


