const UserGroup = require("../models/usergroup");
const User = require("../models/user");
const { Op, Model } = require("sequelize");

const searchUserAndUserGroup = async (req, res, next) => {
  console.log('in');
  // res.status(201).json({ message: "success" });
  try {
    const { search, groupId, userId } = req.body;
    const users = await User.findAll({
      attributes: ["id", "name", "email", "phoneno"],
      where: {
        [Op.or] : {
          name: {
            [Op.like]: '%'+search+'%',
          },
          email: {
            [Op.like]: '%'+search+'%',
          },
          phoneno: {
            [Op.like]: '%'+search+'%',
          },
        }
      },
      // include: {
      //   model: UserGroup,
      // }
    });
    const userWithGroup = await User.findAll({
      attributes: ["id", "name", "email", "phoneno"],
      where: {
        [Op.or] : {
          name: {
            [Op.like]: '%'+search+'%',
          },
          email: {
            [Op.like]: '%'+search+'%',
          },
          phoneno: {
            [Op.like]: '%'+search+'%',
          },
        }
      },
      include: {
        model: UserGroup,
        where: {
          groupId
        }
      }
    });
    users.map((user, i) => {
      const new2 = userWithGroup.filter((userG) => {
        return userG.id===user.id;
      });
      if(new2.length === 0) {
        users[i]['dataValues']['isMember'] = false;
      } else {
        users[i]['dataValues']['isMember'] = true;
      }
      return user;
    });
    res.status(201).json({ message: "success", users });
  } catch (err) {
    console.log(err);
    res.status(203).json({ message: "fail" });
  }
};

const addUserGroup = async (req, res, next) => {
  const { type, userId, groupId } = req.body;
  let message = 'fail';
  try {
    let resUserGroup = '';
    if(type === 'add'){
      resUserGroup = await UserGroup.create({
        isAdmin: false,
        userId,
        groupId
      })
      message = 'success';
    } else if(type === 'remove'){
      resUserGroup = await UserGroup.destroy({
        where: {
          userId,
          groupId
        }
      })
      message = 'success';
    } else {
      message = "Invalid Type";
    }
    res.status(201).json({ error: { message: message }, resUserGroup});
    
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: { message: "failed" } });
  }
};

module.exports = {
  addUserGroup,
  searchUserAndUserGroup,
};
