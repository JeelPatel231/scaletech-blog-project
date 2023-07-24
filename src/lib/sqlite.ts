import Database from 'better-sqlite3';
import { UserDAO } from './User';
import { TagDAO } from './Tag';
import { BlogDAO } from './Blog';

const setupTables = (db: Database.Database) => {
  db.pragma('case_sensitive_like = false')
  db.pragma('foreign_keys = ON')
  db.pragma('journal_mode = WAL')
  db.exec(`
CREATE TABLE IF NOT EXISTS user ( 
  username VARCHAR(25) PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  account_created INTEGER,
  avatar TEXT,
  password BLOB(72)
);

CREATE TABLE IF NOT EXISTS blog (
  id VARCHAR(20) PRIMARY KEY,
  author_username VARCHAR(25),
  title TEXT,
  description TEXT,
  content TEXT,
  creation_date INTEGER,
  FOREIGN KEY(author_username) REFERENCES user(username)
);

CREATE TABLE IF NOT EXISTS tags (
  blog_id VARCHAR(20),
  tag TEXT,
  PRIMARY KEY (blog_id, tag),
  FOREIGN KEY(blog_id) REFERENCES blog(id)
);

CREATE TABLE IF NOT EXISTS session (
  session_id TEXT PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL
)
`)
}

interface AppDatabaseDao {
  userDao: UserDAO,
  tagDao: TagDAO,
  blogDao: BlogDAO,
}

export class AppDatabase implements AppDatabaseDao {
  userDao: UserDAO
  tagDao: TagDAO
  blogDao: BlogDAO

  constructor(db: Database.Database) {
    setupTables(db)
    this.userDao = new UserDAO(db)
    this.tagDao = new TagDAO(db)
    this.blogDao = new BlogDAO(db)
  }
}

export const db = new AppDatabase(new Database("./db.sqlite3"))
