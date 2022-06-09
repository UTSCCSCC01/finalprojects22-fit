import React from 'react';
import { useEffect, useState } from 'react';

export const ResultPlan = () => {
    const [initialState, setIntialState] = useState([])

    useEffect(()=>{
        fetch('/ResultPlan').then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonResponse => setIntialState(jsonResponse.ResultPlan))
    },[])

    return (<div>
        {initialState.length > 0 && initialState.map(e => <li>{e}</li>)}
    </div>
    )
}