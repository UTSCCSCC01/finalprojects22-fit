import React, { useState } from 'react';
import { globalVar_results } from './global';
import { globalVar_colorTheme } from './global';
import { Text, View, Button} from 'react-native';

export function OptionalSurvey ({navigation}) {
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
		navigation.navigate('Plan Recommendation');
	}

	return (
		<View style={{backgroundColor: globalVar_colorTheme.colorTheme}}>
		
		    {showResult ? (
						<View>
							{/* <h2><button onClick={() => restartSurvey()}>Restart Survey</button></h2>
							<h2><button onClick={() => setresult()}>Find Plan</button></h2> */}
							<Button 
                                title="Restart Survey" 
                                onPress={()=>restartSurvey()}>
							</Button>
							<Button 
                                title="Find Plan" 
                                onPress={()=>setresult()}>
							</Button>
						</View>
	
					) : (
						<View>
							<Text>
							  Question {currentQuestion + 1}
							</Text>
							<Text>
							  {questions[currentQuestion].questionText}
							</Text>
							<Text>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
									// <button onClick={() => handleAnswerOptionClick(answerOption.answerText)}>{answerOption.answerText}</button>
									<Button 
                                      title={answerOption.answerText} 
                                      onPress={()=>handleAnswerOptionClick(answerOption.answerText)}>
							        </Button>
								))}
							</Text>
						</View>
					)}
		</View>
		
	);
};