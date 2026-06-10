import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'Quais sao as duas principais coisas que precisa garantir estar bem para a Jaqueline nao ficar bicudinha?',
    options: [
      { text: 'Um beijinho e um abraco longo', correct: false },
      { text: 'Um lanchinho e umas horas de sono', correct: true },
      { text: 'Ambientes organizados, limpos e cheirosos', correct: false },
    ],
  },
  {
    id: 2,
    text: 'Quantas personalidades da Jaqueline o Luiz Felipe precisa aprender a lidar?',
    options: [
      { text: '2 personalidades: a com fome e a com sono', correct: false },
      { text: '7 personalidades, uma para cada dia da semana', correct: false },
      { text: 'Nao faz pergunta dificil, depende do dia', correct: true },
    ],
  },
  {
    id: 3,
    text: 'Te amo, sabia?',
    options: [
      { text: 'Eu sei, tambem', correct: true },
      { text: 'Tambem te amo, meu amorzinho', correct: false },
      { text: 'Que pena, dorme que passa', correct: false },
    ],
  },
];

export default function QuizStep({ onNext }) {
  const [answers, setAnswers] = useState({});

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const selectOption = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  return (
    <div className="step-container">
      <div className="quiz">
        <h1 className="quiz-title">Hora de um quiz! 💕</h1>

        {questions.map((q) => (
          <div key={q.id} className="quiz-question" id={`quiz-question-${q.id}`}>
            <p className="quiz-question-text">{q.text}</p>
            <div className="quiz-options">
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === i;
                const isCorrectHighlight = isSelected && opt.correct;

                return (
                  <button
                    key={i}
                    className={`quiz-option ${isSelected ? 'selected' : ''} ${isCorrectHighlight ? 'correct' : ''}`}
                    onClick={() => selectOption(q.id, i)}
                    id={`quiz-option-${q.id}-${i}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button
          className="btn-advance"
          disabled={!allAnswered}
          onClick={onNext}
          id="quiz-advance-btn"
        >
          Avancar →
        </button>
      </div>
    </div>
  );
}
