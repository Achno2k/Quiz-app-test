import React, { useRef, useState, useEffect } from "react";
import './Quiz.css'
import { data } from "../../assets/data";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[0]);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);
    const Options = [Option1, Option2, Option3, Option4];

    useEffect(() => {
        setQuestion(data[index]);
        setCorrectAnswer(false);
    }, [index]);

    const checkAnswer = (e, ans) => {
        if (question.type === "mcq") {
            Options.forEach(option => {
                option.current.classList.remove("correct");
            });
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
                setCorrectAnswer(true);
            } else {
                alert("Incorrect answer. Try again.");
            }
        } else if (question.type === "subjective") {
            if (subjectiveAnswer.trim().toLowerCase() === question.ans.trim().toLowerCase()) {
                setScore(prev => prev + 1);
                setCorrectAnswer(true);
            } else {
                alert("Incorrect answer. Try again.");
            }
        }
    }

    const next = () => {
        if (correctAnswer) {
            if (index === data.length - 1) {
                setResult(true);
            } else {
                setIndex(index + 1);
                setSubjectiveAnswer("");
                Options.forEach(option => {
                    if (option.current) {
                        option.current.classList.remove("correct");
                    }
                });
            }
        }
    }

    const reset = () => {
        setIndex(0);
        setScore(0);
        setResult(false);
        setSubjectiveAnswer("");
        setCorrectAnswer(false);
    }

    const handleSubjectiveChange = (e) => {
        setSubjectiveAnswer(e.target.value);
    }

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result ? <>
                <h2>You scored {score} out of {data.length}</h2>
                <button onClick={reset}>Reset</button>
            </> : <>
                <h2>{index + 1}. <span dangerouslySetInnerHTML={{ __html: question.question }} /></h2>
                {question.type === "mcq" ? (
                    <ul>
                        <li ref={Option1} onClick={e => checkAnswer(e, 1)}>{question.options[0]}</li>
                        <li ref={Option2} onClick={e => checkAnswer(e, 2)}>{question.options[1]}</li>
                        <li ref={Option3} onClick={e => checkAnswer(e, 3)}>{question.options[2]}</li>
                        <li ref={Option4} onClick={e => checkAnswer(e, 4)}>{question.options[3]}</li>
                    </ul>
                ) : (
                    <div>
                        <textarea 
                            value={subjectiveAnswer}
                            onChange={handleSubjectiveChange}
                            placeholder="Type your answer here..."
                        />
                        <button onClick={() => checkAnswer(null, null)}>Submit</button>
                    </div>
                )}
                <button onClick={next} disabled={!correctAnswer}>Next</button>
                <div className="index">{index + 1} of {data.length} questions</div>
            </>}
        </div>
    )
}

export default Quiz;
