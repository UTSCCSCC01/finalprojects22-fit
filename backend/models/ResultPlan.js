exports.ResultPlan = (req, res) => {
    res.json({
        'Gain weight/build muscle.Yes.<= 3 days/week.': 'plan1',
        'Lose weight/burn fat.Yes.<= 3 days/week.': 'plan2',
        'Improve Strength.Yes.<= 3 days/week.': 'plan3',
        'Improve Cardio.Yes.<= 3 days/week.': 'plan4',
        'General Health.Yes.<= 3 days/week.': 'plan5',
        'Gain weight/build muscle.No.<= 3 days/week.': 'plan6',
        'Lose weight/burn fat.No.<= 3 days/week.': 'plan7',
        'Improve Strength.No.<= 3 days/week.': 'plan8',
        'Improve Cardio.No.<= 3 days/week.': 'plan9',
        'General Health.No.<= 3 days/week.': 'plan10',
        'Gain weight/build muscle.Yes.>4 days/week.': 'plan11',
        'Lose weight/burn fat.Yes.>4 days/week.': 'plan12',
        'Improve Strength.Yes.>4 days/week.': 'plan13',
        'Improve Cardio.Yes.>4 days/week.': 'plan14',
        'General Health.Yes.>4 days/week.': 'plan15',
        'Gain weight/build muscle.No.>4 days/week.': 'plan16',
        'Lose weight/burn fat.No.>4 days/week.': 'plan17',
        'Improve Strength.No.>4 days/week.': 'plan18',
        'Improve Cardio.No.>4 days/week.': 'plan19',
        'General Health.No.>4 days/week.': 'plan20'
    })
};