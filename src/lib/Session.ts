import type { Database } from "better-sqlite3";

interface Session {
  session_id: string,
  username: string,
}

export class SessionDAO {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  addSession(username: string, session_id: string) {
    this.db
      .prepare(`INSERT INTO session VALUES (?, ?)`)
      .run(username, session_id)
  }
}
