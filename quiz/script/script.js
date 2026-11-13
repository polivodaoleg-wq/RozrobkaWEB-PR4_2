
document.addEventListener("DOMContentLoaded", () => {

    'use strict';
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    let questions = [];
    let numberQuestion = 0;

    const getData = () => {
        formAnswers.textContent = "Завантаження...";
        fetch('./questions.json')
            .then(res => res.json())
            .then(obj => {
                questions = obj.questions;
                playTest();
            });
    };

    btnOpenModal.addEventListener("click", () => {
        modalBlock.classList.add("d-block");
        getData();
    });

    closeModal.addEventListener("click", () => {
        modalBlock.classList.remove("d-block");
    });

    const playTest = () => {

        numberQuestion = 0;
        const renderAnswers = (index) => {

            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement("div");
                answerItem.classList.add("answers-item", "d-flex", "flex-column");
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" 
                    id="${answer.title}" 
                    name="answer" 
                    value="${answer.title}" 
                    class="d-none">

                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span>${answer.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            });
        };

        const renderQuestions = (indexQuestion) => {

            questionTitle.textContent = questions[indexQuestion].question;
            formAnswers.innerHTML = "";
            renderAnswers(indexQuestion);
            if (numberQuestion === 0) { prevButton.style.display = "none"; }
            else { prevButton.style.display = "block"; }
            if (numberQuestion === questions.length - 1) { nextButton.style.display = "none"; }
            else { nextButton.style.display = "block"; }
        };

        renderQuestions(numberQuestion);
        prevButton.onclick = () => {

            if (numberQuestion > 0) {
                numberQuestion--;
                renderQuestions(numberQuestion);
            }
        };
        nextButton.onclick = () => {

            if (numberQuestion < questions.length - 1) {
                numberQuestion++;
                renderQuestions(numberQuestion);
            }
        };
    };
});
