DROP TABLE IF EXISTS scores CASCADE;
CREATE TABLE scores(
    id SERIAL PRIMARY KEY NOT NULL,
    score INTEGER
);