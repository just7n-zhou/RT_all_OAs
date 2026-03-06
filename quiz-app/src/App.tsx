import { useState, useEffect } from "react";
import "./App.css";
import { questions } from "./data/questions";

function App() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const current = questions[step];

  useEffect(() => {
    if (isSubmitted && step < questions.length - 1) {
      const timer = setTimeout(handleNext, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleSubmit = () => {
    if (!selected) return;
    
    const isCorrect = selected === current.correct;
    if (isCorrect) setScore(prev => prev + 1); 
    setIsSubmitted(true);

    if (step === questions.length - 1) {
      setShowResults(true);
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
    setSelected(null); 
    setIsSubmitted(false);
  };

  if (showResults) {
    return (
      <div className="container">
        <h2>{`Quiz Complete! You scored ${score} out of ${questions.length}!`}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="question">
        <h2>{current.question}</h2>
        <div className="options">
          {current.options.map((option, index) => (
            <div key={option} className="option-item">
              <input
                type="radio"
                name="quiz-options"
                id={`option${index + 1}`} 
                checked={selected === option}
                onChange={() => setSelected(option)}
                disabled={isSubmitted}
              />
              <label htmlFor={`option${index + 1}`}>{option}</label>
            </div>
          ))}
        </div>

        {!isSubmitted ? (
          <button className="button" onClick={handleSubmit} disabled={!selected}>
            Submit
          </button>
        ) : (
          <button className="button" onClick={handleNext}>Next</button>
        )}

        {isSubmitted && (
          <p className="feedback">
            {selected === current.correct ? "Correct!" : "Incorrect!"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;