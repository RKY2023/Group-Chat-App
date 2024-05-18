const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Thread = require("../models/thread");
const User = require("../models/user");
const Group = require("../models/group");
const Membership = require('../models/membership');

const Op = Sequelize.Op;

const getThread = async (req, res, next) => {
    // console.log('THread', req.body);
    const { user, groupId, lastMessageId } = req.body;
    console.log(user, groupId, lastMessageId);
    let lastThreadId ;
    if(lastMessageId == null || lastMessageId == undefined) {
        lastThreadId = 0;
    } else {
        lastThreadId = lastMessageId;
    }

    try {
        const grp_list = await Group.findAll({
            where: {
                userId : user, id: groupId
            }
        })
        console.log('GRp_lst',grp_list.length);
        const threads = await Thread.findAll({
            attributes: ['id', 'message', 'userId'],
            include: {
                model: User,
                    attributes: [],
                    where: {
                        isLoggedIn: {
                            [Op.eq]: true,
                        },
                    },             
            },
            order: [
                ['createdAt', 'ASC']
            ],
            where: {
                id: {
                    [Op.gt]: lastThreadId,
                },
                groupId: groupId,
            }
        })
        // console.log(threads);
        res.status(203).json({ 'threads': threads });
    } catch (err) {
        console.log(err);
        res.status(203).json({ 'error': err });
    };
}

const sendMsg = async (req, res, next) => {
    console.log('THread', req.body);
    const { userId, groupId, message } = req.body;
    // isLink: false, isImg: false
    console.log(userId, groupId, message);
    let trans;
    let chats = []
    try {
        trans = await sequelize.transaction();
        const thread = await Thread.create({
                message, userId, groupId
            } ,{trans})
        res.status(201).json({ 'message': 'success', thread});
        await trans.commit();
    } catch (err) {
        res.status(203).json({ 'message': 'failed' });
        console.log(err);
        if (trans) await trans.rollback();
    };
}

const newGroup = async (req, res, next) => {
    // let trans;
    try {
        // trans = await sequelize.transaction();
        const { title, info, invites } = req.body;
        // console.log('new grp',req.user, title, info, invites);
        invites.push(req.user.id.toString());
        console.log('new grp',invites);
        // req.user.createGroup
        const newGroup = await Group.create({
            title: title || 'New Group',
            info: info || 'Group Info'
        });
        // console/log(newGroup);
        console.log('new grp id', newGroup.id);
        invites.forEach(async(member) => {
            // console.log('mem',member)
            let isAdmin = false;
            if(member === req.user.id.toString())
                isAdmin = true;

            const newMember = await Membership.create({
                member: member,
                groupId: newGroup.id,
                isAdmin: isAdmin,
            });
        });
        // await trans.commit();
        res.status(201).json({ 'message': 'success', group: newGroup});
    } catch (err) {
        // await trans.rollback();
        res.status(203).json({ 'message': 'fail'});
    }
}

const groupList = async (req, res, next) => {
    console.log('grp');
    const groups = await Group.findAll();
    res.status(201).json({ 'message': 'success', groups});
}

const loadGroupChat = async (req, res, next) => {
    const { groupid } = req.body;
    console.log(groupid);
    try{
        const group = await Group.findAll({
            where: {
                id: groupid
            }
        })
        const groupMembers = group.people.split(',');
        const isMember = groupMembers.find(req.user.id);
        console.log(isMember);
        if(isMember) {
            res.status(201).json({ status: 'success', groups});
        } else {
            res.status(401).json({ status: 'fail', message: 'You are not the member of this group'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: 'server error'});
    }    
}

const checkGroup = async (req, res, next) => {
    try{
        const group = await Group.findAll({
            where: {
                userId: req.user.id
            }
        })
        // console.log('ttttt',group);
        if(group.length === 0) {
            // const tt = await newGroup(req, res, next);
            // console.log(tt)
            res.status(401).json({ status: 'fail', message: 'no group found'});
        } else  if(group.length > 0) {
            res.status(201).json({ status: 'success', group});
        } else {
            res.status(401).json({ status: 'fail', message: 'You are not the member of this group'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: 'server error'});
    }    
}

module.exports = {
    sendMsg,
    getThread,
    newGroup,
    groupList,
    loadGroupChat,
    checkGroup,
};
