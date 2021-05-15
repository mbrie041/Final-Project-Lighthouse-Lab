DROP TABLE IF EXISTS game_stats CASCADE;
CREATE TABLE game_stats(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    score INTEGER,
    time VARCHAR,
    geolocation VARCHAR
);