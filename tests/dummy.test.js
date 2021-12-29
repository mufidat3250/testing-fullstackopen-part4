const listHelper = require("../utils/list_helper");

// const Sum = require("../sum");
test("dummy return 1", () => {
  const blog = [];
  const result = listHelper.dummy(blog);
  expect(result).toBe(1);
});
