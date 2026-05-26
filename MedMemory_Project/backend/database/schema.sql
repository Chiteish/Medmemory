CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INT,
    report_type VARCHAR(100),
    extracted_text TEXT
);