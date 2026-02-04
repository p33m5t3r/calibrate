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
    <>
    <div className="flex flex-col border">
      <div className="text-4xl">
        {question.displayText}
      </div>
        <br></br>
      <div className="flex flex-row">
        <label>
          <input 
            className="text-4xl w-32 text-center"
            onChange={e => onAnswerChange({...answer, coeff: Number(e.target.value)})}
            name="coeffInput"
            type='number'
            min="0"
            max="10"
            step="0.25"
            value={answer.coeff}
          />
        </label>
        <div className="text-4xl"> * 10^ </div>
        <label>
          <input 
            className="text-4xl w-32 text-center"
            onChange={e => onAnswerChange({...answer, exp: Number(e.target.value)})}
            name="expInput"
            type='number'
            min="0"
            max="20"
            step="1"
            value={answer.exp}
          />
        </label>
        <br></br>
        <div className="text-xl"> {answerToEnglish(answer.exp, answer.coeff)} </div>
      </div>
    </div>
    </>
  )
}


type NavButtonProps = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  selfIndex: number;
  answers: Record<number, Answer>;
};

function NavButton({currentIndex, setCurrentIndex, selfIndex, answers}: NavButtonProps) {
  let style = '';
  const isAnswered = answers[selfIndex] !== undefined;
  const isActive = currentIndex === selfIndex;
  if (isActive) {
    style = 'bg-blue-500 text-white border-blue-600';
  } else if (isAnswered) {
    style = 'bg-green-100 text-green-800 border-green-300';
  } else {
    style = 'bg-gray-100 text-gray-600 border-gray-300'
  }
  return(
    <button 
      onClick={() => {setCurrentIndex(selfIndex)}}
      className={`w-10 h-10 border-2 rounded ${style} hover:opacity-80 transition-opacity`}
    >
      {selfIndex}
    </button> 
  );
}

function Result({question, userAnswer}: {question: Question, userAnswer: Answer}) {
  const oomDiff = Math.abs(question.exp - userAnswer.exp)
  const remark = oomDiff === 0 ? "nice!" : "yikes!";

  return (
    <div className="border">
      {question.displayText}
      <br></br>
      You answered: {userAnswer.coeff} * 10^{userAnswer.exp}
      Actual: {question.coeff} * 10^{question.exp}
      You were off by {oomDiff} orders of magnitude. {remark}
    </div>
  );
}

function Results({answers, defaultAnswer}: {answers: Record<number, Answer>, defaultAnswer: Answer}) {
  return (
  <div>
    {questions.map((q, i) => { 
      const answer = answers[i] ?? defaultAnswer;
      return (<Result key={q.id} question={q} userAnswer={answer}/>);
    })}
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
    <div className="flex flex-row justify-center">
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
  if (isSubmitted) {
    return (
      <div className="flex flex-row justify-center">
        <button onClick={handleReset}>reset</button>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center">
      {currentIndex > 0 &&
        <button onClick={() => setCurrentIndex(currentIndex - 1)}>prev</button>
      }
      {currentIndex < questions.length - 1 &&
        <button onClick={() => setCurrentIndex(currentIndex + 1)}>next</button>
      }
      {submitReady &&
        <button onClick={handleSubmit}>finish!</button>
      }
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
    <div className="flex flex-col items-center justify-center h-full">
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




