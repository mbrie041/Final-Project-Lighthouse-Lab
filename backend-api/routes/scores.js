// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
// const { getScores, addScore } = require('../helpers/dbHelpers');

module.exports = ({
    getScores,
    addScore
}, updateLeaderboard) => {
    // module.exports = () => {
    /* GET scores listing. */
    router.get('/', (req, res) => {
        getScores()
            .then((scores) => {
                console.log('Get request getScores =', scores);
                res.json(scores)
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post('/', (req, res) => {

        console.log('Post to / req.body = ', req.body);
        const { name, score } = req.body;
        return addScore(name, score)
            .then(dbres => {
                console.log(dbres);
                updateLeaderboard(dbres.id, dbres.name, dbres.score);
                res.json('score!')
            })
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};
