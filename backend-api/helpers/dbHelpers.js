module.exports = (db) => {
  const getScores = () => {
    const query = {
      text: 'SELECT * FROM scores ORDER BY score DESC',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addScore = (score) => {
    const query = {
      text: `INSERT INTO scores (score) VALUES ($1) RETURNING *`,
      values: [score]
    }

    console.log('score =', score);
    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }
  return { getScores, addScore };
};