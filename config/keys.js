if (process.env.NODE_ENV === "production") {
  //heroku defines this variable
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
