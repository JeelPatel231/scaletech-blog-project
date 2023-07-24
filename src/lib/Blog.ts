import type { Database } from "better-sqlite3";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';

export const currDate = () => new Date().getTime()

export const BlogValidationSchema = z.object({
  id: z.string().default(uuidv4),
  author_username: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  creation_date: z.number().default(currDate),
})

export type Blog = z.infer<typeof BlogValidationSchema>

export class BlogDAO {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  insertBlog(blog: Blog): string {
    this.db
      .prepare(`INSERT INTO blog VALUES (@id, @author_username, @title, @description, @content, @creation_date)`)
      .run(blog)

    return blog.id
  }

  getAllBlogs(): Blog[] {
    return this.db
      .prepare(`SELECT * FROM blog`)
      .all() as Blog[]
  }

  getBlogByTags(tag: string): Blog[] {
    return this.db
      .prepare(`SELECT * from tags INNER JOIN blog ON (blog.id = tags.blog_id) WHERE tags.tag = ?`)
      .all(tag) as Blog[]
  }

  getBlogData(id: string): Blog | undefined {
    return this.db
      .prepare(`SELECT * FROM blog WHERE id = ? LIMIT 1`)
      .get(id) as Blog
  }

  searchBlogs(query: string): Blog[] {
    return this.db
      .prepare(`SELECT * FROM blog WHERE title LIKE ?`)
      .all("%" + query + "%") as Blog[]
  }

  getUserBlogs(username: string): Blog[] {
    return this.db
      .prepare(`SELECT * FROM blog where author_username = ?`)
      .all(username) as Blog[]
  }
}

