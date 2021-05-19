module.exports = (db) => {
  const getStats = () => {
    const query = {
      text: 'select id, upper(name) as name, score, time from game_stats ORDER BY score',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getStatsByTime = () => {
    const query = {
      text: 'select id, upper(name) as name, score, time from game_stats ORDER BY time',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addStats = (name, score, time, geolocation) => {
    const query = {
      text: `INSERT INTO game_stats (name, score, time, geolocation) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [name, score, time, geolocation]
    }

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }
  return { getStats, getStatsByTime, addStats };
};