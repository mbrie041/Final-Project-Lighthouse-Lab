module.exports = (db) => {
  // Get game stats
  const getStats = () => {
    const query = {
      text: 'SELECT id, upper(name) AS name, score, time FROM game_stats ORDER BY score',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // Add records to the game_stats table
  const addStats = (name, score, time, geolocation) => {
    const query = {
      text: `INSERT INTO game_stats (name, score, time, geolocation) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, score, time, geolocation]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }
  return { getStats, addStats };
};