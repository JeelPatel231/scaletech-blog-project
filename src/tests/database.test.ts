import { afterAll, beforeEach, expect, test } from "vitest";

import "reflect-metadata"
import { ArrayContains, DataSource, Like } from "typeorm";
import { TORMUser } from "$lib/typeORM/User";
import { BaseDataSourceConfig } from "$lib/typeORM/BaseConfig";
import { TORMBlog } from "$lib/typeORM/Blog";

let dbConn: DataSource;

beforeEach(async () => {
  dbConn = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "password",
    database: "postgres",
    dropSchema: true,
    ...BaseDataSourceConfig,
    logging: false,
  })
  await dbConn.initialize()
});

afterAll(() => {
  dbConn.destroy()
})

const user1 = new TORMUser()
user1.setAttributes({
  avatar: null,
  username: "Jeel",
  first_name: "Jeel",
  last_name: "Patel",
  password: "DBTESTING"
})

const blog1 = new TORMBlog()
blog1.setAttributes({
  author: user1,
  title: "Nice Blog Title",
  content: "Nice Blog Markdown COntent",
  description: "Little description",
  tags: ["tag1", "tag2"]
})

test("test User Insertion", async () => {
  await user1.save()
  const ret = await TORMUser.findOneBy({ username: user1.username })
  expect(ret).toStrictEqual(user1)
})

test("Test Ephemerial Data", async () => {
  const ret = await TORMUser.count()
  expect(ret).toBe(0)
})

test("Get user that doesnt exist", async () => {
  const resp = await TORMUser.findOneBy({ username: "doesntExist" })
  expect(resp).toBe(null)
})

test.fails("Fail insertion of blog with no author", async () => {
  await blog1.save()
})

test("check insertion of blog", async () => {
  await user1.save()
  await blog1.save()
})

test("search blogs", async () => {
  await user1.save()
  await blog1.save()

  const blogResp = await TORMBlog.find({
    where: {
      title: Like("%Title%")
    },
    relations: {
      author: true,
    }
  })
  expect(blogResp.pop()).toStrictEqual(blog1)
})


test("fetch blogs from tags", async () => {
  await user1.save()
  await blog1.save()

  const resp = await TORMBlog.find({ where: { tags: ArrayContains(["tag1"]) }, relations: { author: true } })
  expect(resp.pop()).toStrictEqual(blog1)
})
