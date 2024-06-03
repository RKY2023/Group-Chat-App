const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Thread = require("../models/thread");
const User = require("../models/user");
const Group = require("../models/group");
const Usergroup = require("../models/usergroup");
const S3Services = require("../services/S3Services");

const Op = Sequelize.Op;

const getThread = async (req, res, next) => {
  // console.log('THread', req.body);
  const { user, groupId, lastMessageId } = req.body;
  console.log(user, groupId, lastMessageId);
  let lastThreadId;
  if (lastMessageId == null || lastMessageId == undefined) {
    lastThreadId = 0;
  } else {
    lastThreadId = lastMessageId;
  }

  try {
    // const grp_list = await Group.findAll({
    //     where: {
    //         userId : user, id: groupId
    //     }
    // })
    // console.log('GRp_lst',grp_list.length);
    const threads = await Thread.findAll({
      attributes: [
        "id",
        "message",
        "isImg",
        "img",
        "isLink",
        "userId",
        "createdAt",
      ],
      include: {
        model: User,
        attributes: [],
        where: {
          isLoggedIn: {
            [Op.eq]: true,
          },
        },
      },
      order: [["createdAt", "ASC"]],
      where: {
        id: {
          [Op.gt]: lastThreadId,
        },
        groupId: groupId,
      },
    });
    // console.log(threads);
    res.status(203).json({ threads: threads });
  } catch (err) {
    console.log(err);
    res.status(203).json({ error: err });
  }
};

const sendMsg = async (req, res, next) => {
  console.log("Msg Received", req.body);
  const { userId, groupId, message } = req.body;
  // isLink: false, isImg: false
  // console.log(userId, groupId, message);
  let trans;
  let chats = [];
  try {
    trans = await sequelize.transaction();
    const thread = await Thread.create(
      {
        message,
        userId,
        groupId,
      },
      { trans }
    );
    res.status(201).json({ message: "success", thread });
    await trans.commit();
  } catch (err) {
    res.status(203).json({ message: "failed" });
    console.log(err);
    if (trans) await trans.rollback();
  }
};

const newGroup = async (req, res, next) => {
  // let trans;
  try {
    // trans = await sequelize.transaction();
    const { title, info, invites } = req.body;
    // console.log('new grp',req.user, title, info, invites);
    invites.push(req.user.id.toString());
    // console.log('new grp',invites);
    // req.user.createGroup
    const newGroup = await Group.create({
      title: title || "New Group",
      info: info || "Group Info",
    });
    // console/log(newGroup);
    // console.log('new grp id', newGroup.id);
    invites.forEach(async (member) => {
      // console.log('mem',member)
      let isAdmin = false;
      if (member === req.user.id.toString()) isAdmin = true;

      const newMember = await Usergroup.create({
        userId: member,
        groupId: newGroup.id,
        isAdmin: isAdmin,
      });
    });
    // await trans.commit();
    res.status(201).json({ message: "success", group: newGroup });
  } catch (err) {
    // await trans.rollback();
    res.status(203).json({ message: "fail" });
  }
};

const groupList = async (req, res, next) => {
  console.log("Getting Group List");
  const groups = await Group.findAll();
  res.status(201).json({ message: "success", groups });
};

const loadGroupChat = async (req, res, next) => {
  const { groupid } = req.body;
  // console.log(groupid);
  try {
    const group = await Group.findAll({
      where: {
        id: groupid,
      },
    });
    const groupMembers = group.people.split(",");
    const isMember = groupMembers.find(req.user.id);
    // console.log(isMember);
    if (isMember) {
      res.status(201).json({ status: "success", groups });
    } else {
      res
        .status(401)
        .json({
          status: "fail",
          message: "You are not the member of this group",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "server error" });
  }
};

const checkGroup = async (req, res, next) => {
  try {
    const group = await Group.findAll({
      where: {
        userId: req.user.id,
      },
    });
    // console.log('ttttt',group);
    if (group.length === 0) {
      // const tt = await newGroup(req, res, next);
      // console.log(tt)
      res.status(401).json({ status: "fail", message: "no group found" });
    } else if (group.length > 0) {
      res.status(201).json({ status: "success", group });
    } else {
      res
        .status(401)
        .json({
          status: "fail",
          message: "You are not the member of this group",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "server error" });
  }
};
const groupInfo = async (req, res, next) => {
  try {
    const groupId = req.body.groupId;
    console.log(groupId);
    // const group = await UserGroup.findAll({
    //     attributes: ['id', 'Members', 'isAdmin', 'groupId'],
    //     where: {
    //         groupId
    //     }
    // })
    const group = await Usergroup.findAll({
      attributes: ["id", "userId", "isAdmin", "groupId"],
      include: {
        model: User,
        attributes: ["id", "name", "isLoggedIn"],
      },
      order: [["createdAt", "ASC"]],
      where: {
        groupId,
      },
    });
    let usergroups = [];
    for (let i = 0; i < group.length; i++) {
      usergroups[i] = {};
      usergroups[i]["id"] = group[i]["id"];
      usergroups[i]["userid"] = group[i]["user"]["id"];
      usergroups[i]["name"] = group[i]["user"]["name"];
      usergroups[i]["isLoggedIn"] = group[i]["user"]["isLoggedIn"];
      usergroups[i]["isAdmin"] = group[i]["isAdmin"];
    }
    // console.log('ttttt',group);
    if (usergroups.length === 0) {
      // const tt = await newGroup(req, res, next);
      // console.log(tt)
      res.status(401).json({ status: "fail", message: "no group found" });
    } else if (usergroups.length > 0) {
      res.status(201).json({ status: "success", usergroups });
    } else {
      res
        .status(401)
        .json({
          status: "fail",
          message: "You are not the member of this group",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "fail", message: "server error" });
  }
};

const imgThread = async (req, res, next) => {
  try {
    // console.log(req.body, req.file,req.myfile, req.files);
    const imgData = JSON.parse(req.body.imgData);
    const { userId, groupId } = imgData;
    const imgBlob = req.file.path;
    const timestamp = Math.floor(new Date("2012.08.10").getTime() / 1000);
    const filename =
      "GroupChat/Group_" + groupId + `/${timestamp}_${req.file.originalname}`;
    const fileUrl = await S3Services.uploadToS3(imgBlob, filename);
    if (fileUrl) {
      let trans;
      try {
        trans = await sequelize.transaction();
        let thread;
        if (req.file !== undefined && req.file.fieldname === "file") {
          const imgStr = fileUrl;
          thread = await Thread.create(
            {
              userId,
              groupId,
              img: imgStr,
              isImg: true,
            },
            { trans }
          );
        }
        res.status(201).json({ message: "success", thread });
        await trans.commit();
      } catch (err) {
        res.status(203).json({ message: "failed" });
        console.log(err);
        if (trans) await trans.rollback();
      }
    } else {
      res.status(200).json({ fileUrl: "", success: false });
    }
    // res.status(200).json({ fileUrl:'', success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ fileUrl: "", sucess: false, error: err });
  }
};
const CronJob = require("cron");
const ArchiveThread = require("../models/archiveThread");

const job = new CronJob.CronJob(
  "0 0 0 * * *", // cronTime
  function () {
    console.log(`The job ${job.lastDate()} would run at: ${job.nextDate()}`);
    console.log("You will see this message every day");
    archiveThreads();
  }, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles" // timeZone
);

const archiveThreads = async (req, res, next) => {
  let trans;
  try {
    trans = await sequelize.transaction();
    // const thread = await Thread.findAll({},{trans})
    const thread = await Thread.findAll();
    thread.forEach(async (th) => {
      await ArchiveThread.create(
        { 
          id: th.id,
          message: th.message,
          img: th.img,
          isLink: th.isLink,
          isImg: th.isImg,
          createdAt: th.createdAt,
          updatedAt: th.updatedAt
         },
        { trans }
      );
    });
    await Thread.truncate({}, {trans});
    console.log("Archive successful", thread);
    await trans.commit();
  } catch (err) {
    console.log(err);
    if (trans) await trans.rollback();
    res.status(500).json({ sucess: false, error: err });
  }
};

module.exports = {
  sendMsg,
  getThread,
  newGroup,
  groupList,
  loadGroupChat,
  checkGroup,
  groupInfo,
  imgThread,
  archiveThreads,
};
