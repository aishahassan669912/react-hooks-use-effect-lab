import React, { useEffect } from "react";

function Question({ question, timeRemaining, setTimeRemaining, onAnswered }) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered(false);         // Mark as unanswered
      setTimeRemaining(10);      // Reset timer for next question
      return;                    // Stop further timeout if time is up
    }

    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Cleanup function to clear the timer before next effect runs
    return () => clearTimeout(timer);
  }, [timeRemaining, setTimeRemaining, onAnswered]);

  return (
    <div>
      <h2>{question.prompt}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => onAnswered(index === question.correctIndex)}>
              {answer}
            </button>
          </li>
        ))}
      </ul>
      <p>{timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;
