const express = require('express');
const router = express.Router();

module.exports = ({
    getStats,
    addStats
}, updateLeaderboard) => {
    // Get store listing
    router.get('/', (req, res) => {
        getStats()
            .then((stats) => {
                res.json(stats)
            })
            .catch((err) => res.json({
                error: err.message
            }));
    });

    // Post request to /api/stats
    router.post('/', (req, res) => {
        const { name, score, time } = req.body;
        return addStats(name, score, time)
            .then(dbres => {
                console.log(dbres)
                updateLeaderboard(dbres.id, dbres.name, dbres.score, dbres.time);
                res.json('Game Stats added!')
            })
            .catch(err => res.json({
                error: err.message
            }));

    })

    return router;
};
