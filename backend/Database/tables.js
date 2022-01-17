import pool from "./DbConnection.js";

const Tables = pool.query(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS chat_messages;
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(200),
    createdAt timestamp
);
CREATE TABLE chat_messages(
    msg_id BIGSERIAL PRIMARY KEY,
    sender_id INT NOT null,
    message TEXT NOT null,
    createdAt timestamp
);
`);

export { Tables as default };
