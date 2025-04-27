const Thread = require("../models/thread");
const User = require("../models/user");
const Group = require("../models/group");
const Usergroup = require('../models/usergroup');

const getThread = async (req, res, next) => {
    const { user, groupId, lastMessageId } = req.body;
    let lastThreadId = lastMessageId || 0;

    try {
        const grp_list = await Group.find({ userId: user, _id: groupId });
        const threads = await Thread.find({
            // _id: { $gt: lastThreadId },
            groupId: groupId,
        }).populate('userId', 'isLoggedIn').sort({ createdAt: 'asc' });

        res.status(203).json({ 'threads': threads });
    } catch (err) {
        console.log(err);
        res.status(203).json({ 'error': err });
    }
}

const sendMsg = async (req, res, next) => {
    const { userId, groupId, message, time } = req.body;
    try {
        const thread = new Thread({
            message, userId, groupId, time
        });
        await thread.save();
        res.status(201).json({ 'message': 'success', thread });
    } catch (err) {
        res.status(203).json({ 'message': 'failed' });
        console.log(err);
    }
}

const newGroup = async (req, res, next) => {
    try {
        const { title, info, invites } = req.body;
        invites.push(req.user._id.toString());
        const newGroup = new Group({
            title: title || 'New Group',
            info: info || 'Group Info'
        });
        await newGroup.save();

        for (const member of invites) {
            let isAdmin = member === req.user._id.toString();
            const newMember = new Usergroup({
                userId: member,
                groupId: newGroup._id,
                isAdmin: isAdmin,
            });
            await newMember.save();
        }

        res.status(201).json({ 'message': 'success', group: newGroup });
    } catch (err) {
        res.status(203).json({ 'message': 'fail' });
        console.log(err);
    }
}

const groupList = async (req, res, next) => {
    const groups = await Group.find();
    res.status(201).json({ 'message': 'success', groups });
}

const loadGroupChat = async (req, res, next) => {
    const { groupid } = req.body;
    try {
        const group = await Group.findById(groupid);
        const groupMembers = group.people.split(',');
        const isMember = groupMembers.includes(req.user._id.toString());
        if (isMember) {
            res.status(201).json({ status: 'success', groups });
        } else {
            res.status(401).json({ status: 'fail', message: 'You are not the member of this group' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: 'server error' });
    }
}

const checkGroup = async (req, res, next) => {
    try {
        const group = await Group.find({ userId: req.user._id });
        if (group.length === 0) {
            res.status(401).json({ status: 'fail', message: 'no group found' });
        } else {
            res.status(201).json({ status: 'success', group });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: 'server error' });
    }
}

const groupInfo = async (req, res, next) => {
    try {
        const groupId = req.body.groupId;
        const group = await Usergroup.find({ groupId }).populate('userId', 'name isLoggedIn');
        let usergroups = group.map(g => ({
            id: g._id,
            userid: g.userId._id,
            name: g.userId.name,
            isLoggedIn: g.userId.isLoggedIn,
            isAdmin: g.isAdmin
        }));

        if (usergroups.length === 0) {
            res.status(401).json({ status: 'fail', message: 'no group found' });
        } else {
            res.status(201).json({ status: 'success', usergroups });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'fail', message: 'server error' });
    }
}

module.exports = {
    sendMsg,
    getThread,
    newGroup,
    groupList,
    loadGroupChat,
    checkGroup,
    groupInfo,
};
