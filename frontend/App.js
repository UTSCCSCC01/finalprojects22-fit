import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default function App() {
  
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
    
		<div className='app'>
      <h1>FIT</h1>
      <h2>Survey</h2>
			{showResult ? (
        
				<div className='result-section'>
					<h2>Your Input: {results}</h2>
          {/* <h2>Your Plan: {results_plan}</h2> */}
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
