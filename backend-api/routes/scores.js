const express = require('express');
const router = express.Router();

module.exports = ({
    getStats,
    addStats
}, updateLeaderboard) => {
    // module.exports = () => {
    /* GET scores listing. */
    router.get('/', (req, res) => {
        getStats()
            .then((stats) => {
                console.log('Get request getScores =', stats);
                res.json(stats)
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    router.post('/', (req, res) => {

        console.log('Post to / req.body = ', req.body);
        const { name, score, time, geolocation } = req.body;
        return addStats(name, score, time, geolocation)
            .then(dbres => {
                console.log(dbres);
                updateLeaderboard(dbres.id, dbres.name, dbres.score, dbres.time);
                res.json('score!')
            })
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};
