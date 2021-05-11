module.exports = (db) => {
  const getScores = () => {
    const query = {
      text: 'SELECT * FROM scores ORDER BY score DESC LIMIT 5',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addScore = (name, score) => {
    const query = {
      text: `INSERT INTO scores (name, score) VALUES ($1, $2) RETURNING *`,
      values: [name, score]
    }

    console.log('score =', score);
    console.log('name=', name);
    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  }
  return { getScores, addScore };
};