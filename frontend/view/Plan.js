import axios from 'axios';
import React, { useState } from 'react';
import { globalVar_results } from './global';

export const Plan = () => {
  const [plan, setPlan] = useState("");

  // data req
  const getPlan = async (planId) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/plans/'.concat(planId),
      );
      setPlan(response.data.data.planContent);
      
    } catch (error) {
      // handle error
    }
  };
  
  // trigger req
  switch(globalVar_results.results) {
    case "Gain weight/build muscle,Yes,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p1"); }, [])
      break;
    case "Lose weight/burn fat,Yes,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p2"); }, [])
      break;
    case "Improve Strength,Yes,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p3"); }, [])
      break;
    case "Improve Cardio,Yes,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p4"); }, [])
      break;
    case "General Health,Yes,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p5"); }, [])
      break;
    case "Gain weight/build muscle,No,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p6"); }, [])
      break;
    case "Lose weight/burn fat,No,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p7"); }, [])
      break;
    case "Improve Strength,No,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p8"); }, [])
      break;
    case "Improve Cardio,No,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p9"); }, [])
      break;
    case "General Health,No,less than or equal to 3 days per week":
      React.useEffect(() => { getPlan("p10"); }, [])
      break;
    case "Gain weight/build muscle,Yes,more than 4 days per week":
      React.useEffect(() => { getPlan("p11"); }, [])
      break;
    case "Lose weight/burn fat,Yes,more than 4 days per week":
      React.seEffect(() => { getPlan("p12"); }, [])
      break;
    case "Improve Strength,Yes,more than 4 days per week":
      React.useEffect(() => { getPlan("p13"); }, [])
      break;
    case "Improve Cardio,Yes,more than 4 days per week":
      React.useEffect(() => { getPlan("p14"); }, [])
      break;
    case "General Health,Yes,more than 4 days per week":
      React.useEffect(() => { getPlan("p15"); }, [])
      break;
    case "Gain weight/build muscle,No,more than 4 days per week":
      React.useEffect(() => { getPlan("p16"); }, [])
      break;
    case "Lose weight/burn fat,No,more than 4 days per week":
      React.useEffect(() => { getPlan("p17"); }, [])
      break;
    case "Improve Strength,No,more than 4 days per week":
      React.useEffect(() => { getPlan("p18"); }, [])
      break;
    case "Improve Cardio,No,more than 4 days per week":
      React.useEffect(() => { getPlan("p19"); }, [])
      break;
    default:
      React.useEffect(() => { getPlan("p20"); }, [])
  }
  return (
    <div className='plan-recommendation'>
					<h2> Your input is: {globalVar_results.results}. </h2>
					<h2> Plan recommended is {plan}. </h2>
		</div>
  );
}

