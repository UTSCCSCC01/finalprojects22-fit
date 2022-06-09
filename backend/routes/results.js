const express = require("express")
const router = express.Router()

var resultPlan = {
    'Gain weight/build muscle.Yes.less than or equal to 3 days per week.': 'plan1',
    'Lose weight/burn fat.Yes.less than or equal to 3 days per week.': 'plan2',
    'Improve Strength.Yes.less than or equal to 3 days per week.': 'plan3',
    'Improve Cardio.Yes.less than or equal to 3 days per week.' : 'plan4',
    'General Health.Yes.less than or equal to 3 days per week.' : 'plan5',
    'Gain weight/build muscle.No.less than or equal to 3 days per week.' : 'plan6',
    'Lose weight/burn fat.No.less than or equal to 3 days per week.' : 'plan7',
    'Improve Strength.No.less than or equal to 3 days per week.' : 'plan8',
    'Improve Cardio.No.less than or equal to 3 days per week.' : 'plan9',
    'General Health.No.less than or equal to 3 days per week.' : 'plan10',
    'Gain weight/build muscle.Yes.more than 4 days per week.' : 'plan11',
    'Lose weight/burn fat.Yes.more than 4 days per week.' : 'plan12',
    'Improve Strength.Yes.more than 4 days per week.' : 'plan13',
    'Improve Cardio.Yes.more than 4 days per week.' : 'plan14',
    'General Health.Yes.more than 4 days per week.' : 'plan15',
    'Gain weight/build muscle.No.more than 4 days per week.' : 'plan16',
    'Lose weight/burn fat.No.more than 4 days per week.' : 'plan17',
    'Improve Strength.No.more than 4 days per week.' : 'plan18',
    'Improve Cardio.No.more than 4 days per week.' : 'plan19',
    'General Health.No.more than 4 days per week.' : 'plan20'
  }

  
//run when sees param resultContent
router.param("resultContent", (req, res, next, resultContent)=> {
    req.plan = resultPlan[resultContent]
    next()
})

router.get('/:resultContent', (req, res) => {
    //console.log(req.plan)
    res.send(`Your survey result: ${req.params.resultContent} ${req.plan} is recommended.`)
})

// router.get("/", (req,res) => {
//     res.send("results")
// })

// router.get("/Gain weight/build muscle.Yes.less than or equal to 3 days per week.", (req,res) => {
//     res.send("result1")
// })

module.exports = router