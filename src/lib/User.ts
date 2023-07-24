import type { Database } from "better-sqlite3"
import { z } from "zod";
import { currDate } from "./Blog";


export const BaseUserSchema = z.object({
  username: z.string().trim().min(4).max(20), //TODO: check for spaces in between
  password: z.string().min(8),
})

const UserSchema = BaseUserSchema.extend({
  avatar: z.string().nullable(),
  last_name: z.string().max(20),
  first_name: z.string().max(20),
})

export const UserValidationSchema = UserSchema.extend({
  passwordConfirm: z.string().min(8),
  account_created: z.number().default(currDate)
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export type LoginUser = z.infer<typeof BaseUserSchema>;
export type ValidUser = z.infer<typeof UserValidationSchema>;
export type InsertUser = Omit<ValidUser, 'passwordConfirm'>;
export type OutputUser = Omit<InsertUser, 'password'>;

export class UserDAO {
  private db: Database;

  constructor(db: Database) {
    this.db = db
  }

  insertUser(user: InsertUser) {
    this.db
      .prepare(`INSERT INTO user VALUES (@username, @first_name, @last_name, @account_created, @avatar, @password)`)
      .run(user)
  }

  getFullUser(username: string): InsertUser | undefined {
    return this.db
      .prepare(`SELECT * FROM user WHERE username = ? LIMIT 1`)
      .get(username) as ValidUser
  }

  getAllUsers(): OutputUser[] {
    return this.db
      .prepare(`SELECT username, first_name, last_name, account_created, avatar FROM user`)
      .all() as ValidUser[]
  }

  getUser(username: string): OutputUser | undefined {
    return this.db
      .prepare(`SELECT username, first_name, last_name, account_created, avatar FROM user WHERE username = ? LIMIT 1`)
      .get(username) as ValidUser
  }
}

