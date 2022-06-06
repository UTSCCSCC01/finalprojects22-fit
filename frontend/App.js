import React, { useState } from 'react';

export default function App() {
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


  global.results_plan = {
    'Gain weight/build muscle.Yes.<= 3 days/week.': 'plan1',
    'Lose weight/burn fat.Yes.<= 3 days/week.': 'plan2',
    'Improve Strength.Yes.<= 3 days/week.': 'plan3',
    'Improve Cardio.Yes.<= 3 days/week.' : 'plan4',
    'General Health.Yes.<= 3 days/week.' : 'plan5',
    'Gain weight/build muscle.No.<= 3 days/week.' : 'plan6',
    'Lose weight/burn fat.No.<= 3 days/week.' : 'plan7',
    'Improve Strength.No.<= 3 days/week.' : 'plan8',
    'Improve Cardio.No.<= 3 days/week.' : 'plan9',
    'General Health.No.<= 3 days/week.' : 'plan10',
    'Gain weight/build muscle.Yes.>4 days/week.' : 'plan11',
    'Lose weight/burn fat.Yes.>4 days/week.' : 'plan12',
    'Improve Strength.Yes.>4 days/week.' : 'plan13',
    'Improve Cardio.Yes.>4 days/week.' : 'plan14',
    'General Health.Yes.>4 days/week.' : 'plan15',
    'Gain weight/build muscle.No.>4 days/week.' : 'plan16',
    'Lose weight/burn fat.No.>4 days/week.' : 'plan17',
    'Improve Strength.No.>4 days/week.' : 'plan18',
    'Improve Cardio.No.>4 days/week.' : 'plan19',
    'General Health.No.>4 days/week.' : 'plan20'
  }

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  //const[plan, setPlan] = useState([]);

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
		<div className='app'>
			{showResult ? (
				<div className='result-section'>
          <div className='plan-section'>
            {results_plan.results}
            
          </div>
					Your Result: {results}
          <div><button onClick={() => restartSurvey()}>Restart Survey</button></div>
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