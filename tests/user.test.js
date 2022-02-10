// const bcrypt = require("bcrypt");
// const Mongoose = require("mongoose");
// const User = require("../models/user");
// const helper = require("../models/user");
// // const Mongoose = require("mongoose");

// describe("when there is one user in db", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//     const passwordHash = await bcrypt.hash("sekret", 10);
//     const user = new User({ username: "root", passwordHash });
//     await user.save();
//   });

//   test("creation succeeds with a first username", async () => {
//     const userAtStart = await helper.usersInDb();
//     const newUser = {
//       username: "mcvmxvn",
//       name: "djdffgh",
//       password: "sff",
//     };
//     await api
//       .post("/api/users")
//       .send(newUser)
//       .expect(200)
//       .expect("Content-Type", /application\/json/);

//     const userAtEnd = await helper.usersInDb();
//     expect(userAtend).toHaveLength(userAtStart.length + 1);
//     const usernames = userAtEnd.map((u) => u.username);
//     expect(usernames).toContain(newUser.username);
//   });
// });
// afterAll(() => {
//   Mongoose.connection.close();
// });
