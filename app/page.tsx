'use client'
import { useState } from 'react';
import { questions, type Answer, type Question } from './data/questions';

type QuestionProps = {
  question: Question,
  answer: Answer,
  onAnswerChange: (a: Answer) => void;
}

function answerToEnglish(oom: number, coeff: number): string {
  let word = ' ';
  const n = oom % 3;
  switch (Math.floor(oom / 3)) {
    case 1: word = ' thousand'; break;
    case 2: word = ' million'; break;
    case 3: word = ' billion'; break;
    case 4: word = ' trillion'; break;
    case 5: word = ' quadrillion'; break;
    default: break;
  }
  const value = (10**n) * coeff;
  return `${value}${word}`
}

function Question({question, answer, onAnswerChange}: QuestionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4 w-full max-w-lg">
      <div className="text-2xl sm:text-3xl font-medium text-center mb-6">
        {question.displayText}
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row items-center gap-2">
          <input
            className="text-2xl sm:text-3xl w-20 sm:w-28 text-center border border-gray-300 rounded p-1"
            onChange={e => onAnswerChange({...answer, coeff: Number(e.target.value)})}
            name="coeffInput"
            type='number'
            min="0"
            max="10"
            step="0.25"
            value={answer.coeff}
          />
          <span className="text-2xl sm:text-3xl">* 10^</span>
          <input
            className="text-2xl sm:text-3xl w-20 sm:w-28 text-center border border-gray-300 rounded p-1"
            onChange={e => onAnswerChange({...answer, exp: Number(e.target.value)})}
            name="expInput"
            type='number'
            min="0"
            max="17"
            step="1"
            value={answer.exp}
          />
        </div>
        <div className="text-lg italic text-[var(--muted)] mt-2">
          {answerToEnglish(answer.exp, answer.coeff)}
        </div>
      </div>
    </div>
  )
}


type NavButtonProps = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  selfIndex: number;
  answers: Record<number, Answer>;
};

function NavButton({currentIndex, setCurrentIndex, selfIndex, answers}: NavButtonProps) {
  const isAnswered = answers[selfIndex] !== undefined;
  const isActive = currentIndex === selfIndex;

  let style = 'bg-white text-gray-600 border-gray-200';
  if (isActive) {
    style = 'bg-[var(--accent)] text-white border-[var(--accent)]';
  } else if (isAnswered) {
    style = 'bg-[var(--muted)]/20 text-[var(--muted)] border-[var(--muted)]/30';
  }

  return (
    <button
      onClick={() => setCurrentIndex(selfIndex)}
      className={`w-10 h-10 border-2 rounded-lg font-medium ${style} hover:opacity-80 transition-all`}
    >
      {selfIndex + 1}
    </button>
  );
}

function Result({question, userAnswer}: {question: Question, userAnswer: Answer}) {
  const oomDiff = Math.abs(question.exp - userAnswer.exp);
  const isCorrect = oomDiff === 0;
  const isClose = oomDiff === 1;

  let statusColor = 'text-red-500';
  let statusText = `Off by ${oomDiff} orders of magnitude`;
  if (isCorrect) {
    statusColor = 'text-[var(--accent)]';
    statusText = 'Correct order of magnitude!';
  } else if (isClose) {
    statusColor = 'text-yellow-600';
    statusText = 'Off by 1 order of magnitude';
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
      <div className="font-medium text-lg mb-2">{question.displayText}</div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-[var(--muted)]">Your answer:</span>
          <div className="font-mono">{userAnswer.coeff} * 10^{userAnswer.exp}</div>
        </div>
        <div>
          <span className="text-[var(--muted)]">Actual:</span>
          <div className="font-mono">{question.coeff} * 10^{question.exp}</div>
        </div>
      </div>
      <div className={`mt-2 font-medium ${statusColor}`}>
        {statusText}
      </div>
    </div>
  );
}

function Results({answers, defaultAnswer}: {answers: Record<number, Answer>, defaultAnswer: Answer}) {
  const totalQuestions = questions.length;
  const correctCount = questions.filter((q, i) => {
    const answer = answers[i] ?? defaultAnswer;
    return Math.abs(q.exp - answer.exp) === 0;
  }).length;

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 text-center">
        <div className="text-2xl font-bold mb-1">Results</div>
        <div className="text-4xl font-bold text-[var(--accent)]">{correctCount}/{totalQuestions}</div>
        <div className="text-[var(--muted)] text-sm">correct order of magnitude</div>
      </div>
      <div>
        {questions.map((q, i) => {
          const answer = answers[i] ?? defaultAnswer;
          return <Result key={q.id} question={q} userAnswer={answer} />;
        })}
      </div>
    </div>
  );
}

type NavProps = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  answers: Record<number, Answer>;
};

function Nav({ currentIndex, setCurrentIndex, answers }: NavProps) {
  return (
    <div className="flex flex-row justify-center gap-2">
      {questions.map(q => (
        <NavButton
          key={q.id}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          selfIndex={q.id}
          answers={answers}
        />
      ))}
    </div>
  );
}

type ControlsProps = {
  isSubmitted: boolean;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  submitReady: boolean;
  handleSubmit: () => void;
  handleReset: () => void;
};

function Controls({
  isSubmitted,
  currentIndex,
  setCurrentIndex,
  submitReady,
  handleSubmit,
  handleReset,
}: ControlsProps) {
  const buttonStyle = "px-4 py-2 rounded-lg font-medium transition-all hover:opacity-80";
  const primaryButton = `${buttonStyle} bg-[var(--accent)] text-white`;
  const secondaryButton = `${buttonStyle} bg-white text-gray-600 border border-gray-200`;

  if (isSubmitted) {
    return (
      <div className="flex flex-row justify-center mt-6">
        <button onClick={handleReset} className={primaryButton}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center gap-3 mt-4">
      {currentIndex > 0 && (
        <button onClick={() => setCurrentIndex(currentIndex - 1)} className={secondaryButton}>
          Prev
        </button>
      )}
      {currentIndex < questions.length - 1 && (
        <button onClick={() => setCurrentIndex(currentIndex + 1)} className={primaryButton}>
          Next
        </button>
      )}
      {submitReady && (
        <button onClick={handleSubmit} className={primaryButton}>
          Finish
        </button>
      )}
    </div>
  );
}

type QuestionsProps = {
  answers: Record<number, Answer>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  defaultAnswer: Answer;
  handleAnswerChange: (a: Answer) => void;
};

function Questions({
  answers,
  currentIndex,
  setCurrentIndex,
  defaultAnswer,
  handleAnswerChange,
}: QuestionsProps) {

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || defaultAnswer;

  return (
    <>
      <Nav currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} answers={answers} />
      <Question
        question={currentQuestion}
        answer={currentAnswer}
        onAnswerChange={handleAnswerChange}
      />
    </>
  );
}


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [isSubmitted, setSubmitted] = useState(false);

  const defaultAnswer = { exp: 6, coeff: 1};
  const submitReady 
    = currentIndex + 1 === questions.length 
    || Object.keys(answers).length == questions.length;

  const handleAnswerChange = (newAnswer: Answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: newAnswer,
    }));
  };

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8">
      {isSubmitted ? (
        <Results answers={answers} defaultAnswer={defaultAnswer} />
      ) : (
        <Questions
          answers={answers}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          defaultAnswer={defaultAnswer}
          handleAnswerChange={handleAnswerChange}
        />
      )}
      <Controls
        isSubmitted={isSubmitted}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        submitReady={submitReady}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
      />
    </div>
  );
}




