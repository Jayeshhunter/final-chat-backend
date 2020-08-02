const express = require("express");
const mongoose = require("mongoose");
const { url } = require("./config/secret");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
// const logger = require("morgan");

const app = express();
app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const { User } = require("./Helpers/UserClass");

require("./socket/streams")(io, User, _);
require("./socket/private")(io);

const dbConfig = require("./config/secret");
const auth = require("./routes/authRoutes");
const posts = require("./routes/postRoutes");
const users = require("./routes/userRoutes");
const friends = require("./routes/friendsRoutes");
const message = require("./routes/messageRoutes");
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET", "POST", "DELETE", "PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   next();
// });

app.use(express.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
// app.use(logger("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/api/chatapp", auth);
app.use("/api/chatapp", posts);
app.use("/api/chatapp", users);
app.use("/api/chatapp", friends);
app.use("/api/chatapp", message);
server.listen(3000, () => {
  console.log("running on port 3000");
});
