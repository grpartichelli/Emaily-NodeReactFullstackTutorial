const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

require("./models/User");
require("./models/Survey");
require("./services/passport"); //runs the code inside passport

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); //passes app as a paremeter of the function that the require returns
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

mongoose.connect(keys.mongoURI); //connects to the database

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets (like main.js main.css)
  app.use(express.static("client/build"));
  //Express wil serve up index.html if he doesnt recognize a route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
