import { expect, test } from "vitest";
import { UserValidationSchema } from "$lib/zodValidations/User";
import { TagValidation } from "$lib/zodValidations/Tag";
import { BlogValidationSchema } from "$lib/zodValidations/Blog";


test("zod username transformation", async () => {
  const userobj = {
    username: "Jeel",
    first_name: "Jeel",
    last_name: "Patel",
    password: "DBTESTING",
    passwordConfirm: "DBTESTING"
  }
  const parsed = UserValidationSchema.parse(userobj)
  expect(userobj.username === parsed.username).toBeFalsy()
  expect(userobj.username.toLowerCase() === parsed.username).toBeTruthy()
})

test.fails("zod password validation", async () => {
  const userobj = {
    username: "Jeel",
    first_name: "Jeel",
    last_name: "Patel",
    password: "DBTESTING",
    passwordConfirm: "DBTESTING2"
  }
  UserValidationSchema.parse(userobj)
})

test("blog input validation", () => {
  const blogInput = {
    title: "Nice Blog Title",
    content: "Nice Blog Markdown COntent",
    description: "Little description",
    tags: "tag1 tag2 tag1 tag2"
  }

  const resp = BlogValidationSchema.parse(blogInput)

  expect(resp.tags).toStrictEqual(["tag1", "tag2"])
})

test("zod tags transformation", async () => {
  const validTags = [
    "validtag", // only alphabets
    "6795", // only numbers
    "67895valid", // numbers + alphabets
    "valid2331", // alphabets + numbers
    "6q-7ew8qw95-valid", // mixed with -
    "AI-ML", // capital letters should work
  ];

  const invalidTags = [
    "", // empty
    "3l", // 2 letter
    "dsa", // 3 letters
    "-dsfiuybs", // must start with alphabet or number
    "6-7895-valid-", // shouldnt end with -
    "-p96789t", // shouldnt start with -
    "-r39vc-", // shouoldnt start and end with -
    "6", // single number, min length = 4
    "- 2803", // no spaces and shouldnt start with -
    "6-7895 invalid", // no spaced
  ];

  for (const tag of validTags) {
    expect(TagValidation.safeParse(tag).success).toBeTruthy()
  }

  for (const tag of invalidTags) {
    expect(TagValidation.safeParse(tag).success).toBeFalsy()
  }

})

