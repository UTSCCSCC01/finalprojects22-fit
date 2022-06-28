import React, { useState } from 'react';
import './SurveyFormat.css';
import { globalVar_results } from './global';

export function Survey ({navigation}) {
	
	const questions = [
		{
			questionText: 'What is your primary fitness goal?',
			answerOptions: [
				{ answerText: 'Gain weight/build muscle'},
				{ answerText: 'Lose weight/burn fat'},
				{ answerText: 'Improve Strength'},
				{ answerText: 'Improve Cardio'},
                { answerText: 'General Health'},
			],
		},
		{
			questionText: 'Will you have access to gym equipment?',
			answerOptions: [
				{ answerText: 'Yes'},
				{ answerText: 'No'},
			],
		},
		{
			questionText: 'How many days per week would you prefer to work-out?',
			answerOptions: [
				{ answerText: 'less than or equal to 3 days per week'},
				{ answerText: 'more than 4 days per week'},
			],
		},
	];
    // for switching between survey questions
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showResult, setShowResult] = useState(false);
    const [results, setResults] = useState("");


	const restartSurvey = () => {
		setCurrentQuestion(0);
		setShowResult(false);
		setResults([]);
	 };

	const handleAnswerOptionClick = (answerText) => {
		setResults(oldArray => [...oldArray, answerText]);
		// result.push(answerText);
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowResult(true);
		}
	};
    
	// set global var & navigate to plan
	const setresult = () => {
		globalVar_results.results = results.toString();
		navigation.navigate('Plan');
	}

	return (
      <div className='Survey'>
         <h1>FIT</h1>
         <h2>Survey</h2>
			{showResult ? (
				<div className='result-section'>
					<h2><button onClick={() => restartSurvey()}>Restart Survey</button></h2>
					<h2><button onClick={() => setresult()}>Find Plan</button></h2>
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

