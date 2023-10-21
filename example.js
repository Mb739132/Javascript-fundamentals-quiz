var rootEl = document.body;

var questionArr = [
  {
    question: "What is this question?",
    answer: "a question",
    choiceA: "an answer",
    choiceB: "a question"
  }
]
var q = 0;
function showQuestion(){
  console.log(questionArr[q]);
}
showQuestion();