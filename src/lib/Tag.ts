import type { Database } from "better-sqlite3"

export interface Tag {
  tag: string,
  blog_id: string,
}

export class TagDAO {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  getBlogTags(id: string): Tag[] {
    return this.db
      .prepare(`SELECT * FROM tags WHERE blog_id = ?`)
      .all(id) as Tag[]
  }

  getAllTags(): Tag[] {
    return this.db
      .prepare(`SELECT * FROM tags`)
      .all() as Tag[]
  }

  addTag(tag: Tag) {
    this.db
      .prepare(`INSERT INTO tags VALUES (?, ?)`)
      .run(tag.blog_id, tag.tag)
  }
}
