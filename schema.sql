CREATE DATABASE restaurant_gacha_db;

CREATE TABLE genres (
    genre_id VARCHAR(50) PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    nearest_station VARCHAR(100),
    favorite_genre_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_genre
        FOREIGN KEY (favorite_genre_id)
        REFERENCES genres(genre_id)
);

CREATE TABLE histories (
    history_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    station_name VARCHAR(100) NOT NULL,
    genre_id VARCHAR(50),
    genre_name VARCHAR(50),
    restaurant_id VARCHAR(50) NOT NULL,
    gacha_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_histories_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),
    CONSTRAINT fk_histories_genre
        FOREIGN KEY (genre_id)
        REFERENCES genres(genre_id)
);

CREATE TABLE favorites (
    favorite_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    restaurant_id VARCHAR(50) NOT NULL,

    CONSTRAINT uq_favorites
        UNIQUE (user_id, restaurant_id),

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


//↓新しいカラムを追加するためのALTER TABLE文打ってください 佐藤
ALTER TABLE favorites
ADD COLUMN station_name VARCHAR(100);

ALTER TABLE favorites
ADD COLUMN genre_name VARCHAR(100);

ALTER TABLE favorites
ADD COLUMN restaurant_name VARCHAR(200);

ALTER TABLE favorites
ADD COLUMN image_url VARCHAR(500);