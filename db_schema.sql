PRAGMA foreign_keys = ON;

CREATE TABLE user ( 
	username VARCHAR(25) PRIMARY KEY,
	first_name VARCHAR(30),
  last_name VARCHAR(30),
	account_created TEXT,
  avatar TEXT
);

CREATE TABLE blog (
	id VARCHAR(20) PRIMARY KEY,
	author_username VARCHAR(25),
	title TEXT,
  description TEXT,
  content TEXT,
  creation_date TEXT,
  FOREIGN KEY(author_username) REFERENCES user(username)
);

CREATE TABLE tags (
	blog_id VARCHAR(20),
	tag TEXT PRIMARY KEY,
  FOREIGN KEY(blog_id) REFERENCES blog(id)
);
