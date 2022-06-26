// const express = require("express")
// const router = express.Router()

// var resultPlan = {
//     'result1': 'plan1',
//     'result2': 'plan2',
//     'result3': 'plan3',
//     'result4' : 'plan4',
//     'result5' : 'plan5',
//     'result6' : 'plan6',
//     'result7' : 'plan7',
//     'result8' : 'plan8',
//     'result9' : 'plan9',
//     'result10' : 'plan10',
//     'result11' : 'plan11',
//     'result12' : 'plan12',
//     'result13' : 'plan13',
//     'result14' : 'plan14',
//     'result15' : 'plan15',
//     'result16' : 'plan16',
//     'result17' : 'plan17',
//     'result18' : 'plan18',
//     'result19' : 'plan19',
//     'result20' : 'plan20'
//   }

// router.param("resultContent", (req, res, next, resultContent)=> {
//     req.plan = resultPlan[resultContent]
//     next()
// })

// router.get('/:resultContent', (req, res) => {
//     //console.log(req.plan)
//     res.send(`Your survey result: ${req.params.resultContent} ${req.plan} is recommended.`)
// })


const express = require("express")
const Plan = require("../models/Plan");
const router = express.Router();

// get planContent given planId
router.get("/:planId", async (req, res) => {
    try {
        let plan = await Plan.findOne({
          planId: req.params.planId
        });
        if (plan) {
            // resultPlans found
            res.status(200).json({
                status: 200,
                data: plan,
            });
        } else {
            // not found
            res.status(400).json({
                status: 400,
                message: "no plans found",
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    } 
});
module.exports = router;