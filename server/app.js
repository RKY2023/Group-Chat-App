const path = require("path");
// const https = require('https');
var cors = require("cors");
require("dotenv").config({ path: '../.env' });

const express = require("express");
const bodyParser = require("body-parser");
const io = require('socket.io')(5010, {
  cors: {
    origin: [process.env.WEB_HOST+':'+process.env.WEB_HOST_PORT],
    credentials: true,
  }
});
// const busboy = require('connect-busboy');


const sequelize = require("./util/database");
const User = require("./models/user");
const Thread = require("./models/thread");
const Group = require("./models/group");
const Usergroup = require("./models/usergroup");
const ArchiveThread = require("./models/archiveThread");

const app = express();

const userRoutes = require("./routes/user");
const threadRoutes = require("./routes/thread");
const usergroupRoutes = require("./routes/usergroup");
const { addAbortListener } = require("stream");

app.use(cors());
// app.use(cors({
//   origin: [process.env.WEB_HOST+':'+process.env.WEB_HOST_PORT],
//   credentials:true,
//   optionSuccessStatus:200
// }));
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(userRoutes);
app.use(threadRoutes);
app.use(usergroupRoutes);
// app.use(busboy()); 

User.hasMany(Thread);
Thread.belongsTo(User);
Thread.belongsTo(Group);

// User.hasMany(Membership);
// User.hasMany(Group);

Group.hasMany(Usergroup);
Usergroup.belongsTo(Group);
User.hasMany(Usergroup);
Usergroup.belongsTo(User);

console.log('asdas',process.env.NODE_ENV);

sequelize
  // .sync({ force: true})
  .sync()
  .then((k) => {
    app.listen( process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));

const users = {}

io.on('connection', socket => {
  console.log('connected to server');
  socket.on('new-user', userData => {
    console.log(userData);
    users[socket.id] = userData;
    socket.broadcast.emit('user-connected', userData.userName)
  })
  socket.on('send-chat-message', message => {
    console.log(message);
    socket.broadcast.emit('chat-message', message)
  })
  socket.on('disconnect', () => {
    if(users[socket.id] !== undefined)
    socket.broadcast.emit('user-disconnected', users[socket.id]['userName']);
    delete users[socket.id]
  })
})