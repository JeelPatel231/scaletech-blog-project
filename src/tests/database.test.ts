import { expect, test } from "vitest";

import { BlogValidationSchema } from "$lib/Blog";
import Database from "better-sqlite3";
import { AppDatabase } from "$lib/sqlite";
import { UserValidationSchema } from "$lib/User";

const appDb = new AppDatabase(new Database(":memory:"))

const baseUserObject = {
  account_created: new Date().getTime(),
  username: "jeelpatel231",
  avatar: "https://picsum.photos/200",
  first_name: "Jeel",
  last_name: "Patel",
  password: "nicepass",
}

const userObject = UserValidationSchema.parse({
  ...baseUserObject,
  passwordConfirm: "nicepass",
})

const { password, ...noPassUser } = baseUserObject

const userBlogObject = {
  author_username: "jeelpatel231",
  description: "Description",
  content: "Hello World",
  title: "Making a Blog App",
}

const blogObject = BlogValidationSchema.parse(userBlogObject)

test("get user with no data", () => {
  expect(appDb.userDao.getUser(userObject.username)).toBe(undefined)
})

test.fails("Fail insertion of tags with no blog", () => {
  appDb.tagDao.addTag({ tag: "nice", blog_id: blogObject.id })
})

test.fails("Fail insertion of blog with no author", () => {
  appDb.blogDao.insertBlog(blogObject)
})

test("check insertion of user", () => {
  appDb.userDao.insertUser(userObject)
  expect(appDb.userDao.getFullUser(userObject.username)).toStrictEqual(baseUserObject)
  expect(appDb.userDao.getUser(userObject.username)).toStrictEqual(noPassUser)
})


test.fails("check insertion of user AGAIN", () => {
  appDb.userDao.insertUser(userObject)
})

test("check insertion of blog", () => {
  appDb.blogDao.insertBlog(blogObject)
  expect(appDb.blogDao.getBlogData(blogObject.id)).toStrictEqual(blogObject)
})

test("check insertion of tags", () => {
  appDb.tagDao.addTag({ tag: "nice", blog_id: blogObject.id })
  appDb.tagDao.addTag({ tag: "nice1", blog_id: blogObject.id })
  expect(appDb.tagDao.getAllTags().length).toBe(2)
  expect(appDb.tagDao.getBlogTags(blogObject.id).length).toBe(2)
})

test("search blogs", () => {
  expect(appDb.blogDao.searchBlogs("making").pop()).toStrictEqual(blogObject)
})
