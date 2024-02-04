const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  gender: String,
  age: Number,
  marriageStatus: String,
  ethnicity: String,
  occupation: String,
  pronoun: String,
  pwd: String,
  userData: [
    {
      datetime: Date,
      answer_prob: [Number],
      answers: [],
      stress_point: Number,
      condition: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);

// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         max: 50,
//         unique: true,
//     },
//     name: {
//         type: String,
//         required: true,
//         min: 2,
//         max: 50,
//     },
//     password: {
//         type: String,
//         required: true,
//         min: 2,
//         max: 50,
//     },
//     profile_img: {
//         type: String,
//         default:
//             "https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png",
//     },
// });
// const User = mongoose.model("User", UserSchema);
// module.exports = User;
