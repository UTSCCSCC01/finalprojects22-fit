import React, { useState } from 'react';
//import './App.css';
//import { ResultPlan } from './components/ResultPlan';

export function Survey() {
	const questions = [
		{
			questionText: 'What is your primary fitness goal?',
			answerOptions: [
				{ answerText: 'Gain weight/build muscle.'},
				{ answerText: 'Lose weight/burn fat.'},
				{ answerText: 'Improve Strength.'},
				{ answerText: 'Improve Cardio.'},
        { answerText: 'General Health.'},
			],
		},
		{
			questionText: 'Will you have access to gym equipment?',
			answerOptions: [
				{ answerText: 'Yes.'},
				{ answerText: 'No.'},
			],
		},
		{
			questionText: 'How many days per week would you prefer to work-out?',
			answerOptions: [
				{ answerText: '<= 3 days/week.'},
				{ answerText: '>4 days/week'},
			],
		},
	];

   /* Resets the game back to default */
   const restartSurvey = () => {
       setCurrentQuestion(0);
       setShowResult(false);
       setResults([]);
    };

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showResult, setShowResult] = useState(false);
    const [results, setResults] = useState([]);

	const handleAnswerOptionClick = (answerText) => {
		setResults(oldArray => [...oldArray, answerText]);
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowResult(true);
		}
	};

	return (
      <div className='Survey'>
      <h1>FIT</h1>
      <h2>Survey</h2>
			{showResult ? (
				<div className='result-section'>
					<h1>your Input: {results}</h1>
          <h2><button onClick={() => restartSurvey()}>Restart Survey</button></h2>
				</div>
        
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.answerText)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}