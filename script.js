let questions = [
  {
    question: "Wer hat HTML erfunder ?",
    answer_1: "Albert Einstein",
    answer_2: "Jean Paul II",
    answer_3: "Tim Berners-Lee",
    answer_4: "Albert Einstein",
    right_answer: 3,
  },
  {
    question: "Was bedeutet das HTML Tag &It; a&gt;?",
    answer_1: "Text Fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question: "Welche Sprache wird für die Gestaltung von Webseiten verwendet?",
    answer_1: "Java",
    answer_2: "Python",
    answer_3: "HTML",
    answer_4: "C++",
    right_answer: 3,
  },
  {
    question: "Was ist CSS?",
    answer_1: "Computer Science System",
    answer_2: "Cascading Style Sheet",
    answer_3: "Centralized Style System",
    answer_4: "Creative Styling Script",
    right_answer: 2,
  },
  {
    question: "Wer ist der Gründer von Microsoft?",
    answer_1: "Mark Zuckerberg",
    answer_2: "Bill Gates",
    answer_3: "Elon Musk",
    answer_4: "Steve Jobs",
    right_answer: 2,
  },
  {
    question:
      "Welche Programmiersprache wird für die App-Entwicklung in iOS verwendet?",
    answer_1: "Java",
    answer_2: "Swift",
    answer_3: "C#",
    answer_4: "Python",
    right_answer: 2,
  },
  {
    question: "Wer ist der Hauptgründer von Apple Inc.?",
    answer_1: "Steve Jobs",
    answer_2: "Bill Gates",
    answer_3: "Elon Musk",
    answer_4: "Mark Zuckerberg",
    right_answer: 1,
  },
  {
    question:
      "In welcher Sprache wird die Android-App-Entwicklung hauptsächlich durchgeführt?",
    answer_1: "Swift",
    answer_2: "Java",
    answer_3: "C++",
    answer_4: "Python",
    right_answer: 2,
  },
  {
    question: "Was ist ein Repository in Git?",
    answer_1: "Ein Lagerhaus",
    answer_2: "Ein Datenbank-Server",
    answer_3: "Ein Speicherort für Versionskontrolle",
    answer_4: "Ein Backup-Verzeichnis",
    right_answer: 3,
  },
  {
    question: "Was ist der DOM in Bezug auf Webentwicklung?",
    answer_1: "Document Object Model",
    answer_2: "Data Over Media",
    answer_3: "Digital Object Model",
    answer_4: "Domain Object Manager",
    right_answer: 1,
  },
];
/* audio Variable */
let audioSuccess = new Audio("audio/success.mp3");
let audioFail = new Audio("audio/fail.mp3");

/* globale Variable, für richtige Antwort */
let rightQuestions = 0;
/* globale Variable, um die aktuelle Frage zu verfolgen */
let currentQuestion = 0;

/* 1. Anzahl der Fragen insgesamt */
function init() {
  // Die Anzahl der Fragen wird im HTML-Element mit der ID "all-questions" angezeigt
  document.getElementById("all-questions").innerHTML = questions.length;

  // Die erste Frage wird angezeigt
  showQuestion();
}

/* 2. Funktion zum Anzeigen der aktuellen Frage */
function showQuestion() {
  if (currentQuestion >= questions.length) {
    // Show END Screen
    document.getElementById("endScreen").style = ""; //  <!-- quiz beendet -->
    document.getElementById("questionBody").style = "display: none";
    /* ergebnis zeigen  */
    document.getElementById("amount-of-questions").innerHTML = questions.length;
    document.getElementById("amount-of-right-questions").innerHTML =
      rightQuestions; //richtige Antwort
    document.getElementById("hearder-image").src = "./img/winner.jpg"; //Bild tauschen
  } else {
    // Show Question
    /* Progress Bar ( Prozent anrechnen )  */
    let percent = (currentQuestion + 1) / questions.length; // immer + 1 weil wir fangen bei 1 zu zahlen
    percent = Math.round(percent * 100);
    document.getElementById("progress-bar").innerHTML = `${percent} %`;
    document.getElementById("progress-bar").style = `width: ${percent}%`;

    console.log("Fortschritt:", percent);
    // Die aktuelle Frage wird aus dem Fragen-Array abgerufen
    let question = questions[currentQuestion];
    /* current page number  */
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    // Die Frage und die Antwortoptionen werden in die entsprechenden HTML-Elemente eingefügt

    document.getElementById("questiontext").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
  }
}

/* 3. Funktion zur Überprüfung der ausgewählten Antwort */

function answer(selection) {
  // Die aktuelle Frage wird aus dem Fragen-Array abgerufen
  let question = questions[currentQuestion];

  // Die ausgewählte Antwort wird in der Konsole ausgegeben
  console.log("Ausgewählte Antwort ist", selection);

  // Die Nummer der ausgewählten Antwort wird extrahiert (der letzte Buchstabe in der ID)
  let selectedQuestionNumber = selection.slice(-1);
  console.log("Nummer der ausgewählten Antwort ist", selectedQuestionNumber);

  // Die korrekte Antwort für die aktuelle Frage wird in der Konsole ausgegeben
  console.log("Richtige Antwort ist", question["right_answer"]);

  /* idOfRightAnswer (bei falsche Antwort, die richtige zeigen ) */
  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  // Überprüfung, ob die ausgewählte Antwort richtig ist
  if (selectedQuestionNumber == question["right_answer"]) {
    // Hinzufügen der Klasse "bg-success" für den Hintergrund (grüne Farbe) bei richtiger Antwort
    document.getElementById(selection).parentNode.classList.add("bg-success");
    audioSuccess.play(); //Audio success
    rightQuestions++; //richtige Antwort
  } else {
    console.log("Falsche Antwort!!!");

    // Hinzufügen der Klasse "bg-danger" für den Hintergrund (rote Farbe) bei falscher Antwort
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      /* idOfRightAnswer (bei falsche Antwort, die richtige zeigen ) */
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    audioFail.play(); // Audio fail
  }
  /*  <!--  enable button --> */
  document.getElementById("next-button").disabled = false;

  // Änderung der Textfarbe auf Weiß für die ausgewählte Antwort
  //document.getElementById(selection).style.color = "white";
}

/* button onclick nextQuestion */
function nextQuestion() {
  currentQuestion++; // z.B von 0 auf 1
  document.getElementById("next-button").disabled = true; //Buttons disabled
  resetAnswerButtons();
  showQuestion();
}
/* reset Button */
function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}
/* ----------------------------------------------------------- */
function restartGame() {
  document.getElementById("hearder-image").src = "./img/question.jpg"; //Bild tauschen
  document.getElementById("questionBody").style = ""; //wieder anzeigen
  document.getElementById("endScreen").style = "display: none"; //Endscreen ausblenden
  /* globale Variable, für richtige Antwort */
  rightQuestions = 0;
  /* globale Variable, um die aktuelle Frage zu verfolgen */
  currentQuestion = 0;
  init();
}
