const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Thread = require("../models/thread");
const User = require("../models/user");
const Group = require("../models/group");

const Op = Sequelize.Op;

const getThread = async (req, res, next) => {
    console.log('THread', req.body);
    const { user, groupId, lastMessageId } = req.body;
    let lastThreadId ;
    if(lastMessageId == null || lastMessageId == undefined) {
        lastThreadId = 0;
    } else {
        lastThreadId = lastMessageId;
    }

    try {
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
                groupId: 1,
            }
        })
        res.status(203).json({ 'threads': threads });
    } catch (err) {
        console.log(err);
    };
}

const sendMsg = async (req, res, next) => {
    console.log('THread', req.body);
    const { userId, groupId, message } = req.body;
    let trans;
    let chats = []
    try {
        trans = await sequelize.transaction();
        const thread = await Thread.create({
                message, userId, groupId
            })
        res.status(201).json({ 'message': 'success', thread});
        await trans.commit();
    } catch (err) {
        res.status(203).json({ 'message': 'failed' });
        console.log(err);
        if (trans) await trans.rollback();
    };
}

const newGroup = async (req, res, next) => {
    try {
        const { title, info, people, invites } = req.body;
        console.log('new grp',req.user, title, info, people, invites);
        let invites_str;
        if(invites !== undefined) {
            invites_str = invites.toString()
        } else {
            invites_str = '';
        }
        const newGroup = await req.user.createGroup({
            title: title || 'New Group',
            info: info || 'Group Info',
            invites: invites_str,
            people: people || req.user.id,
        });
        res.status(201).json({ 'message': 'success', group: newGroup});
    } catch (err) {
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
        if(group) {
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
