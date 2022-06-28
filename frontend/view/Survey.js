import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
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
		<View>
			<View>
				<Text>FIT</Text>
				<Text>Survey</Text>
			</View>
			<View>
				{showResult ? 
				(<View> 
					<TouchableOpacity 
						style={styles.generalButton}
						onPress={() => restartSurvey()} >
						<Text  style={styles.generalButtonFont}> Restart Survey </Text>
					</TouchableOpacity > 
					<TouchableOpacity 
						style={styles.generalButton}
						onPress={() => setresult()} >
						<Text  style={styles.generalButtonFont}> Find Plan </Text>
					</TouchableOpacity > 
				</View>) :
				(
				<View>
					<View>
						<Text> Question {currentQuestion + 1} </Text>
						<Text> {questions[currentQuestion].questionText} </Text>
					</View>
					<View>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
						<TouchableOpacity
							style={styles.generalButton}
						  key = {answerOption.answerText}
							onPress={() => handleAnswerOptionClick(answerOption.answerText)} >
							<Text style={styles.generalButtonFont}> {answerOption.answerText} </Text>
						</TouchableOpacity>
						))}
					</View>
				</View>
				)}
			</View>
		</View>

	);
}

